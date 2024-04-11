import { EntityManager } from "./world/EntityManager";

export interface Entity {
    entityUUID: number
    alive: boolean
}

export class Entity {
    private _entityManager: EntityManager | null;
    private _components: any; 

    constructor(entityManager) {
      this._entityManager = entityManager || null;
      this.entityUUID = entityManager._nextEntityId++;
  
      this._components = {};
      this.alive = true;
    }
}