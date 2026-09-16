export class DataMaster
{
    #logicalWidth;
    #logicalHeight;
    #wireframeObjectList = new Array();

    constructor(logicalWidth, logicalHeight)
    {   
        this.#logicalWidth = logicalWidth;
        this.#logicalHeight = logicalHeight;
    }

    getWireframeObjectList()
    {
        return this.#wireframeObjectList;
    }

    addWireframeObject(wireframeObject)
    {
        this.#wireframeObjectList.push(wireframeObject);
    }

}