function main()
{
    const model: DataMaster = new DataMaster();
    const viewer: RenderMaster = new RenderMaster();
    const presenter: LogicMaster = new LogicMaster(model, viewer); 
}

main();