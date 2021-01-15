import { Application } from 'pixi.js';
import { scaleToWindow } from './utils/scaleToWindow/scaleToWindow';
import { loadAssets } from './assets-loader';
import { generateMap, getPlayerStart } from './map-generator';
import GameRenderer from './GameRenderer';

let app = new Application({ antialias: true });
document.body.appendChild(app.view);
app.renderer.backgroundColor = 0x008dc7;

const gameRenderer = new GameRenderer(app);

scaleToWindow(app.renderer.view);
window.addEventListener('resize', () => {
  scaleToWindow(app.renderer.view);
});

interface Settlement {
  level: 'village' | 'town' | 'city' | 'metropolis';
  x: number;
  y: number;
}

interface Player {
  settlements: Array<Settlement>;
}

const player: Player = {
  settlements: [{ level: 'village', x: 1, y: 1 }],
};

loadAssets().then((terrainTextures) => {
  const map = generateMap(15, 15);
  const playerStart = getPlayerStart(map);
  gameRenderer.renderMap(map, terrainTextures);
  gameRenderer.renderSettlement();
});
