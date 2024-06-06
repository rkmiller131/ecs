type Constructor<T> = new (...args: any[]) => T;
export interface ObjectPool<T> {
    objectClass: Constructor<T>;
    pool: T[];
    maxSize: number;
    objectManager: any;
}
export declare class ObjectPool<T> {
    constructor(objectClass: Constructor<T>, parentManager: any, maxSize?: number);
    acquire(): T;
    release(object: T): void;
}
export {};
