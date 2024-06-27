import GameController from './GameController';

const cursors = {
  auto: 'auto',
  pointer: 'pointer',
  crosshair: 'crosshair',
  notallowed: 'not-allowed',
};

export default cursors;

export function getCursors(enteredBox) {
  if (typeof enteredBox === 'object') {
    if (
      enteredBox.character.type === 'bowman'
      || enteredBox.character.type === 'swordsman'
      || enteredBox.character.type === 'magician'
    ) {
      return cursors.pointer;
    }
  }
  return cursors.auto;
}
