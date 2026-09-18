import { WireframeObject } from "./WireframeObject.js";

export class Player extends WireframeObject
{

    #health;

    constructor(positionX, positionY, velocityX, velocityY, color, health)
    {
        super(positionX, positionY, velocityX, velocityY, color);
        this.#health = health;
        this.addCoordinate(this.getObjectPositionX(), this.getObjectPositionY() - 50);
        this.addCoordinate(this.getObjectPositionX() + 30, this.getObjectPositionY() + 20);
        this.addCoordinate(this.getObjectPositionX(), this.getObjectPositionY());
        this.addCoordinate(this.getObjectPositionX() - 30, this.getObjectPositionY() + 20);
    }

}