import { WireframeObject } from "./WireframeObject.js";

export class Bullet extends WireframeObject
{
    #rotation;
    #directionX;
    #directionY;
    #friendly;

    constructor(positionX, positionY, color, speed, positionFrontX, positionFrontY, friendly)
    {
        super(positionX, positionY, color, speed)
        this.#friendly = friendly;
        this.calcBulletDirection(positionX, positionY, positionFrontX, positionFrontY);
    }

    calcBulletDirection(playerCenterX, playerCenterY, playerFrontX, playerFrontY)
    {
        const deltaX = playerFrontX - playerCenterX;
        const deltaY = playerFrontY - playerCenterY;

        const length = Math.hypot(deltaX, deltaY);

        this.#directionX = deltaX / length;
        this.#directionY = deltaY / length;
        this.#rotation = Math.atan2(this.#directionY, this.#directionX);
    }

    update(deltaTime)
    {
        this.moveObject(deltaTime)
        this.updateCoordinates(deltaTime)
    }

    updateCoordinates(deltaTime)
    {
        this.clearCoordinates();

        const x = this.getObjectPositionX();
        const y = this.getObjectPositionY();

        const rotation = this.#rotation;

        const cos = Math.cos(rotation);
        const sin = Math.sin(rotation);

        const points = [{ x: 20, y: 0 },
                        { x: 25, y: 0}
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

    moveObject(deltaTime)
    {
        console.log(this.getSpeed())
        this.setObjectPositionX(this.getObjectPositionX() + this.#directionX * this.getSpeed() * deltaTime);
        this.setObjectPositionY(this.getObjectPositionY() + this.#directionY * this.getSpeed() * deltaTime);
    }

}