import { HashMap } from '../utils/HashMap';
import { Clock } from '../utils/Clock';
import { EntityManager } from './EntityManager';

// This is a world.
// Worlds are the top-level containers or collection of all entities, components, and systems for a given instance
// Worlds are responsible for managing the lifecycle of each element or facilitating interactions between them and have
// methods for creating, removing, and updating all parts of the ECS. In addition, the world is also going to manage a global state/store

// ----------------------Learning Resources ------------------------
// https://github.com/ecsyjs/ecsy/blob/dev/src
// https://github.com/NateTheGreatt/bitECS/blob/master/src/World.js
// -----------------------------------------------------------------

export type FrameCallback = () => void;

export interface Engine {
    entityManager: EntityManager
    clock: Clock
    isRunning: boolean // let's you know if an execute loop has started yet
    frameCallbacks: HashMap<number, FrameCallback>;
    // scenes: any[] // scene.json files? maybe config files? tbd
}

export class Engine {
    static instance: Engine;
    private _animationFrameId: number | null;

    constructor() {
        if (Engine.instance) return Engine.instance;
        this.entityManager = new EntityManager(this);
        // this.componentsManager = new ComponentManager(this);
        // this.systemManager = new SystemManager(this);

        // this.scenes = [];

        this.clock = new Clock();
        this._animationFrameId = null; // if you want to cancel animation frame, use this id to clear it. Avoiding memory leaks
        this.frameCallbacks = new HashMap(); // every frame, will execute the callbacks provided
        this.isRunning = false; // only starts running when an execute is called.

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

    execute(): void {
        const tick = () => {
            if (this.entityManager.pendingDeferredDeletion) this.entityManager.processDeferredDeletion();

            // every frame execute callbacks from the client
            this.frameCallbacks.forEach((callback) => callback());

            this._animationFrameId = requestAnimationFrame(tick);
        }
        tick();
    }

    start(): void {
        if (!this._animationFrameId) {
            this.isRunning = true;
            this.execute();
        }
    }

    stop(): void {
        if (this._animationFrameId) {
            cancelAnimationFrame(this._animationFrameId);
            this._animationFrameId = null;
        }
        this.frameCallbacks.clear();
        this.frameCallbacks = new HashMap();
    }

    registerFrameCallback(cb: FrameCallback): void {
        this.frameCallbacks.register(cb);
    }
}