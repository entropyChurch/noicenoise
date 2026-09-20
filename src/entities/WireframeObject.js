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


    constructor(objectPositionX, objectPositionY, directionX, directionY, color)
    {
        this.#objectPositionX = objectPositionX;
        this.#objectPositionY = objectPositionY;

        // Normalize the direction vector
        const magnitude = Math.hypot(directionX, directionY);
        if (magnitude > 0)
        {
            this.#directionX = directionX / magnitude;
            this.#directionY = directionY / magnitude;
        }
        else
        {
            this.#directionX = 0;
            this.#directionY = 0;
        }
        this.#directionX = directionX;
        this.#directionY = directionY;

        this.#color = color;
        this.#coordinateList = new Array;
        this.#speed = 0;
    }

    update(deltaTime)
    {
        this.rotateObject(deltaTime)
        this.moveObject(deltaTime)
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
}

