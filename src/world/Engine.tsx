// This is a world.
// Worlds are the top-level containers or collection of all entities, components, and systems for a given instance
// Worlds are responsible for managing the lifecycle of each element or facilitating interactions between them and have
// methods for creating, removing, and updating all parts of the ecs. In addition, the world is also going to manage a global state/store

import React, { createContext, useContext, useEffect } from 'react';
import { Clock } from 'three';
import { EntityManager } from "./EntityManager";

// https://github.com/ecsyjs/ecsy/blob/dev/src
// https://github.com/NateTheGreatt/bitECS/blob/master/src/World.js

const EngineContext = createContext<Engine | null>(null);
export type FrameCallback = () => void;

export interface Engine {
    entityManager: EntityManager
    clock: Clock
    // scenes: any[] // scene.json files
}

export class Engine {
    static instance: Engine;
    private _animationFrameId: number | null;
    private _frameCallbacks: FrameCallback[];

    constructor() {
        if (Engine.instance) return Engine.instance;
        this.entityManager = new EntityManager(this);
        // this.componentsManager = new ComponentManager(this);
        // this.systemManager = new SystemManager(this);

        // this.scenes = [];

        this.clock = new Clock();
        this._animationFrameId = null; // if you want to cancel animation frame, use this id to clear it. Avoiding memory leaks
        this._frameCallbacks = []; // every frame, will execute the callbacks provided

        Engine.instance = this;
    }

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
            this._frameCallbacks.forEach((callback) => callback());

            this._animationFrameId = requestAnimationFrame(tick);
        }
        tick();
    }

    start(): void {
        if (!this._animationFrameId) this.execute();
    }

    stop(): void {
        if (this._animationFrameId) {
            cancelAnimationFrame(this._animationFrameId);
            this._animationFrameId = null;
        }
        this._frameCallbacks.forEach((cb) => this.unregisterFrameCallback(cb))
    }

    registerFrameCallback(callback: FrameCallback): void {
        this._frameCallbacks.push(callback);
    }

    unregisterFrameCallback(callback: FrameCallback): void {
        const index = this._frameCallbacks.indexOf(callback);
        if (index !== -1) {
            this._frameCallbacks.splice(index, 1);
        }
    }
}

export const EngineProvider: React.FC = ({ children }) => {
    const engineInstance = new Engine();

    useEffect(() => {
        return () => engineInstance.stop();
    }, [])

    return (
        <EngineContext.Provider value={engineInstance}>
            {children}
        </EngineContext.Provider>
    );
};

export const useECS = () => {
    const engineInstance = useContext(EngineContext);
    if (!engineInstance) throw new Error('useECS methods must be used within a child of EngineProvider: <EngineProvider>{children}</EngineProvider>');
    return engineInstance;
}

// Use case of Engine in a React app:
// import React from 'react';
// import { EngineProvider, useECS } from './Engine';
// const ComponentUsingTHREE = () => {
//     return (
//         <EngineProvider>
//             <MyComponent />
//         </EngineProvider>
//     );
// };

// then inside MyComponent:
// const engine = useECS();
// Now you can access engine.defineComponent, engine.entityManager.createEntity, etc.

