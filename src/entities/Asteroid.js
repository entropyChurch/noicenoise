import { WireframeObject } from "./WireframeObject.js";

export class Asteroid extends WireframeObject
{

    #health;

    constructor(positionX, positionY, velocity, color, health)
    {
        super(positionX, positionY, velocity, color);
        this.#health = health;
        this.makePlayer();
    }

    makeAsteroid()
    {
        this.addCoordinate(this.getObjectPositionX(), this.getObjectPositionY())
        this.addCoordinate(this.getObjectPositionX()+ 25, this.getObjectPositionY() + 60)
        this.addCoordinate(this.getObjectPositionX()+ 50, this.getObjectPositionY())
        this.addCoordinate(this.getObjectPositionX()+ 25, this.getObjectPositionY() + 15)
    }
}