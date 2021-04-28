import { Loader, Texture } from 'pixi.js';

const loader = Loader.shared;

export type Textures = Required<Record<TerrainType | SettlementType, Texture>>;
export type ResourceType = 'terrain' | 'settlement';
export type TerrainType = 'grass' | 'desert' | 'mountain' | 'forest' | 'plain';
export type SettlementType = 'village';

export const loadAssets = (): Promise<Textures> =>
  new Promise<Textures>((resolve, reject) => {
    try {
      loader.onProgress.add((loader) => {
        console.log(`progress: ${loader.progress}%`);
      });

      loader
        .add('terrain', './terrain.json')
        .add('village', './house.png')
        .load((loader, resources) => {
          const getTexture = (resource: string, name?: string): Texture => {
            const type = resources[resource];
            if (type) {
              if (name && type.textures) {
                return type.textures[name];
              } else {
                return type.texture;
              }
            }
            throw new Error(`Resource ${resource} is not loaded properly.`);
          };

          resolve({
            desert: getTexture('terrain', 'sand_07.png'),
            forest: getTexture('terrain', 'grass_12.png'),
            grass: getTexture('terrain', 'grass_05.png'),
            mountain: getTexture('terrain', 'dirt_18.png'),
            plain: getTexture('terrain', 'dirt_06.png'),
            village: getTexture('village'),
          });
        });
    } catch (e) {
      reject(e);
    }
  });
