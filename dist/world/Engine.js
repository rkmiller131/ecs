"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Engine = void 0;
const Clock_1 = require("../utils/Clock");
const EntityManager_1 = require("./EntityManager");
class Engine {
    constructor() {
        if (Engine.instance)
            return Engine.instance;
        this.entityManager = new EntityManager_1.EntityManager(this);
        // this.componentsManager = new ComponentManager(this);
        // this.systemManager = new SystemManager(this);
        // this.scenes = [];
        this.clock = new Clock_1.Clock();
        this._animationFrameId = null; // if you want to cancel animation frame, use this id to clear it. Avoiding memory leaks
        this._frameCallbacks = []; // every frame, will execute the callbacks provided
        Engine.instance = this;
    }
    // ------------------- future todos: -----------------------------------------------------------
    // api: feathers app/backend to hold reference to all registered services/real time connections for multiple ppl on one instance
    // store: a store to manage ECS specific global states
    // defineComponent(Component, objectPool) {
    //     this.componentsManager.registerComponent()..etc
    //     return this
    // }
    // defineState ... we should reference a store similar to hyperflux store
    // defineSystem ...
    execute() {
        const tick = () => {
            if (this.entityManager.pendingDeferredDeletion)
                this.entityManager.processDeferredDeletion();
            // every frame execute callbacks from the client
            this._frameCallbacks.forEach((callback) => callback());
            this._animationFrameId = requestAnimationFrame(tick);
        };
        tick();
    }
    start() {
        if (!this._animationFrameId)
            this.execute();
    }
    stop() {
        if (this._animationFrameId) {
            cancelAnimationFrame(this._animationFrameId);
            this._animationFrameId = null;
        }
        this._frameCallbacks.forEach((cb) => this.unregisterFrameCallback(cb));
    }
    registerFrameCallback(cb) {
        this._frameCallbacks.push(cb);
    }
    unregisterFrameCallback(cb) {
        const index = this._frameCallbacks.indexOf(cb);
        if (index !== -1) {
            this._frameCallbacks.splice(index, 1);
        }
    }
}
exports.Engine = Engine;
