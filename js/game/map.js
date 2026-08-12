import { tileIndexes } from "./tile.js";

// 生成地图
export function loadMap(map, size) {
    for (let y = -size/2 ; y < size/2 ; y++) {
        for (let x = -size/2 ; x < size/2 ; x++) {
            map[`${x}.${y}`] = Math.floor(Math.random()*tileIndexes.length);
        }
    }
}