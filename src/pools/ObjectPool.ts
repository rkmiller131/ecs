// create a pool in an ECS involves creating a mechanism to efficiently manage and reuise instances
// The purpose of an object pool is to avoid the overhead of creating and destroying objects frequently, which
// can improve performance in systems where objects are frequently created and destroyed.
// object pool is the parent class that handles generic functionality of object pooling, such as acquiring and releasing objects

// define a generic type T to represent the type of objects being pooled.
// Constructor<T> is an alias to represent the constructor function of T, allowing us to create new instances of T
type Constructor<T> = new (...args: any[]) => T;
export interface ObjectPool<T> {
    objectClass: Constructor<T>;
    pool: T[];
    maxSize: number;
}
export class ObjectPool<T> {

    // todo: add dynamic size increase/decrease - adjust pool size based on usage patterns or system/hardware resources
    constructor(objectClass: Constructor<T>, maxSize: number = 300) { // changing the pool size is an opp for performance on lower end devices
        this.objectClass = objectClass;
        this.pool = [];
        this.maxSize = maxSize
    }

    acquire(): T {
        if (this.pool.length > 0) return this.pool.pop()!;
        if (this.pool.length < this.maxSize) {
            return new this.objectClass();
        } else {
            throw new Error('Max object pool size has been reached')
        }
    }

    release(object: T): void {
        if (this.pool.length < this.maxSize) {
            this.pool.push(object);
        } else {
            throw new Error('Cannot release object to a full object pool');
        }
    }
}
