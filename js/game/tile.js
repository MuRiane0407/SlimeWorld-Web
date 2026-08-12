import { strReplaceAt } from "./utils.js";

// 图块信息
export const tileIndexes = [0, 1];
const tileTypes = {
    0: 'dirt',
    1: 'grass'
};
const tileSize = 16;
const tilePieceLookUp = new Array(256);
const tilePieceWidth = 12;
const tilePieceHeight = 4;

class Tile {
    constructor(from, to, id) {
        this.from = from;
        this.to = to;
        this.id = id;
    }
}

// 初始化47-piece查找表
export function loadtilePieceLookUp() {
    const tilePieceTab = {
        36: '?1?11?1?',

        0:  '?1?11?0?',
        12: '?0?11?0?',
        24: '?0?11?1?',

        37: '?1?10?1?',
        38: '?1?00?1?',
        39: '?1?01?1?',

        1:  '?1?10?01',
        2:  '?1?00101',
        3:  '?1?0110?',
        13: '?0110?01',
        14: '10100101',
        15: '10?0110?',
        25: '?0110?1?',
        26: '10100?1?',
        27: '10?01?1?',

        4:  '00100101',
        5:  '?1?00100',
        6:  '?1?00001',
        7:  '10000101',
        16: '?0110?00',
        17: '10000000',
        18: '00100000',
        19: '10?0100?',
        28: '?0010?01',
        29: '00000100',
        30: '00000001',
        31: '00?0110?',
        40: '10100001',
        41: '10000?1?',
        42: '00100?1?',
        43: '10100100',

        8:  '?1?10?00',
        9:  '10100000',
        10: '?1?00000',
        11: '?1?0100?',
        20: '?0010?00',
        21: '10000001',
        // 22
        23: '00100001',
        32: '10000100',
        33: '00000000',
        34: '00100100',
        35: '00?0100?',
        44: '?0010?1?',
        45: '00000?1?',
        46: '00000101',
        47: '00?01?1?'
    }
    for (const key in tilePieceTab){
        const rawMasks = [tilePieceTab[key]];
        while (rawMasks.length != 0){
            const rawMask = rawMasks[0];
            rawMasks.shift();

            const index = rawMask.indexOf('?');
            if (index != -1){
                rawMasks.push(strReplaceAt(rawMask, index, '0'));
                rawMasks.push(strReplaceAt(rawMask, index, '1'));
            }else{
                tilePieceLookUp[parseInt(rawMask, 2)] = key;
            }
        }
    }
}

// 图块渲染
export function renderTiles(ctx, camera, map, width, height) {
    for (let offsetY = -Math.floor(height/2/tileSize) ; offsetY < Math.ceil(height/2/tileSize) ; offsetY++) {
        for (let offsetX = -Math.floor(width/2/tileSize) ; offsetX < Math.ceil(width/2/tileSize) ; offsetX++) {
            const x = camera.x + offsetX;
            const y = camera.y + offsetY;

            const tile = getTile(map, x, y);
            renderTile(ctx, tile, offsetX, offsetY, width, height);
        }
    }
}

// 获取应当渲染的图块
function getTile(map, x, y) {
    const i = map[`${x}.${y}`] ?? 0;
    const around = [
        map[`${x-1}.${y-1}`] ?? 0, map[`${x}.${y-1}`] ?? 0, map[`${x+1}.${y-1}`] ?? 0,
        map[`${x-1}.${y}`] ?? 0,                            map[`${x+1}.${y}`] ?? 0,
        map[`${x-1}.${y+1}`] ?? 0, map[`${x}.${y+1}`] ?? 0, map[`${x+1}.${y+1}`] ?? 0
    ]

    if (i <= Math.min(...around)) {
        // 整块
        return new Tile(tileTypes[i], null, -1);
    }else{
        // 非整块
        const from = tileTypes[i];
        const to = tileTypes[Math.min(...around)];
        let mask = 0;
        for (const key in around) {
            mask = mask << 1;
            mask = around[key] < i ? mask+1 : mask;
        }
        const id = tilePieceLookUp[mask] ?? -1;
        return new Tile(from, to, id);
    }
}

// 渲染对应的图块
function renderTile(ctx, tile, x, y, width, height){
    const img = new Image();
    if (tile.id == -1){
        img.src = `assets/textures/tiles/${tile.from}.png`;
        ctx.drawImage(img, width/2 + x*tileSize - tileSize/2, height/2 + y*tileSize - tileSize/2, tileSize, tileSize);
    }else{
        img.src = `assets/textures/tiles/${tile.from}.${tile.to}.png`;
        const sx = tile.id % tilePieceWidth;
        const sy = Math.floor(tile.id/tilePieceWidth);
        ctx.drawImage(img, sx*tileSize, sy*tileSize, tileSize, tileSize, width/2 + x*tileSize - tileSize/2, height/2 + y*tileSize - tileSize/2, tileSize, tileSize);
        // 若材质不存在
        img.onerror = function() {
            img.src = `assets/textures/tiles/${tile.from}.png`;
            ctx.drawImage(img, width/2 + x*tileSize - tileSize/2, height/2 + y*tileSize - tileSize/2, tileSize, tileSize);
        }
    }
}