export class LogicMaster
{
    #model;                 //  Holds the game state
    #viewer;                //  Holds the canvas and render functions
    #previousTime;          //  Time of the previous frame
    #currentTime;           //  Time of the current frame
    #deltaTime;             //  Delta of last and current frame

    constructor(model, viewer)
    {
        this.#model = model;
        this.#viewer = viewer;
        this.previousTime = performance.now();
    }

    // Main function that gets executed for every frame
    frame()
    {
        //Calculate delta time in seconds
        this.#deltaTime = this.calculateDeltaTime(performance.now())



        // Do all the game logic
        
        


        // Render the current gamestate



        // Request the next frame
        requestAnimationFrame(() => this.frame());
    }

    calculateDeltaTime(currentTime)
    {
        const deltaTime = this.deltaTime = (currentTime - this.#previousTime) / 1000
        this.#previousTime = currentTime;
        return deltaTime;
    }
}