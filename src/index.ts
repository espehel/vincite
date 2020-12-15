import { Application, Sprite, Loader } from 'pixi.js';
import { scaleToWindow } from './utils/scaleToWindow/scaleToWindow';
import { listenKeyDown } from './utils/key-events';
import { Viewport } from 'pixi-viewport';

const loader = Loader.shared;

const map = [
  [
    'dirt_02.png',
    'dirt_02.png',
    'dirt_02.png',
    'dirt_02.png',
    'dirt_02.png',
    'dirt_02.png',
  ],
  [
    'dirt_02.png',
    'dirt_02.png',
    'dirt_02.png',
    'dirt_02.png',
    'dirt_02.png',
    'dirt_02.png',
  ],
  [
    'dirt_02.png',
    'dirt_02.png',
    'dirt_02.png',
    'dirt_02.png',
    'dirt_02.png',
    'dirt_02.png',
  ],
  [
    'dirt_02.png',
    'dirt_02.png',
    'dirt_02.png',
    'dirt_02.png',
    'dirt_02.png',
    'dirt_02.png',
  ],
];

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

const sprites = new Map<String, Sprite>();

loader.onProgress.add((loader) => {
  console.log(`progress: ${loader.progress}%`);
});

loader.add('terrain', './terrain.json').load(() => {
  let terrain = loader.resources.terrain.textures;
  if (terrain) {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const tile = new Sprite(terrain[map[i][j]]);
        const offset = (i % 2) * 60;
        tile.x = j * 120 + offset;
        tile.y = i * 100;
        tile.anchor.set(0.5);
        viewport.addChild(tile);
      }
    }
  }
});
