import { Entity } from "../Entity";
import { ObjectPool } from "../pools/ObjectPool";
import { Engine } from "./Engine";

export interface EntityManager {
    world: Engine
    pendingDeferredDeletion: boolean
}

export class EntityManager {
    private _entities: Entity[];
    private _entitiesToRecycle: Entity[];
    // private _entitiesByName: Record<string, Entity>;
    private _nextEntityUUID: number;
    private _entityPool: ObjectPool<Entity>;

    constructor(world) {
        this.world = world;
        // this.componentsManager = world.componentsManager;

        this._entityPool = new ObjectPool(Entity);
        this._entities = [];
        this._nextEntityUUID = 0;

        // this._entitiesByName = {}; // name: 123

        // // deferred deletion
        this.pendingDeferredDeletion = false
        this._entitiesToRecycle = [];
        // this.entitiesWithComponentsToRemove = [];
    }

    // getEntityByName(name): Entity {
    //     return this._entitiesByName[name]
    // }

    createEntity(): Entity {
        const entity = this._entityPool.acquire();
        entity.reset();
        entity.alive = true;
        this._entities.push(entity);
        return entity;
    }

    removeEntity(entity: Entity): void {
        entity.reset();
        this._entitiesToRecycle.push(entity);
        this.pendingDeferredDeletion = true;
    }


    processDeferredDeletion(): void {
        for (const entity of this._entitiesToRecycle) {
            if (entity.alive) console.warn(`[WARNING] ${entity.entityUUID} is an active entity. This may indicate a logic error. Use "removeEntity(entityUUID)" to properly recycle this entity.`)
            this._entityPool.release(entity);
        }
        this._entitiesToRecycle = [];
        this.pendingDeferredDeletion = false;
    }

      // when setting a nameComponent, make sure to check:
        // if (name) {
        //   if (this._entitiesByNames[name]) {
        //     console.warn(`Entity name '${name}' already exist`);
        //   } else {
        //     this._entitiesByNames[name] = entity;
        //   }
        // }
}