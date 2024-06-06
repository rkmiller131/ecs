"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityManager = void 0;
const Entity_1 = require("../Entity");
const ObjectPool_1 = require("../utils/ObjectPool");
class EntityManager {
    constructor(world) {
        this.world = world;
        // this.componentsManager = this.world.componentsManager;
        this.activeEntities = new Set();
        this.entityPool = new ObjectPool_1.ObjectPool(Entity_1.Entity, this);
        this._nextEntityUUID = 0;
        this.entitiesByName = {};
        // deferred deletion
        this.pendingDeferredDeletion = false;
        this.entitiesToRecycle = [];
        // this.entitiesWithComponentsToRemove = [];
    }
    createEntity() {
        const entity = this.entityPool.acquire();
        entity.reset();
        entity.alive = true;
        this.activeEntities.add(entity);
        return entity;
    }
    getEntityByName(name) {
        return this.entitiesByName[name];
    }
    getEntityByUUID(uuid) {
        for (const entity of this.activeEntities) {
            if (entity.entityUUID === uuid) {
                return entity;
            }
        }
        return undefined;
    }
    generateUUID() {
        this._nextEntityUUID++;
        return this._nextEntityUUID;
    }
    saveNamedEntity(name, entity) {
        if (this.entitiesByName[name]) {
            console.error(`Entity name '${name}' already exists. Aborting...`);
        }
        else {
            this.entitiesByName[name] = entity;
        }
    }
    processDeferredDeletion() {
        for (const entity of this.entitiesToRecycle) {
            if (entity.alive) {
                console.warn(`[WARNING] ${entity.entityUUID} is an active entity. This may indicate a logic error. Use "removeEntity(Entity)" to properly recycle this entity.`);
            }
            this.entityPool.release(entity);
        }
        this.entitiesToRecycle = [];
        this.pendingDeferredDeletion = false;
    }
    removeEntity(entity) {
        entity.reset();
        this.entitiesToRecycle.push(entity);
        this.activeEntities.delete(entity);
        this.pendingDeferredDeletion = true;
    }
}
exports.EntityManager = EntityManager;
