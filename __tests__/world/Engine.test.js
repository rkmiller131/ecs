import React, { useState } from 'react';
import { Engine, EngineProvider } from '../../src/world/Engine';
// import { execute } from '../../src/utils/ecs.utils';
import { render, unmountComponentAtNode } from '@testing-library/react';

// let container = null;

// beforeEach(() => {
//   container = document.createElement('div');
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null;
// });

describe('Engine Instantiation', () => {
  test('should only create one instance of the Engine', () => {
    const instance1 = new Engine();
    const instance2 = new Engine();

    expect(instance1).toBe(instance2);
  });
});

describe('EngineProvider', () => {
  const engine = new Engine();

  test('should start the Engine clock when EngineProvider is imported', () => {
    const initialClock = engine.clock.getElapsedTime();

    render(<EngineProvider>Test</EngineProvider>);

    setTimeout(() => {
      const updatedClock = engine.clock.getElapsedTime();
      expect(updatedClock).toBeGreaterThan(initialClock);
    }, 500);
  });

  // test('should register callbacks in the execute and call the cb every frame', () => {
  //   const executeSpy = jest.spyOn(Engine.prototype, 'execute');

  //   const App = () => {
  //     const [frameCount, setFrameCount] = useState(0);
  //     execute(() => {
  //       setFrameCount((prev) => prev + 1);
  //     });
  //     return (
  //       <span>{frameCount}</span>
  //     )
  //   }

  //   render(
  //     <EngineProvider>
  //       <App />
  //     </EngineProvider>,
  //     container
  //   );

  //   // unmountComponentAtNode(container);

  //   expect(engine.execute).toHaveBeenCalled();

  // });
});

// you should be able to create multiple entities and see them in the entities array
// when you remove an entity, it gets pushed into the deferred deletion
// when you add and remove entities simultaneously, you should expect to see a certain order in the entities pool and other entities should be released into the pool
// When you create an entity, the entityUUID should increment by 1