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
    #coordinateList

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
}

