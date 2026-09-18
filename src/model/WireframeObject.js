import { Coordinate } from "./Coordinate.js";

export class WireframeObject
{

    #velocityX;
    #velocityY;
    #objectPositionX;
    #objectPositionY;
    #color;
    #coordinateList;
    #rotation;

    constructor(objectPositionX, objectPositionY, velocityX, velocityY, color)
    {
        this.#objectPositionX = objectPositionX;
        this.#objectPositionY = objectPositionY;
        this.#velocityX = velocityX;
        this.#velocityY = velocityY;
        this.#color = color;
        this.#rotation = -Math.PI / 2;
        this.#coordinateList = new Array;
    }

    update(deltaTime)
    {
        this.calculateVelocity()
        this.rotateObject()
        this.updatePosition(deltaTime)
    }

    calculateVelocity()
    {

    }

    rotateObject()
    {
        if (this.#velocityX === 0 && this.#velocityY === 0)
            return;

        const newRotation = Math.atan2(this.#velocityY, this.#velocityX);

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

        for (const coordinate of this.#coordinateList)
        {
            // Translate point so object position becomes (0, 0)
            const x =
                coordinate.getPositionX() -
                this.#objectPositionX;

            const y =
                coordinate.getPositionY() -
                this.#objectPositionY;

            // Rotate around (0, 0)
            const rotatedX = x * cos - y * sin;
            const rotatedY = x * sin + y * cos;

            // Translate back
            coordinate.setPositionX(
                rotatedX + this.#objectPositionX
            );

            coordinate.setPositionY(
                rotatedY + this.#objectPositionY
            );
        }

        this.#rotation = newRotation;
    }   


updatePosition(deltaTime)
{
    const deltaX = this.#velocityX * deltaTime;
    const deltaY = this.#velocityY * deltaTime;

    this.#objectPositionX += deltaX;
    this.#objectPositionY += deltaY;

    for (const coordinate of this.#coordinateList)
    {
        coordinate.setPositionX(
            coordinate.getPositionX() + deltaX
        );

        coordinate.setPositionY(
            coordinate.getPositionY() + deltaY
        );
    }
}


    addCoordinate(positionX, positionY)
    {
        const coordinate = new Coordinate(positionX, positionY);
        this.#coordinateList.push(coordinate);
    };

    clearCoordinates()
    {
        this.#coordinateList.length = [];
    }

    getCoordinateList()
    {
        return this.#coordinateList;
    }

    getColor()
    {
        return this.#color;
    }

    getObjectPositionX()
    {
        return this.#objectPositionX;
    }

    getObjectPositionY()
    {
        return this.#objectPositionY;
    }

}

