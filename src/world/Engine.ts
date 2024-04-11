// This is a world.
// Worlds are the top-level containers or collection of all entities, components, and systems for a given instance
// Worlds are responsible for managing the lifecycle of each element or facilitating interactions between them and have
// methods for creating, removing, and updating all parts of the ecs. In addition, the world is also going to manage a global state/store

import { EntityManager } from "./EntityManager";

// https://github.com/ecsyjs/ecsy/blob/dev/src
// https://github.com/NateTheGreatt/bitECS/blob/master/src/World.js

export interface Engine {
    entityManager: EntityManager
}

export class Engine {
    static instance: Engine;

    constructor() {
        this.entityManager = new EntityManager(this);
        // this.componentsManager = new ComponentManager(this);
        // this.systemManager = new SystemManager(this);
    }

    // api: feathers app/backend to hold reference to all registered services/real time connections for multiple ppl on one instance
    // store: a store to manage ECS specific global states

    // defineComponent(Component, objectPool) {
    //     this.componentsManager.registerComponent()..etc
    //     return this
    // }
    // defineState ... we should reference a store similar to hyperflux store
    // defineSystem ...
}