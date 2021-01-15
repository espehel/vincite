import { TerrainType } from './assets-loader';

export interface MapTile {
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

export const generateMap = (width: number, height: number) => {
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

export const getPlayerStart = (map: Array<MapTile>): MapTile => {};
