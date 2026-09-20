import { WireframeObject } from "./WireframeObject.js";

export class Player extends WireframeObject
{

    #health;
    #playerInput;
    #rotation;

    constructor(positionX, positionY, color, health, speed)
    {
        super(positionX, positionY, color, speed);
        this.#health = health;
        this.#rotation = 0;
        this.updateCoordinates();
    }

    setPlayerInput(playerInput)
    {
        this.#playerInput = playerInput;
    }

    update(deltaTime, boundaryX, boundaryY)
    {
        this.moveObject(deltaTime, boundaryX, boundaryY);
        this.rotateObject(deltaTime);
        this.updateCoordinates();
    }

    updateCoordinates()
    {
        this.clearCoordinates();

        const x = this.getObjectPositionX();
        const y = this.getObjectPositionY();

        const rotation = this.#rotation;

        const cos = Math.cos(rotation);
        const sin = Math.sin(rotation);

        const points = [
            { x: 0, y: -25 },
            { x: 15, y: 10 },
            { x: 0, y: 0 },
            { x: -15, y: 10 }
        ];

        for (const point of points)
        {
            const rotatedX = point.x * cos - point.y * sin;
            const rotatedY = point.x * sin + point.y * cos;

            this.addCoordinate(
                x + rotatedX,
                y + rotatedY
            );
        }
    }  

    moveObject(deltaTime, boundaryX, boundaryY)
    {
        const normalized = this.normalizeVector(this.#playerInput.movementX, this.#playerInput.movementY, "L")
        let speed = this.getSpeed();
        if (this.#playerInput.boost == true)
        {
            speed = speed * 1.5
        }
        let calculatedPositionX = this.getObjectPositionX() + normalized.x * deltaTime * speed;
        let calculatedPositionY = this.getObjectPositionY() + normalized.y * deltaTime * speed;
        
        // Bind player to the stage
        if (calculatedPositionX > boundaryX){calculatedPositionX = boundaryX};
        if (calculatedPositionX < 0){calculatedPositionX = 0};
        if (calculatedPositionY > boundaryY){calculatedPositionY = boundaryY};
        if (calculatedPositionY < 0){calculatedPositionY = 0};

        this.setObjectPositionX(calculatedPositionX);
        this.setObjectPositionY(calculatedPositionY);
    }   

    rotateObject(deltaTime)
    {
        const normalized = this.normalizeVector(this.#playerInput.rotationX, this.#playerInput.rotationY, "R");

        if (normalized.x === 0 && normalized.y === 0) return;

        const targetRotation = Math.atan2(normalized.y, normalized.x) + Math.PI / 2;

        let difference = targetRotation - this.#rotation;

        // Keep difference between -PI and PI
        difference = Math.atan2(Math.sin(difference),Math.cos(difference));

        const rotationSpeed = 30;

        this.#rotation += difference * rotationSpeed * deltaTime;
    }

}