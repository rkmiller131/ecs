/*
This HashMap is used for the execute method of the Engine, specifically
for registering callbacks to the frameCallbacks map. The client can potentially
register callbacks from anywhere in the app, passing a single anonymous function
to the execute function exposed from the EngineProvider. Because it's anonymous,
the only way to identify one anonymous function from another is from its stringified value.
Since we only want it to be registered once, you can create a hashed id based on its
stringified value. The same function will produce the same hash, ensuring that even though
reigster is called every frame, the same callback isn't being duplicated in the frameCallbacks map.
A map was used to maintain order in which callbacks were registered so that, upon execute,
the callbacks are executed in the order they were registered.
*/

import { FrameCallback } from '../world/Engine';

export class HashMap<K, V> extends Map<K, V> {

  constructor() {
    super();
  }

  fnv1aHash(stringifiedCB: string) {
    // pre-defined constant, starting point
    const FNV_PRIME = 0x01000193;
    // the hexidecimal of the result of 64-bit FNV-1a hashing algorithm
    const OFFSET_BASIS = 0xcbf29ce484222325;
    let hash = OFFSET_BASIS;

    // for each byte of input data:
    for (let i = 0; i < stringifiedCB.length; i++) {
      // XOR Operation: current hash combined with bite using bitwise XOR
      // to mix the bits of hash with bits of input bye; randomness!
      hash ^= stringifiedCB.charCodeAt(i);
      // multiplied to aid in distributing evenly across the hash space
      // multiplying by a large prime number balances the mix of bits and hash value
      hash *= FNV_PRIME;
    }
    // resulting hash is a 32-bit unsigned integer
    return hash >>> 0;
  }

  register(callback: V): void {
    const key = this.fnv1aHash((callback as FrameCallback).toString()) as K;
    if (!super.get(key)) {
      super.set(key, callback);
    }
  }
}