import gendiff from '../src/gendiff';

test('gendiff', () => {
  expect(gendiff({}, {})).toEqual('{  }');
});
