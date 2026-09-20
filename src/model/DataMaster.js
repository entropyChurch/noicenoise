export class DataMaster
{
    #logicalWidth;
    #logicalHeight;
    #wireframeObjectList = new Array();
    #projectileList = new Array();
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

    addProjectile(wireframeObject)
    {
        this.#wireframeObjectList.push(wireframeObject);
        this.#projectileList.push(wireframeObject);
    }

    setPlayer(player)
    {
        this.#player = player;
    }

    getPlayer()
    {
        return this.#player;
    }

    getLogicalWidth()
    {
        return this.#logicalWidth;
    }

    getLogicalHeight()
    {
        return this.#logicalHeight;
    }

}