import { Coordinate } from "../model/Coordinate.js";

export class WireframeObject
{

    #directionX;
    #directionY;
    #objectPositionX;
    #objectPositionY;
    #color;
    #coordinateList;
    #speed;


    constructor(objectPositionX, objectPositionY, color, speed)
    {
        this.#objectPositionX = objectPositionX;
        this.#objectPositionY = objectPositionY;

        this.#color = color;
        this.#coordinateList = new Array;
        this.#speed = speed;
    }

    update(deltaTime)
    {
        this.moveObject(deltaTime)
        this.rotateObject(deltaTime)
    }

    calculateDirection(deltaTime)
    {
        // Implemented at specific entity level
    }

    rotateObject(deltaTime)
    {
        // Implemented at specific entity level
    }   

    moveObject(deltaTime)
    {
        const deltaX = this.#directionX * deltaTime * this.#speed;
        const deltaY = this.#directionY * deltaTime * this.#speed;

        this.#objectPositionX += deltaX;
        this.#objectPositionY += deltaY;

        for (const coordinate of this.#coordinateList)
        {
            coordinate.setPositionX(coordinate.getPositionX() + deltaX);
            coordinate.setPositionY(coordinate.getPositionY() + deltaY);
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

    updateCoordinates()
    {}

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

    setObjectPositionY(objectPositionY)
    {
        this.#objectPositionY = objectPositionY;
    }

    getDirectionX()
    {
        return this.#directionX;
    }

    setDirectionX(directionX)
    {
        this.#directionX = directionX;
    }

    getDirectionY()
    {
        return this.#directionY;
    }

    setDirectionY(directionY)
    {
        this.#directionY = directionY;
    }

    setSpeed(speed)
    {
        this.#speed = speed;
    }

    getSpeed()
    {
        return this.#speed;
    }

    normalizeVector(x, y, stick)
{
    const length = Math.sqrt(x * x + y * y);
    let deadzone = 0;

    if (stick == "L")
    {
        deadzone = 0.05;
    }

    if (stick == "R")
    {
        deadzone = 0.15
    }

    if (length < deadzone)
        return { x: 0, y: 0 };

    return {
        x: x / length,
        y: y / length
    };
}
}

