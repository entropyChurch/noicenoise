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

    render(wireframeObjectList)
    {
        this.clearCanvas();
        this.fillBackground();
        this.renderWireframes(wireframeObjectList);
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

    renderWireframes(wireframeList)
    {
        this.#canvasContext.strokeStyle = "white";
        this.#canvasContext.lineWidth = 1;
        this.#canvasContext.imageSmoothingEnabled = false;

        for (const wireframeObject of wireframeList)
            {
                const coordinateList = wireframeObject.getCoordinateList();
                const firstCoordinate = coordinateList[0];
                const lastCoordinate = coordinateList[coordinateList.length - 1];
                for (let i = 1 ; i < coordinateList.length; i++)
                {
                    const previousCoordinate = coordinateList[i - 1];
                    const currentCoordinate = coordinateList[i];

                    this.#canvasContext.beginPath();
                    this.#canvasContext.moveTo(previousCoordinate.getPositionX() + 0.5, previousCoordinate.getPositionY() + 0.5);
                    this.#canvasContext.lineTo(currentCoordinate.getPositionX() + 0.5, currentCoordinate.getPositionY() + 0.5);
                    this.#canvasContext.stroke();
                }

                this.#canvasContext.beginPath();
                this.#canvasContext.moveTo(lastCoordinate.getPositionX() + 0.5, lastCoordinate.getPositionY() + 0.5);
                this.#canvasContext.lineTo(firstCoordinate.getPositionX() + 0.5, firstCoordinate.getPositionY() + 0.5);
                this.#canvasContext.stroke();

            }
    }

}