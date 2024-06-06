import React from 'react';
import { Entity } from './Entity';
import { Engine, FrameCallback } from './world/Engine';
interface EngineContextType {
    engine: Engine;
    createEntity: () => Entity;
    removeEntity: (entity: Entity) => void;
    getEntityByName: (name: string) => Entity | undefined;
    getEntityByUUID: (uuid: number) => Entity | undefined;
    execute: (callback: FrameCallback) => void;
}
export declare const useEngine: () => EngineContextType;
interface EngineProviderProps {
    children: React.ReactNode;
}
export declare const EngineProvider: React.FC<EngineProviderProps>;
export {};
