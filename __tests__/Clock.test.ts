import { Clock } from '../src/utils/Clock'

interface ExtendedDate extends Date {
  [key: string]: any;
  [key: symbol]: any;
}

describe('Clock Utility - Unit Tests', () => {
  let clock: Clock;

  beforeEach(() => {
    clock = new Clock();
  });

  test('should update elapsedTime when getElapsedTime is called', () => {
    clock.start();
    expect(clock.running).toBe(true);
    clock.getElapsedTime();
    expect(clock.elapsedTime).toBeGreaterThan(0);
  });

  test('should calculate elapsed time correctly in seconds', async () => {
    clock.start();

    // A mock Date object that overrides the now method
    const mockDate = new Proxy(new Date() as ExtendedDate, {
      get(target, prop) {
        if (prop === 'now') {
          return jest.fn(() => 1717689207838);
        }
        return target[prop];
      },
    }) as unknown as typeof Date;

    // Temporarily replace the global Date object
    global.Date = mockDate;

    // Simulate 2 seconds passing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Restore the original Date object
    global.Date = Date;

    const elapsedTime = clock.getElapsedTime();
    // Allow for some wiggle room due to floating-point arithmetic
    expect(elapsedTime).toBeCloseTo(2, 1);
  });

  test('should stop the clock, set autoStart to false and no longer be running', () => {
    clock.stop();
    expect(clock.running).toBe(false);
    expect(clock.autoStart).toBe(false);
  });

  test('should reset the clock when reset is called', () => {
    clock.reset();
    expect(clock.startTime).toBeGreaterThan(0);
    expect(clock.oldTime).toBe(clock.startTime);
    expect(clock.elapsedTime).toBe(0);
    expect(clock.running).toBe(true);
  });
});
