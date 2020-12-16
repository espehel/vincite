import { Application } from 'pixi.js';
import { scaleToWindow } from './utils/scaleToWindow/scaleToWindow';
import { loadAssets } from './assets-loader';
import { generateMap } from './map-generator';
import GameRenderer from './GameRenderer';

let app = new Application({ antialias: true });
document.body.appendChild(app.view);
app.renderer.backgroundColor = 0x008dc7;

const gameRenderer = new GameRenderer(app);

scaleToWindow(app.renderer.view);
window.addEventListener('resize', () => {
  scaleToWindow(app.renderer.view);
});

loadAssets().then((terrainTextures) => {
  const map = generateMap(15, 15);
  gameRenderer.renderMap(map, terrainTextures);
});
