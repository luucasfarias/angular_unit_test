import { UniqueIdService } from './unique-id.service';

describe(UniqueIdService.name, () => {
  let uniqueIdService: UniqueIdService = null;
  const prefixID = 'app';

  beforeEach(() => {
    uniqueIdService = new UniqueIdService();
  });

  it(`#${UniqueIdService.prototype.generatedUniqueIdWithPrefix.name} should generate id when called with prefix`, () => {
    const id = uniqueIdService.generatedUniqueIdWithPrefix(prefixID);
    expect(id.startsWith(`${prefixID}-`)).toBeTrue();
  });

  it(`#${UniqueIdService.prototype.generatedUniqueIdWithPrefix.name} should not generate duplicate ids when called multiple times`, () => {
    const limit = 100;
    const ids = new Set();

    for (let index = 0; index < limit; index++) {
      ids.add(uniqueIdService.generatedUniqueIdWithPrefix(prefixID));
    }

    expect(ids.size).toBe(limit);
  });

  it(`#${UniqueIdService.prototype.generatedUniqueIdWithPrefix.name} should throw when called  with empty`, () => {
    const emptyValues = [null, undefined, '', '0', '1'];
    emptyValues.map((item) => {
      expect(() => uniqueIdService.generatedUniqueIdWithPrefix(item))
        .withContext(`Empty value: ${emptyValues}`)
        .toThrow();
    });
  });

  it(`${UniqueIdService.prototype.getNumberOfGenerateUniqueIDs.name} should return the number of generated when called`, () => {
    uniqueIdService.generatedUniqueIdWithPrefix(prefixID);
    uniqueIdService.generatedUniqueIdWithPrefix(prefixID);
    expect(uniqueIdService.getNumberOfGenerateUniqueIDs()).toBe(2);
  });
});
