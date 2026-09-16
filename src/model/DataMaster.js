export class DataMaster
{
    #logicalWidth;
    #logicalHeight;
    #wireframeObjectList = new Array();
    #player;

    constructor(logicalWidth, logicalHeight)
    {   
        this.#logicalWidth = logicalWidth;
        this.#logicalHeight = logicalHeight;
        this.#wireframeObjectList = new Array();
    }

    getWireframeObjectList()
    {
        return this.#wireframeObjectList;
    }

    addWireframeObject(wireframeObject)
    {
        this.#wireframeObjectList.push(wireframeObject);
    }

    setPlayer(player)
    {
        this.#player = player;
    }

    getPlayer()
    {
        return this.#player;
    }

}