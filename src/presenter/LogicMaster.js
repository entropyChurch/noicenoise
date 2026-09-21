import { WireframeObject } from "../entities/WireframeObject.js";
import { Player } from "../entities/Player.js";
import { Bullet } from "../entities/Bullet.js";

export class LogicMaster
{
    #model;                 //  Holds the game state
    #viewer;                //  Holds the canvas and render functions
    #previousTime;          //  Time of the previous frame
    #deltaTime;             //  Delta of last and current frame
    #gamepad;               //  Holds the gamepad reference
    #lastBullet;            //  Holds the time of the last fired bullet
    
    #gamePadInput =         // Holds the game input mapped from gamepad state
    {
        rotationX: 0,
        rotationY: 0,
        movementX: 0,
        movementY: 0,
        shield: false,
        boost: false,
        special: false,
        shoot: false,
        red: false,
        green: false,
        blue: false,
        yellow: false,
        start: false,
        select: false
    }          

    constructor(model, viewer, canvas)
    {
        //Kindly doing the needful
        this.#model = model;
        this.#viewer = viewer;
        this.prepareStage();
        this.#previousTime = performance.now();
        this.#lastBullet = performance.now();
        this.addControllerInputListener();

        // Start the recursive game loop
        requestAnimationFrame(() => this.frame());
    }

    // Main function that gets executed for every frame
    frame()
    {
        // Calculate delta time in seconds
        this.#deltaTime = this.calculateDeltaTime(performance.now());

        // Get Controller input
        this.getPlayerInput();
        this.#model.getPlayer().setPlayerInput(this.#gamePadInput);

        // Do all player input actions that are NOT movement
        this.shoot();

        //Destroy all non seen objects
        this.#model.setWireframeObjectList
        (
            this.cullObjectsOutOfBounds
            (
                this.#model.getWireframeObjectList(),
                this.#model.getLogicalWidth(),
                this.#model.getLogicalWidth()
            )
        )

        // Move the player
        this.#model.getPlayer().update(this.#deltaTime, this.#model.getLogicalWidth(), this.#model.getLogicalHeight());

        // Move everything else

        // Update all the other objects
        for (const wireframeObject of this.#model.getWireframeObjectList())
        {
            wireframeObject.update(this.#deltaTime);
        }

        // Check for collisions
        this.collisionDetection()

        // Render the current gamestate
        this.#viewer.render(this.#model.getWireframeObjectList(), this.#model.getPlayer());

        console.log("Objects on screen: " + (this.#model.getWireframeObjectList().length + 1));
            
        // Request the next frame
        requestAnimationFrame(() => this.frame());
    }

    calculateDeltaTime(currentTime)
    {
        const deltaTime = this.deltaTime = (currentTime - this.#previousTime) / 1000
        this.#previousTime = currentTime;
        return deltaTime;
    }

    prepareStage()
    {
        const player = new Player(0, 0, "white", 100, 150);
        player.setSpeed(500);
        this.#model.setPlayer(player);
    }

    addControllerInputListener()
    {
        window.addEventListener("gamepadconnected", (e) => 
        {
            console.log("Gamepad connected.");
            this.#gamepad = navigator.getGamepads()[e.gamepad.index];
        });

        window.addEventListener("gamepaddisconnected", (e) => 
        {
            console.log
            ("Gamepad disconnected.");
        });
    }

    getPlayerInput()
    {

        // Layout for my 8-BitDO Pro 3 as referenced to an XBOX controller
        // I need to add keymapping when first playing I guess

        // Buttons
        // 0 -> (A)     7 -> (R1)   14 -> (R3)
        // 1 -> (B)     9 -> (R2)   13 -> (L3)
        // 3 -> (X)     6 -> (L1)   10 -> (START)
        // 4 -> (Y)     8 -> (L2)   11 -> (SELECT)

        //Axis
        //0 -> DPAD             3 -> RS - X-Axis    6 -> LT - Z-Axis
        //1 -> LS - X-Axis      4 -> LS - Y-Axis
        //2 -> LS - Y-Axis      5 -> RT - Z-Axis

        if (!this.#gamepad) 
        {
            console.log("No gamepad connected.");
            return;
        }

        // Get button presses

        // GREEN
        if (this.#gamepad.buttons[0].pressed)
            {
                this.#gamePadInput.green = true;
        }
        else
            {
                this.#gamePadInput.green = false;
        }

        // RED
        if (this.#gamepad.buttons[1].pressed)
            {
                this.#gamePadInput.red = true;
        }
        else
            {
                this.#gamePadInput.red = false;
        }

        // BLUE
        if (this.#gamepad.buttons[3].pressed)
            {
                this.#gamePadInput.blue = true;
        }
        else
            {
                this.#gamePadInput.blue = false;
        }

        //YELLOW
        if (this.#gamepad.buttons[4].pressed)
            {
                this.#gamePadInput.yellow = true;
        }
        else
            {
                this.#gamePadInput.yellow = false;
        }
                      
        // SPECIAL
        if (this.#gamepad.buttons[6].pressed)
            {
                this.#gamePadInput.special= true;
        }
        else
            {
                this.#gamePadInput.special = false;
        }

        // SHIELD
        if (this.#gamepad.buttons[7].pressed)
            {
                this.#gamePadInput.shield = true;
        }
        else
            {
                this.#gamePadInput.shield = false;
        }

        // BOOST
        if (this.#gamepad.buttons[8].pressed)
            {
                this.#gamePadInput.boost = true;
        }
        else
            {
                this.#gamePadInput.boost = false;
        }
            
        // SHOOT
        if (this.#gamepad.buttons[9].pressed)
            {
                this.#gamePadInput.shoot = true;
        }
        else
            {
                this.#gamePadInput.shoot = false;
        }

        //SELECT
        if (this.#gamepad.buttons[10].pressed)
            {
                this.#gamePadInput.select = true;
        }
        else
            {
                this.#gamePadInput.select = false;
        }

        //START
        if (this.#gamepad.buttons[11].pressed)
            {
                this.#gamePadInput.start = true;
        }
        else
            {
                this.#gamePadInput.start = false;
        }

        // Get axis states
        this.#gamePadInput.movementX = this.#gamepad.axes[1];
        this.#gamePadInput.movementY = this.#gamepad.axes[2];
        this.#gamePadInput.rotationX = this.#gamepad.axes[3];
        this.#gamePadInput.rotationY = this.#gamepad.axes[4];

    }

    cullObjectsOutOfBounds(wireframeObjectList, logWidth, logHeight)
    {
        let culledList = wireframeObjectList;

            for (let i = culledList.length -1; i >= 0; i--)
            {
                if
                (
                    culledList[i].getObjectPositionX() > logWidth + 100 ||
                    culledList[i].getObjectPositionX() < -100 ||
                    culledList[i].getObjectPositionY() > logHeight + 100 ||
                    culledList[i].getObjectPositionY() < -100
                )
                {
                    culledList.splice(i,1);
                }
            }
            return culledList;
    }

    shoot()
    {
        const bulletTryTime = performance.now();
        const deltaBullet = bulletTryTime - this.#lastBullet;
        if (this.#gamePadInput.shoot && deltaBullet > this.#model.getPlayer().getBulletCooldown())
        {
            this.#model.addWireframeObject
            (
                new Bullet
                (
                    this.#model.getPlayer().getObjectPositionX(),
                    this.#model.getPlayer().getObjectPositionY(),
                    "white",
                    1500,
                    this.#model.getPlayer().getCoordinateList()[0].getPositionX(),
                    this.#model.getPlayer().getCoordinateList()[0].getPositionY(),
                    "true"
                )
            );
            this.#lastBullet = bulletTryTime;
        }
    }

    collisionDetection()
    {
        const wireframeObjectList = this.#model.getWireframeObjectList();
        const logWidth = this.#model.getLogicalWidth();
        const logHeight = this.#model.getLogicalHeight();

        const sectorA1 = new Array();
        const sectorA2 = new Array();
        const sectorA3 = new Array();
        const sectorA4 = new Array();

        const sectorB1 = new Array();
        const sectorB2 = new Array();
        const sectorB3 = new Array();
        const sectorB4 = new Array();

        const sectorC1 = new Array();
        const sectorC2 = new Array();
        const sectorC3 = new Array();
        const sectorC4 = new Array();

        const sectorD1 = new Array();
        const sectorD2 = new Array();
        const sectorD3 = new Array();
        const sectorD4 = new Array();

        // Do all the objects
        for (const wireFrameObject of wireframeObjectList)
        {
            for (const coordinate of wireFrameObject.getCoordinateList())
            {
                const pX = coordinate.getPositionX();
                const pY = coordinate.getPositionY();
                
                let column = "";
                let row = "";

                if (pX > 0.25 * logWidth)
                {
                    if (pX > 0.5 * logWidth)
                    {
                        if (pX > 0.75 * logWidth)
                        {
                            column = "D"
                        }
                        else
                        {
                            column = "C"
                        }
                    }
                    else
                    {
                        column = "B"
                    }
                }
                else
                {
                    column = "A"
                }

                if (pY > 0.25 * logHeight)
                {
                    if (pY > 0.5 * logHeight)
                    {
                        if (pY > 0.75 * logHeight)
                        {
                            row = "4"
                        }
                        else
                        {
                            row = "3"
                        }
                    }
                    else
                    {
                        row = "2"
                    }
                }
                else
                {
                    row = "1"
                }

                console.log(column + row);

                if (column == "A" && row == "1")
                {
                    if (!sectorA1.includes(wireFrameObject))
                        {sectorA1.push(wireFrameObject)}
                }

                if (column == "A" && row == "2")
                {
                    if (!sectorA2.includes(wireFrameObject))
                        {sectorA2.push(wireFrameObject)}
                }

                if (column == "A" && row == "3")
                {
                    if (!sectorA3.includes(wireFrameObject))
                        {sectorA3.push(wireFrameObject)}
                }

                if (column == "A" && row == "4")
                {
                    if (!sectorA4.includes(wireFrameObject))
                        {sectorA4.push(wireFrameObject)}
                }

                if (column == "B" && row == "1")
                {
                    if (!sectorB1.includes(wireFrameObject))
                        {sectorB1.push(wireFrameObject)}
                }

                if (column == "B" && row == "2")
                {
                    if (!sectorB2.includes(wireFrameObject))
                        {sectorB2.push(wireFrameObject)}
                }

                if (column == "B" && row == "3")
                {
                    if (!sectorB3.includes(wireFrameObject))
                        {sectorB3.push(wireFrameObject)}
                }

                if (column == "B" && row == "4")
                {
                    if (!sectorB4.includes(wireFrameObject))
                        {sectorB4.push(wireFrameObject)}
                }

                if (column == "C" && row == "1")
                {
                    if (!sectorC1.includes(wireFrameObject))
                        {sectorC1.push(wireFrameObject)}
                }

                if (column == "C" && row == "2")
                {
                    if (!sectorC2.includes(wireFrameObject))
                        {sectorC2.push(wireFrameObject)}
                }

                if (column == "C" && row == "3")
                {
                    if (!sectorC3.includes(wireFrameObject))
                        {sectorC3.push(wireFrameObject)}
                }

                if (column == "C" && row == "4")
                {
                    if (!sectorC4.includes(wireFrameObject))
                        {sectorC4.push(wireFrameObject)}
                }

                if (column == "D" && row == "1")
                {
                    if (!sectorD1.includes(wireFrameObject))
                        {sectorD1.push(wireFrameObject)}
                }

                if (column == "D" && row == "2")
                {
                    if (!sectorD2.includes(wireFrameObject))
                        {sectorD2.push(wireFrameObject)}
                }

                if (column == "D" && row == "3")
                {
                    if (!sectorD3.includes(wireFrameObject))
                        {sectorD3.push(wireFrameObject)}
                }

                if (column == "D" && row == "4")
                {
                    if (!sectorD4.includes(wireFrameObject))
                        {sectorD4.push(wireFrameObject)}
                }
            }   
        }

        // Do the player
        
    } 
}