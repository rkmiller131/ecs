import { EntityManager } from './world/EntityManager';

export interface Entity {
    entityUUID: number
    alive: boolean
    name?: string
}

export class Entity {
    private _entityManager: EntityManager;
    private _components: any;

    constructor(entityManager) {
      this._entityManager = entityManager;
      this.entityUUID = this._entityManager.generateUUID();

      this._components = {};
      this.alive = false;
    }

    reset(): void {
      this.alive = false;
      // there may be some more logic in here in the future
      // such as going through all the components and deleting those
    }

    setName(name: string): void {
      this.name = name;
      this._entityManager.saveNamedEntity(name, this);
    }
}