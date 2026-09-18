import { Coordinate } from "../model/Coordinate.js";

export class WireframeObject
{

    #velocityX;
    #velocityY;
    #objectPositionX;
    #objectPositionY;
    #color;
    #coordinateList;


    constructor(objectPositionX, objectPositionY, velocityX, velocityY, color)
    {
        this.#objectPositionX = objectPositionX;
        this.#objectPositionY = objectPositionY;
        this.#velocityX = velocityX;
        this.#velocityY = velocityY;
        this.#color = color;
        this.#coordinateList = new Array;
    }

    update(deltaTime)
    {
        this.calculateVelocity(deltaTime)
        this.rotateObject(deltaTime)
        this.updatePosition(deltaTime)
    }

    calculateVelocity(deltaTime)
    {
        // Implemented at specific entity level
    }

    rotateObject(deltaTime)
    {
        // Implemented at specific entity level
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

    getCoordinateList()
    {
        return this.#coordinateList;
    }

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

    setColor(color)
    {
        this.#color = color;
    }

    getObjectPositionX()
    {
        return this.#objectPositionX;
    }

    setObjectPositionX(objectPositionX)
    {
        this.#objectPositionX = objectPositionX;
    }

    getObjectPositionY()
    {
        return this.#objectPositionY;
    }

    setObjectoPositonY(objectPositionY)
    {
        this.#objectPositionY = objectPositionY;
    }

    getVelocityX()
    {
        return this.#velocityX;
    }

    setVelocityX(velocityX)
    {
        this.#velocityX = velocityX;
    }

    getVelocityY()
    {
        return this.#velocityY;
    }

    setVelocityY(velocityY)
    {
        this.#velocityY = velocityY;
    }
}

