import { Coordinate } from "./Coordinate.js";

export class WireframeObject
{

    #velocity;
    #objectPositionX;
    #objectPositionY;
    #color;
    #coordinateList;

    constructor(objectPositionX, objectPositionY, velocity, color)
    {
        this.#objectPositionX = objectPositionX;
        this.#objectPositionY = objectPositionY;
        this.#velocity = velocity;
        this.#color = color;
        this.#coordinateList = new Array;
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

    makeRectangle(rectangleWidth, rectangleHeight)
    {
        this.clearCoordinates();
        this.addCoordinate(this.#objectPositionX, this.#objectPositionY);
        this.addCoordinate(this.#objectPositionX + rectangleWidth, this.#objectPositionY);
        this.addCoordinate(this.#objectPositionX + rectangleWidth, this.#objectPositionY + rectangleHeight);
        this.addCoordinate(this.#objectPositionX, this.#objectPositionY + rectangleHeight);
    }

}

