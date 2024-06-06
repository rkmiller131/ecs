import { Entity } from '../Entity';
import { ObjectPool } from '../utils/ObjectPool';
import { Engine } from './Engine';
export interface EntityManager {
    world: Engine;
    pendingDeferredDeletion: boolean;
    activeEntities: Set<Entity>;
    entityPool: ObjectPool<Entity>;
    entitiesToRecycle: Entity[];
    entitiesByName: Record<string, Entity>;
}
export declare class EntityManager {
    private _nextEntityUUID;
    constructor(world: Engine);
    createEntity(): Entity;
    getEntityByName(name: string): Entity | undefined;
    getEntityByUUID(uuid: number): Entity | undefined;
    generateUUID(): number;
    saveNamedEntity(name: string, entity: Entity): void;
    processDeferredDeletion(): void;
    removeEntity(entity: Entity): void;
}
