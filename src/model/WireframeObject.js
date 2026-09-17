import { Coordinate } from "./Coordinate.js";

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
        this.#objectPositionX += this.#velocityX * deltaTime;
        this.#objectPositionY += this.#velocityY * deltaTime;
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

