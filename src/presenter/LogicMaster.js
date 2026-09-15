export class LogicMaster
{
    #model;
    #viewer;

    constructor(model, viewer)
    {
        this.#model = model;
        this.#viewer = viewer;
    }

    // Main function that gets executed for every frame
    frame()
    {
        // Do all the game logic
        console.log("FRAME");
        // Render the current gamestate

        // Request the next frame
        requestAnimationFrame(() => this.frame());
    }
}