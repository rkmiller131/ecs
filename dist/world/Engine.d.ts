import { Clock } from '../utils/Clock';
import { EntityManager } from './EntityManager';
export type FrameCallback = () => void;
export interface Engine {
    entityManager: EntityManager;
    clock: Clock;
}
export declare class Engine {
    static instance: Engine;
    private _animationFrameId;
    private _frameCallbacks;
    constructor();
    execute(): void;
    start(): void;
    stop(): void;
    registerFrameCallback(cb: FrameCallback): void;
    unregisterFrameCallback(cb: FrameCallback): void;
}
