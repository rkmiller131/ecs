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
}
export class ObjectPool<T> {

    constructor(objectClass: Constructor<T>) {
        this.objectClass = objectClass;
        this.pool = [];
    }

    acquire(): T {
        return this.pool.length > 0 ? this.pool.pop()! : new this.objectClass();
    }

    release(object: T): void {
        this.pool.push(object);
    }
}
