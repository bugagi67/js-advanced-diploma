import { calcTileType } from '../utils';

test('Testing the rendering of the field and the boundaries of the field', () => {
  expect(calcTileType(0, 8)).toBe('top-left');
  expect(calcTileType(1, 8)).toBe('top');
  expect(calcTileType(63, 8)).toBe('bottom-right');
  expect(calcTileType(7, 7)).toBe('left');
  expect(calcTileType(9, 8)).toBe('center');
  expect(calcTileType(7, 8)).toBe('top-right');
  expect(calcTileType(56, 8)).toBe('bottom-left');
  expect(calcTileType(57, 8)).toBe('bottom');
  expect(calcTileType(15, 8)).toBe('right');
});
