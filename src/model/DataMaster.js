import { WireframeObject } from "./WireframeObject.js";

export class DataMaster
{
    #logicalWidth;
    #logicalHeight;
    #wireframeObjectList = new Array();

    constructor(logicalWidth, logicalHeight)
    {   
        this.#logicalWidth = logicalWidth;
        this.#logicalHeight = logicalHeight;
        this.#wireframeObjectList.push(new WireframeObject(0,0));
    }

    getWireframeObjectList()
    {
        return this.#wireframeObjectList;
    }
}