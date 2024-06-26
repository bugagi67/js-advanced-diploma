import Character from '../Character';

export default class Magician extends Character {
  constructor(level, type = 'magician') {
    super(level);
    this.attack = 10;
    this.defence = 40;
    this.type = type;
    this.characterMovement = 1;
    this.attackRange = 4;
  }
}
