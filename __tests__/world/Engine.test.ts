import React from 'react';
import { render } from '@testing-library/react';
import { Engine } from '../../src/world/Engine';

describe('Engine Instantiation - Unit Tests', () => {
  let engineInstance;

  beforeEach(() => {
    engineInstance = new Engine();
  });

  test('should only create one instance of the Engine', () => {
    const instanceOne = new Engine();
    const instanceTwo = new Engine();
    expect(instanceOne).toBe(engineInstance);
    expect(instanceTwo).toBe(engineInstance);
    expect(instanceOne).toBe(instanceTwo);
  });

  test('should start executing queued callbacks each frame when start is called', () => {
    const spy = jest.fn();
    engineInstance.registerFrameCallback(spy);
    engineInstance.start();
    expect(spy).toHaveBeenCalled();
  });

  test('should stop executing queued callbacks when stop is called', () => {
    const spy = jest.fn();
    engineInstance.start();
    engineInstance.registerFrameCallback(spy);
    engineInstance.stop();
    expect(spy).not.toHaveBeenCalled();
  });

  test('should auto-start the clock when a new Engine is created', () => {
    const clock = engineInstance.clock;
    expect(clock.running).toBeTruthy();
  });

});

// describe('Engine Methods', () => {
//   test('should register cb in the execute and call the cb every frame', () => {
//     // const engine = createEngine();
//     const engine = new Engine();
//     console.log('engine.instance', )
//     const mockCallback = jest.fn();
//     execute(mockCallback);

//     jest.advanceTimersByTime(100);
//     jest.advanceTimersByTime(100);

//     expect(mockCallback).toHaveBeenCalledTimes(2);
//     engine.unregisterFrameCallback(mockCallback);
//   });
// });

// describe('EngineProvider', () => {
//   const engine = new Engine();

//   test('should start the Engine clock when EngineProvider is imported', () => {
//     const initialClock = engine.clock.getElapsedTime();

//     render(<EngineProvider>Test</EngineProvider>);

  //   setTimeout(() => {
  //     const updatedClock = engine.clock.getElapsedTime();
  //     expect(updatedClock).toBeGreaterThan(initialClock);
  //   }, 500);
  // });

//   test('should register callbacks in the execute and call the cb every frame', () => {
//     const executeSpy = jest.spyOn(Engine.prototype, 'execute');

//     const App = () => {
//       const [frameCount, setFrameCount] = useState(0);
//       execute(() => {
//         setFrameCount((prev) => prev + 1);
//       });
//       return (
//         <span>{frameCount}</span>
//       )
//     }

//     render(
//       <EngineProvider>
//         <App />
//       </EngineProvider>,
//       container
//     );

//     // unmountComponentAtNode(container);

//     expect(engine.execute).toHaveBeenCalled();

//   });
// });

// you should be able to create multiple entities and see them in the entities array
// when you remove an entity, it gets pushed into the deferred deletion
// when you add and remove entities simultaneously, you should expect to see a certain order in the entities pool and other entities should be released into the pool
// When you create an entity, the entityUUID should increment by 1