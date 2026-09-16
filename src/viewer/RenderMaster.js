export class RenderMaster
{
    #canvas;
    #canvasContext;
    #canvasHeight;
    #canvasWidth;
    
    constructor(canvas)
    {
        this.#canvas = canvas;
        this.#canvasWidth = canvas.width;
        this.#canvasHeight = canvas.height;
        this.#canvasContext = this.#canvas.getContext("2d");
    }

    render()
    {
        this.clearCanvas();
        this.fillBackground();
    }

    clearCanvas()
    {
        this.#canvasContext.clearRect(0, 0, this.#canvasWidth, this.#canvasHeight);
    }

    fillBackground()
    {
        this.#canvasContext.fillStyle = "#0d0329";
        this.#canvasContext.fillRect(0, 0, this.#canvasWidth, this.#canvasHeight);
    }
}