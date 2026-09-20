import { WireframeObject } from "../entities/WireframeObject.js";
import { Player } from "../entities/Player.js";

export class LogicMaster
{
    #model;                 //  Holds the game state
    #viewer;                //  Holds the canvas and render functions
    #previousTime;          //  Time of the previous frame
    #deltaTime;             //  Delta of last and current frame
    #gamepad;               //  Holds the gamepad reference
    
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
        this.addKeyInputListeners();
        this.addControllerInputListener();

        // Start the recursive game loop
        requestAnimationFrame(() => this.frame());
    }

    // Main function that gets executed for every frame
    frame()
    {
        //Calculate delta time in seconds
        this.#deltaTime = this.calculateDeltaTime(performance.now());

        //Get Controller input
        this.getPlayerInput();

        // Do all the game logic
        this.#model.getPlayer().update(this.#deltaTime);

        // Render the current gamestate
        this.#viewer.render(this.#model.getWireframeObjectList(), this.#model.getPlayer());


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
        const player = new Player(250, 250, 0, 0, "white", 100, 100);
        player.setSpeed(500);
        this.#model.setPlayer(player);
    }

    calculatePlayerMovementVector()
    {
        let x = 0;
        let y = 0;

        if (this.#keys.w)
            y -= 1;

        if (this.#keys.s)
            y += 1;

        if (this.#keys.a)
            x -= 1;

        if (this.#keys.d)
            x += 1;

        return { x, y };
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
        for (let i = 0; i<this.#gamepad.buttons.length; i++)
        {
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
        }

        // Get axis states
        this.#gamePadInput.movementX = this.#gamepad.axes[1];
        this.#gamePadInput.movementY = this.#gamepad.axes[2];
        this.#gamePadInput.rotationX = this.#gamepad.axes[3];
        this.#gamePadInput.rotationY = this.#gamepad.axes[4];

    }

}