export type SceneData = {
  fromScene: string
}

export interface BaseSceneArgs {
  key: string,
  mapPath: string,
  layers: string[],
  tileSets: string[]
}
