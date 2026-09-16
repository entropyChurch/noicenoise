import { WireframeObject } from "./WireframeObject.js";

export class Player
{

    #wireframe;
    #health;
    #positionX;
    #positionY;
    #orientation;
    #velocity;

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