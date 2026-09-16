export class Coordinate
{
    #positionX;
    #positionY;
     
    constructor(positionX, positionY)
    {
        this.#positionX = positionX;
        this.#positionY = positionY;
    }

    getPositionX()
    {
        return this.#positionX;
    }

    setPositionX(positionX)
    {
        this.#positionX = positionX
    }

    getPositionY()
    {
        return this.#positionY;
    }

    setPositionY(positionY)
    {
        this.#positionY = positionY;
    }
}