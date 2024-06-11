import { Entity } from '../ecs/Entity';
import { ObjectPool } from '../utils/ObjectPool';
import { Engine } from './Engine';

export interface EntityManager {
    world: Engine
    pendingDeferredDeletion: boolean
    activeEntities: Set<Entity>
    entityPool: ObjectPool<Entity>
    entitiesToRecycle: Entity[]
    entitiesByName: Record<string, Entity>
}

export class EntityManager {
    private _nextEntityUUID: number;

    constructor(world: Engine) {
        this.world = world; // might not need a reference to the world, only if we need to access component manager in here
        // this.componentsManager = this.world.componentsManager;

        this.activeEntities = new Set();
        this.entityPool = new ObjectPool(Entity, this);
        this._nextEntityUUID = 0;

        this.entitiesByName = {};

        // deferred deletion
        this.pendingDeferredDeletion = false
        this.entitiesToRecycle = [];
        // this.entitiesWithComponentsToRemove = [];
    }

    createEntity(): Entity {
        const entity = this.entityPool.acquire();
        entity.reset();
        entity.alive = true;
        this.activeEntities.add(entity);
        return entity;
    }

    getEntityByName(name: string): Entity | undefined {
        return this.entitiesByName[name]
    }

    getEntityByUUID(uuid: number): Entity | undefined {
        for (const entity of this.activeEntities) {
            if (entity.entityUUID === uuid) {
                return entity;
            }
        }
        return undefined;
    }

    generateUUID(): number {
        this._nextEntityUUID++;
        return this._nextEntityUUID;
    }

    saveNamedEntity(name: string, entity: Entity): void {
        if (this.entitiesByName[name]) {
            console.error(`Entity name '${name}' already exists. Aborting...`);
        } else {
            this.entitiesByName[name] = entity;
        }
    }

    processDeferredDeletion(): void {
        for (const entity of this.entitiesToRecycle) {
            if (entity.alive) {
                console.warn(`[WARNING] ${entity.entityUUID} is an active entity. This may indicate a logic error. Use "removeEntity(Entity)" to properly recycle this entity.`);
            }
            this.entityPool.release(entity);
        }
        this.entitiesToRecycle = [];
        this.pendingDeferredDeletion = false;
    }

    removeEntity(entity: Entity): void {
        entity.name && delete this.entitiesByName[entity.name];
        entity.reset();
        this.entitiesToRecycle.push(entity);
        this.activeEntities.delete(entity);
        this.pendingDeferredDeletion = true;
    }
}