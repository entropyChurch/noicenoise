import { WireframeObject } from "./WireframeObject.js";

export class Player extends WireframeObject
{

    #health;

    constructor(positionX, positionY, velocityX, velocityY, color, health)
    {
        super(positionX, positionY, velocityX, velocityY, color);
        this.#health = health;
    }

    updatePlayer(deltaTime)
    {   
        this.update(deltaTime);
        this.clearCoordinates();
        this.addCoordinate(this.getObjectPositionX(), this.getObjectPositionY())
        this.addCoordinate(this.getObjectPositionX()+ 25, this.getObjectPositionY() + 60)
        this.addCoordinate(this.getObjectPositionX()+ 50, this.getObjectPositionY())
        this.addCoordinate(this.getObjectPositionX()+ 25, this.getObjectPositionY() + 15)
    }

}