import { WireframeObject } from "../entities/WireframeObject.js";
import { Player } from "../entities/Player.js";

export class LogicMaster
{
    #model;                 //  Holds the game state
    #viewer;                //  Holds the canvas and render functions
    #previousTime;          //  Time of the previous frame
    #deltaTime;             //  Delta of last and current frame
    #keys = 
    {
        w: false,
        a: false,
        s: false,
        d: false
    };
    #gamepad;               // Holds the gamepad state
    
    #gamePadInput =         // Holds the game input mapped from gamepad state
    {
        rotation: 0,
        movement_direction: 0,
        shield: false,
        boost: false,
        shoot: false
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
        const player = new Player(250, 250, 1, 0, "green", 100, 100);
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

    addKeyInputListeners()
    {
        window.addEventListener("keydown", (event) => 
            {
                if (event.key in this.#keys)
                    this.#keys[event.key] = true;
                const moveVector = this.calculatePlayerMovementVector();
                this.#model.getPlayer().setInputMovementVector(moveVector.x, moveVector.y)
            })

        window.addEventListener("keyup", (event) => 
            {
                if (event.key in this.#keys)
                    this.#keys[event.key] = false;
                const moveVector = this.calculatePlayerMovementVector();
                this.#model.getPlayer().setInputMovementVector(moveVector.x, moveVector.y)
            })
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
        if (!this.#gamepad) 
        {
            console.log("No gamepad connected.");
            return;
        }

        for (let i = 0; i<this.#gamepad.buttons.length; i++)
        {
            if (this.#gamepad.buttons[i].pressed)
            {
                console.log(i);
            }
        }
    }

}