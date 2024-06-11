import { EntityManager } from '../world/EntityManager';

export interface Entity {
    entityUUID: number
    alive: boolean
    name?: string
}

export class Entity {
    private _entityManager: EntityManager;
    private _components: any;

    constructor(entityManager: EntityManager) {
      this._entityManager = entityManager;
      this.entityUUID = this._entityManager.generateUUID();

      this._components = {};
      this.alive = false;
    }

    reset(): void {
      this.alive = false;
      this.name = '';
      // there may be some more logic in here in the future
      // such as going through all the components and deleting those
    }

    setName(name: string): void {
      if (this.name && this.name !== name) {
        throw new Error(`The entity named "${this.name}" cannot be reassigned to "${name}"`);
      }
      for (const entity of this._entityManager.activeEntities) {
        if (entity.name === name) {
          throw new Error(`Entity with the name of "${name}" already exists in the world. This could indicate a logic error if React's re-renders cause entity.setName to execute more times than intended. Entities should be saved as a ref.`);
        }
      }
      this.name = name;
      this._entityManager.saveNamedEntity(name, this);
    }
}