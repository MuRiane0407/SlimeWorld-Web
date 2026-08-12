// 摄像机
export class Camera {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    move(x, y) {
        this.x += x;
        this.y += y;
    }
}
