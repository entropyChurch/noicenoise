import { WireframeObject } from "./WireframeObject.js";

export class DataMaster
{
    #logicalWidth;
    #logicalHeight;
    #wireFrameObjectList;

    constructor(logicalWidth, logicalHeight)
    {
        this.#logicalWidth = logicalWidth;
        this.#logicalHeight = logicalHeight;
    }
}