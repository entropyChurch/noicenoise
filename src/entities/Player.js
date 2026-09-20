import { WireframeObject } from "./WireframeObject.js";

export class Player extends WireframeObject
{

    #health;
    #targetDirectionX;
    #targetDirectionY;
    #rotation;
    #turnSpeed;
    #rotate;

    constructor(positionX, positionY, velocityX, velocityY, color, health)
    {
        super(positionX, positionY, velocityX, velocityY, color);
        this.#health = health;
        this.addCoordinate(this.getObjectPositionX(), this.getObjectPositionY() - 50);
        this.addCoordinate(this.getObjectPositionX() + 30, this.getObjectPositionY() + 20);
        this.addCoordinate(this.getObjectPositionX(), this.getObjectPositionY());
        this.addCoordinate(this.getObjectPositionX() - 30, this.getObjectPositionY() + 20);
        this.#targetDirectionX = 0;
        this.#targetDirectionY = 0;
        this.#turnSpeed = 10;
        this.#rotation = -Math.PI / 2;
        this.#rotate = true;
    }

    setInputMovementVector(targetDirectionX, targetDirectionY)
    {
        const magnitude = Math.hypot(targetDirectionX, targetDirectionY);

        if (magnitude === 0)
        {
            this.#targetDirectionX = 0;
            this.#targetDirectionY = 0;
            return;
        }

        this.#targetDirectionX = targetDirectionX / magnitude;
        this.#targetDirectionY = targetDirectionY / magnitude;
    }

    calculateDirection(deltaTime)
    {   
        // No input: don't change direction
        if (this.#targetDirectionX === 0 &&  this.#targetDirectionY === 0) return;

        // Where do we want the player to point?
        const targetAngle = Math.atan2(this.#targetDirectionY, this.#targetDirectionX);

        // Where is he currently pointing towards?
        const currentAngle = Math.atan2(this.getDirectionY(),this.getDirectionX());

        // Whats the difference?
        let angleDifference = targetAngle - currentAngle;

        // Normalize the vector for the difference
        if (angleDifference > Math.PI)
            angleDifference -= Math.PI * 2;

        if (angleDifference < -Math.PI)
            angleDifference += Math.PI * 2;

        const maxTurn = this.#turnSpeed * deltaTime;

        // Quick maths
        const turn = Math.sign(angleDifference) * Math.min(Math.abs(angleDifference), maxTurn);
    
        const newAngle = currentAngle + turn;

        this.setDirectionX(Math.cos(newAngle));
        this.setDirectionY(Math.sin(newAngle));
   
    }

    rotateObject()
    {
        if (this.#rotate == true)
        {
            if (this.getDirectionX() === 0 && this.getDirectionY() === 0)
                return;

            const newRotation = Math.atan2(this.getDirectionY(), this.getDirectionX());

            let rotationDelta = newRotation - this.#rotation;

            if (rotationDelta > Math.PI)
            {
                rotationDelta -= Math.PI * 2;
            }

            if (rotationDelta < -Math.PI)
            {
                rotationDelta += Math.PI * 2;
            }

            const cos = Math.cos(rotationDelta);
            const sin = Math.sin(rotationDelta);

            for (const coordinate of this.getCoordinateList())
            {
                // Translate point so object position becomes (0, 0)
                const x =
                    coordinate.getPositionX() -
                    this.getObjectPositionX();

                const y =
                    coordinate.getPositionY() -
                    this.getObjectPositionY();

                // Rotate around (0, 0)
                const rotatedX = x * cos - y * sin;
                const rotatedY = x * sin + y * cos;

                // Translate back
                coordinate.setPositionX(rotatedX + this.getObjectPositionX());

                coordinate.setPositionY(rotatedY + this.getObjectPositionY());
            }

            this.#rotation = newRotation;
        }
    }

}