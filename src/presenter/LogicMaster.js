import { WireframeObject } from "../model/WireframeObject.js";
import { Player } from "../model/Player.js";

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

    constructor(model, viewer, canvas)
    {
        //Kindly doing the needful
        this.#model = model;
        this.#viewer = viewer;
        this.prepareStage();
        this.#previousTime = performance.now();
        this.addKeyInputListeners();

        // Start the recursive game loop
        requestAnimationFrame(() => this.frame());
    }

    // Main function that gets executed for every frame
    frame()
    {
        //Calculate delta time in seconds
        this.#deltaTime = this.calculateDeltaTime(performance.now())

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
        const player = new Player(250,250,10,10,"green",100);
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
                moveVector = this.calculatePlayeMovementVector();
                this.#model.getPlayer.setIntendedMovementVector(moveVector.x, moveVector.y)
            })

        window.addEventListener("keyup", (event) => 
            {
                if (event.key in this.#keys)
                    this.#keys[event.key] = false;
                moveVector = this.calculatePlayeMovementVector();
                this.#model.getPlayer.setIntendedMovementVector(moveVector.x, moveVector.y)
            })
    }
}