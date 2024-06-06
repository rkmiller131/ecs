import { EntityManager } from './world/EntityManager';
export interface Entity {
    entityUUID: number;
    alive: boolean;
    name?: string;
}
export declare class Entity {
    private _entityManager;
    private _components;
    constructor(entityManager: EntityManager);
    reset(): void;
    setName(name: string): void;
}
