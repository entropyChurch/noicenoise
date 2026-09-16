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

    constructor(objectPositionX, objectPositionY, speedX, speedY, orientation, autoComplete)
    {
        this.#autoComplete = autoComplete;
        this.#objectPositionX = objectPositionX;
        this.#objectPositionY = objectPositionY;
        this.#speedX = speedX;
        this.#speedY = speedY;
        this.#orientation = orientation;
        autoComplete = true;
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
        return this.#color();
    }

    makeRectangle(rectangleWidth, rectangleHeight)
    {
        this.clearCoordinates();
        this.addCoordinate(this.#objectPositionX, this.#objectPositionY);
        this.addCoordinate(rectangleWidth, this.#objectPositionY);
        this.addCoordinate(rectangleWidth, rectangleHeight);
        this.addCoordinate(this.#objectPositionX, rectangleHeight);
    }
}

