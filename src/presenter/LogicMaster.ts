class LogicMaster
{
    #model: DataMaster;
    #viewer: RenderMaster;

    constructor(model: DataMaster, viewer: RenderMaster)
    {
        this.#model = model;
        this.#viewer = viewer;
    }
}