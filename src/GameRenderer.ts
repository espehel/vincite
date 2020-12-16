import { TerrainTextures } from './assets-loader';
import { Application, Sprite } from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import { listenKeyDown } from './utils/key-events';
import { MapTile } from './map-generator';

export default class GameRenderer {
  viewport: Viewport;

  constructor(app: Application) {
    this.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: 1000,
      worldHeight: 1000,
      interaction: app.renderer.plugins.interaction,
    });
    app.stage.addChild(this.viewport);
    this.viewport.drag().pinch().wheel().decelerate();
    this.setupListeners();
  }

  setupListeners = () => {
    listenKeyDown('w', () => {
      this.viewport.moveCenter(
        this.viewport.center.x,
        this.viewport.center.y - 5
      );
    });
    listenKeyDown('d', () => {
      this.viewport.moveCenter(
        this.viewport.center.x + 5,
        this.viewport.center.y
      );
    });
    listenKeyDown('a', () => {
      this.viewport.moveCenter(
        this.viewport.center.x - 5,
        this.viewport.center.y
      );
    });
    listenKeyDown('s', () => {
      this.viewport.moveCenter(
        this.viewport.center.x,
        this.viewport.center.y + 5
      );
    });
  };

  renderMap = (map: Array<MapTile>, textures: TerrainTextures) => {
    map.forEach((mapTile) => {
      const tile = new Sprite(textures[mapTile.terrain]);
      const offset = (mapTile.y % 2) * 60;
      tile.x = mapTile.x * 120 + offset;
      tile.y = mapTile.y * 100;
      tile.anchor.set(0.5);
      this.viewport.addChild(tile);
    });
  };
}
