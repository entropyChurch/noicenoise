import { WireframeObject } from "./WireframeObject.js";

export class Player extends WireframeObject
{

    #health;
    #rotation;
    #playerInput;

    constructor(positionX, positionY, velocityX, velocityY, color, health)
    {
        super(positionX, positionY, velocityX, velocityY, color);
        this.#health = health;
        this.addCoordinate(this.getObjectPositionX(), this.getObjectPositionY() - 50);
        this.addCoordinate(this.getObjectPositionX() + 30, this.getObjectPositionY() + 20);
        this.addCoordinate(this.getObjectPositionX(), this.getObjectPositionY());
        this.addCoordinate(this.getObjectPositionX() - 30, this.getObjectPositionY() + 20);
        this.#rotation = -Math.PI / 2;
    }

    setPlayerInput()
    {
        this.#playerInput = this.#playerInput;
    }

    moveObject()
    {

    }

    rotateObject()
    {
        
    }

}