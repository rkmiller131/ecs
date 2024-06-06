"use strict";
// create a pool in an ECS involves creating a mechanism to efficiently manage and reuise instances
// The purpose of an object pool is to avoid the overhead of creating and destroying objects frequently, which
// can improve performance in systems where objects are frequently created and destroyed.
// object pool is the parent class that handles generic functionality of object pooling, such as acquiring and releasing objects
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectPool = void 0;
class ObjectPool {
    // todo: add dynamic size increase/decrease - adjust pool size based on usage patterns or system/hardware resources
    constructor(objectClass, parentManager, maxSize = 200) {
        this.objectClass = objectClass;
        this.pool = [];
        this.maxSize = maxSize;
        this.objectManager = parentManager;
    }
    acquire() {
        if (this.pool.length > 0)
            return this.pool.shift();
        if (this.pool.length < this.maxSize) {
            const obj = new this.objectClass(this.objectManager);
            return obj;
        }
        else {
            throw new Error('Max object pool size has been reached');
        }
    }
    release(object) {
        this.pool.push(object);
    }
}
exports.ObjectPool = ObjectPool;
