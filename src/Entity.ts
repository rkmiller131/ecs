import { EntityManager } from "./world/EntityManager";

export interface Entity {
    entityUUID: number
}

export class Entity {
    private _entityManager: EntityManager | null;
    private _components: any; 

    constructor(entityManager) {
      this._entityManager = entityManager || null;
  
      // Unique ID for this entity
      this.entityUUID = entityManager._nextEntityId++;
  
      this._components = {};
    }
}