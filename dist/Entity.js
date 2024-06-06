"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
class Entity {
    constructor(entityManager) {
        this._entityManager = entityManager;
        this.entityUUID = this._entityManager.generateUUID();
        this._components = {};
        this.alive = false;
    }
    reset() {
        this.alive = false;
        // there may be some more logic in here in the future
        // such as going through all the components and deleting those
    }
    setName(name) {
        this.name = name;
        this._entityManager.saveNamedEntity(name, this);
    }
}
exports.Entity = Entity;
