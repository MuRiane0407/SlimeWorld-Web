/* 导入 */
import { keyPress } from "./key.js";
import { loadMap } from "./map.js"
import { renderTiles, loadtilePieceLookUp } from "./tile.js";
import { Camera } from "./camera.js";

/* 定义 */
// 基本画布
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 屏幕信息
const width = window.innerWidth;
const height = window.innerHeight;

// 地图
const map = {}; // key = 'x.y'

// 物体
const camera = new Camera(0, 0);

/* 函数 */
// 物体更新总线
function update() {

}

// 渲染总线
function render() {
    renderTiles(ctx, camera, map, width, height);
}

// 游戏主循环，用于游戏的持续运行
function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

// 更新屏幕大小
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// 初始化和启动
function init() {
    resize();
    loadtilePieceLookUp();
    loadMap(map, 100);
    gameLoop();
}

/* 启动 */
init();

/* 监听事件 */
// 屏幕大小变化自动更新
window.onresize = function() {
    resize(canvas);
}

// 按下按键时触发对应按键处理函数
document.addEventListener('keydown', (e) => {
    keyPress(e, camera);
});