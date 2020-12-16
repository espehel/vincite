import { Loader, Texture } from 'pixi.js';

const loader = Loader.shared;

export type TerrainTextures = Required<Record<TerrainType, Texture>>;
export type ResourceType = 'terrain';
export type TerrainType = 'grass' | 'desert' | 'mountain' | 'forest' | 'plain';

export const loadAssets = (): Promise<TerrainTextures> =>
  new Promise<TerrainTextures>((resolve, reject) => {
    try {
      loader.onProgress.add((loader) => {
        console.log(`progress: ${loader.progress}%`);
      });

      loader.add('terrain', './terrain.json').load((loader, resources) => {
        const getTexture = (resource: ResourceType, name: string): Texture => {
          const type = resources[resource];
          if (type && type.textures) {
            return type.textures[name];
          }
          throw new Error(`Resource ${resource} is not loaded properly.`);
        };

        resolve({
          desert: getTexture('terrain', 'sand_07.png'),
          forest: getTexture('terrain', 'grass_12.png'),
          grass: getTexture('terrain', 'grass_05.png'),
          mountain: getTexture('terrain', 'dirt_18.png'),
          plain: getTexture('terrain', 'dirt_06.png'),
        });
      });
    } catch (e) {
      reject(e);
    }
  });
