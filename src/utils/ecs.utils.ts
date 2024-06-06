// --------------------------------------------------------------------
// DEPRECATED, USING PROVIDER PATTERN INSTEAD
// --------------------------------------------------------------------

// import { Entity } from "../Entity";
// import { FrameCallback, useECS } from "../world/Engine";

// const { engine } = useECS();
// // ENTITIES --------------------------------------------------------

// const useCreateEntity = () => {
//   return engine.entityManager.createEntity;
// }

// export const createEntity = useCreateEntity();

// export const removeEntity = (entity: Entity) => {
//   return engine.entityManager.removeEntity(entity);
// }

// // COMPONENTS -------------------------------------------------------

// // SYSTEMS ----------------------------------------------------------

// // STATES -----------------------------------------------------------

// // ECS FUNCTIONS ----------------------------------------------------

// export const execute = (callback): void => {
//   engine.start();
//   engine.registerFrameCallback(callback);
// }