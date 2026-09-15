export class DataMaster
{
    #logicalWidth;
    #logicalHeight;
    #objectList;

    constructor(logicalWidth, logicalHeight)
    {
        this.#logicalWidth = logicalWidth;
        this.#logicalHeight = logicalHeight;
    }
}