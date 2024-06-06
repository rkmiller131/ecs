import React, { createContext, useContext, useEffect, useRef } from 'react';
import { Entity } from './Entity';
import { Engine, FrameCallback } from './world/Engine';

interface EngineContextType {
  engine: Engine;
  createEntity: () => Entity;
  removeEntity: (entity: Entity) => void;
  getEntityByName: (name: string) => Entity | undefined;
  getEntityByUUID: (uuid: number) => Entity | undefined;
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

interface EngineProviderProps {
  children: React.ReactNode;
}

export const EngineProvider: React.FC<EngineProviderProps> = ({ children }) => {
  const engineRef = useRef<Engine>(new Engine());

  useEffect(() => {
    return () => engineRef.current?.stop();
  }, []);

  const createEntity = () => engineRef.current!.entityManager.createEntity();
  const removeEntity = (entity: Entity) => engineRef.current!.entityManager.removeEntity(entity);
  const getEntityByName = (name: string) => engineRef.current!.entityManager.getEntityByName(name);
  const getEntityByUUID = (uuid: number) => engineRef.current!.entityManager.getEntityByUUID(uuid);
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
        getEntityByName,
        getEntityByUUID,
        execute
      }}
    >
      {children}
    </EngineContext.Provider>
  );
};

