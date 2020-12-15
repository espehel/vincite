import { Application, Sprite } from 'pixi.js';
import { scaleToWindow } from './utils/scaleToWindow/scaleToWindow';
import { listenKeyDown } from './utils/key-events';
import { Viewport } from 'pixi-viewport';
import AssetsLoader, { TerrainTextures, TerrainType } from './AssetsLoader';

let app = new Application({ antialias: true });
document.body.appendChild(app.view);
app.renderer.backgroundColor = 0x008dc7;

const viewport = new Viewport({
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
  worldWidth: 1000,
  worldHeight: 1000,
  interaction: app.renderer.plugins.interaction,
});
app.stage.addChild(viewport);

viewport.drag().pinch().wheel().decelerate();

listenKeyDown('w', () => {
  viewport.moveCenter(viewport.center.x, viewport.center.y - 5);
});
listenKeyDown('d', () => {
  viewport.moveCenter(viewport.center.x + 5, viewport.center.y);
});
listenKeyDown('a', () => {
  viewport.moveCenter(viewport.center.x - 5, viewport.center.y);
});
listenKeyDown('s', () => {
  viewport.moveCenter(viewport.center.x, viewport.center.y + 5);
});

scaleToWindow(app.renderer.view);
window.addEventListener('resize', () => {
  scaleToWindow(app.renderer.view);
});

interface MapTile {
  x: number;
  y: number;
  terrain: TerrainType;
}

const getTerrain = (): TerrainType => {
  const randomNumber = Math.random();

  const tileFitness: Array<[TerrainType, number]> = [
    ['desert', 1],
    ['forest', 1],
    ['grass', 1],
    ['mountain', 1],
    ['plain', 1],
  ];

  const fitnessSum = tileFitness.reduce((acc, [, cur]) => acc + cur, 0);
  const selection = randomNumber * fitnessSum;

  let accFitness = 0;
  for (let i = 0; i < tileFitness.length; i++) {
    const [terrain, fitness] = tileFitness[i];
    if (selection < fitness + accFitness) {
      return terrain;
    } else {
      accFitness += fitness;
    }
  }
  return tileFitness[tileFitness.length - 1][0];
};

const generateMap = (width: number, height: number) => {
  const map: Array<MapTile> = [];
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      map.push({
        x: j,
        y: i,
        terrain: getTerrain(),
      });
    }
  }
  return map;
};

const renderMap = (map: Array<MapTile>, textures: TerrainTextures) => {
  map.forEach((mapTile) => {
    const tile = new Sprite(textures[mapTile.terrain]);
    const offset = (mapTile.y % 2) * 60;
    tile.x = mapTile.x * 120 + offset;
    tile.y = mapTile.y * 100;
    tile.anchor.set(0.5);
    viewport.addChild(tile);
  });
};

AssetsLoader().then((terrainTextures) => {
  const map = generateMap(15, 15);
  renderMap(map, terrainTextures);
});
