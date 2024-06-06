import React, { createContext, useContext, useEffect, useRef } from 'react';
import { Entity } from './Entity';
import { Engine, FrameCallback } from './world/Engine';

interface EngineContextType {
  engine: Engine;
  createEntity: () => Entity;
  removeEntity: (entity: Entity) => void;
  execute: (callback: FrameCallback) => void;
}

const EngineContext = createContext<EngineContextType | null>(null);

export const useEngine = () => {
  const context = useContext(EngineContext);
  if (!context) {
    throw new Error('useEngine must be used within an EngineProvider');
  }
  return context;
};

export const EngineProvider = ({ children }) => {
  const engineRef = useRef<Engine | null>(null);

  useEffect(() => {
    if (!engineRef.current) {
      engineRef.current = new Engine();
    }
    return () => engineRef.current?.stop();
  }, []);

  const createEntity = () => engineRef.current!.entityManager.createEntity();
  const removeEntity = (entity: Entity) => engineRef.current!.entityManager.removeEntity(entity);
  const execute = (callback: FrameCallback) => {
    engineRef.current!.start();
    engineRef.current!.registerFrameCallback(callback);
  };

  return (
    <EngineContext.Provider
      value={{
        engine: engineRef.current!,
        createEntity,
        removeEntity,
        execute
      }}
    >
      {children}
    </EngineContext.Provider>
  );
};

