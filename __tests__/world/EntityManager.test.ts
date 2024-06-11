import { EntityManager } from '../../src/world/EntityManager';
import { Engine } from '../../src/world/Engine';
import { Entity } from '../../src/ecs/Entity';

describe('Entity Manager - Integration Tests', () => {
  let entityManager: EntityManager;
  let engine: Engine;

  beforeEach(() => {
    engine = new Engine();
    entityManager = engine.entityManager;
  });

  test('should be able to create multiple entities with chronological UUIDs, all currently active in the world', () => {
    const numberOfEntities = 5;
    const entitiesCreated = [] as Entity[];

    for (let i = 0; i < numberOfEntities; i++) {
      const entity = entityManager.createEntity();
      entitiesCreated.push(entity);
    }

    for (let j = 0; j < entitiesCreated.length; j++) {
      // entities created with chronological entityUUIDs
      expect(entitiesCreated[j].entityUUID).toBe(j + 1);
      const currentEntity = entityManager.getEntityByUUID(entitiesCreated[j].entityUUID)!;
      expect(entityManager.activeEntities.has(currentEntity)).toBeTruthy();
    };
  });

  test('should store a separate reference to entities that were given a name', () => {
    const entity = entityManager.createEntity();
    const name = 'testName';
    entity.setName(name);
    expect(entity.name).toBe('testName');
    expect(entityManager.entitiesByName[name]).toEqual(entity);
  });

  test('should only store unique names for entities', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const entity = entityManager.createEntity();
    entity.setName('nonUniqueName');
    const entity2 = entityManager.createEntity();
    entity2.setName('nonUniqueName');
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Entity name \'nonUniqueName\' already exists. Aborting...'));
    consoleErrorSpy.mockRestore();
  });

  test('should trigger deferred deletion of entities that are queued for removal', async () => {
    engine.start();
    const entity = entityManager.createEntity();
    entityManager.removeEntity(entity);

    // Wait for the next execution cycle of the Engine
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(entityManager.entitiesToRecycle).not.toContain(entity);
  });
})

// when you add and remove entities simultaneously, you should expect to see a certain order in the entities pool and other entities should be released into the pool