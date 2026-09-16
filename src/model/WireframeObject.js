import { Coordinate } from "./Coordinate.js";

export class WireframeObject
{

    #coordinates;
    #autoComplete;
    #speedX;
    #speedY;
    #orientation;
    #objectPositionX;
    #objectPositionY;
    #color;
    #coordinateList = new Array();

    constructor(objectPositionX, objectPositionY, speedX, speedY, orientation, color)
    {
        this.#objectPositionX = objectPositionX;
        this.#objectPositionY = objectPositionY;
        this.#speedX = speedX;
        this.#speedY = speedY;
        this.#orientation = orientation;
        this.#color = color;
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

    makeRectangle(rectangleWidth, rectangleHeight)
    {
        this.clearCoordinates();
        this.addCoordinate(this.#objectPositionX, this.#objectPositionY);
        this.addCoordinate(this.#objectPositionX + rectangleWidth, this.#objectPositionY);
        this.addCoordinate(this.#objectPositionX + rectangleWidth, this.#objectPositionY + rectangleHeight);
        this.addCoordinate(this.#objectPositionX, this.#objectPositionY + rectangleHeight);
    }

    makePlayer()
    {
        this.addCoordinate(this.#objectPositionX, this.#objectPositionY)
        this.addCoordinate(this.#objectPositionX + 25, this.#objectPositionY + 60)
        this.addCoordinate(this.#objectPositionX + 50, this.#objectPositionY)
        this.addCoordinate(this.#objectPositionX + 25, this.#objectPositionY + 15)
    }
}

