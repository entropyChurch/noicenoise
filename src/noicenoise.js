import { DataMaster } from "./model/DataMaster.js";
import { RenderMaster } from "./viewer/RenderMaster.js";
import { LogicMaster } from "./presenter/LogicMaster.js";

function main()
{
    // Settings
    const canvasName = "noicenoise";
    const logicalWidth = 1280;
    const logicalHeight = 720;

    // Construct the MVP-Link
    const model = new DataMaster(logicalWidth, logicalHeight);
    const viewer  = new RenderMaster(document.getElementById(canvasName));
    const presenter = new LogicMaster(model, viewer);

    // Start the recursive game loop
    requestAnimationFrame(() => presenter.frame());
}

main();