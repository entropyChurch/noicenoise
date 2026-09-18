import { WireframeObject } from "./WireframeObject.js";

export class Player extends WireframeObject
{

    #health;
    #targetVelocityX;
    #targetVelocityY;
    #rotation;

    constructor(positionX, positionY, velocityX, velocityY, color, health)
    {
        super(positionX, positionY, velocityX, velocityY, color);
        this.#health = health;
        this.addCoordinate(this.getObjectPositionX(), this.getObjectPositionY() - 50);
        this.addCoordinate(this.getObjectPositionX() + 30, this.getObjectPositionY() + 20);
        this.addCoordinate(this.getObjectPositionX(), this.getObjectPositionY());
        this.addCoordinate(this.getObjectPositionX() - 30, this.getObjectPositionY() + 20);
        this.#targetVelocityX = 0;
        this.#targetVelocityY = 0;
        this.#rotation = -Math.PI / 2;
    }

    setInputMovementVector(targetVelocityX, targetVelocityY)
    {
        this.#targetVelocityX = targetVelocityX;
        this.#targetVelocityY = targetVelocityY;
    }

    calculateVelocity(deltaTime)
    {

    }

    rotateObject()
    {
        if (this.getVelocityX() === 0 && this.getVelocityY() === 0)
            return;

        const newRotation = Math.atan2(this.getVelocityY(), this.getVelocityX());

        let rotationDelta = newRotation - this.#rotation;

        if (rotationDelta > Math.PI)
        {
            rotationDelta -= Math.PI * 2;
        }

        if (rotationDelta < -Math.PI)
        {
            rotationDelta += Math.PI * 2;
        }

        const cos = Math.cos(rotationDelta);
        const sin = Math.sin(rotationDelta);

        for (const coordinate of this.getCoordinateList())
        {
            // Translate point so object position becomes (0, 0)
            const x =
                coordinate.getPositionX() -
                this.getObjectPositionX();

            const y =
                coordinate.getPositionY() -
                this.getObjectPositionY();

            // Rotate around (0, 0)
            const rotatedX = x * cos - y * sin;
            const rotatedY = x * sin + y * cos;

            // Translate back
            coordinate.setPositionX(rotatedX + this.getObjectPositionX());

            coordinate.setPositionY(rotatedY + this.getObjectPositionY());
        }

        this.#rotation = newRotation;
    }

}