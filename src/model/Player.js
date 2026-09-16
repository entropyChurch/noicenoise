import { WireframeObject } from "./WireframeObject.js";

export class Player
{

    #wireframe;

    constructor()
    {
        this.#wireframe = new WireframeObject(0, 0, 0, 0, 0, "green");
        this.#wireframe.makePlayer();
    }

    getWireframe()
    {
        return this.#wireframe;
    }

}