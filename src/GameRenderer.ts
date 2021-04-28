import { Textures } from './assets-loader';
import { Application, Sprite } from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import { listenKeyDown } from './utils/key-events';
import { MapTile } from './map-generator';

export default class GameRenderer {
  viewport: Viewport;
  textures: Textures;

  constructor(app: PIXI.Application, textures: Textures) {
    this.textures = textures;
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

  renderMap = (map: Array<MapTile>) => {
    map.forEach(this.renderTile);
  };

  renderTile = (tile: MapTile) => {
    const sprite = new Sprite(this.textures[tile.terrain]);
    const offset = (tile.y % 2) * 60;
    sprite.x = tile.x * 120 + offset;
    sprite.y = tile.y * 100;
    sprite.anchor.set(0.5);
    this.viewport.addChild(sprite);
  };
}
