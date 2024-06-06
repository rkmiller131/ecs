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

describe('Engine Provider - Integration Tests', () => {

});