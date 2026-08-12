// 按下按键时
export function keyPress(e, camera) {
    switch (e.key) {
        case 'w': 
            camera.move(0, -1);
            break;
        case 's':
            camera.move(0, 1);
            break;
        case 'a':
            camera.move(-1, 0);
            break;
        case 'd':
            camera.move(1, 0);
    }
}