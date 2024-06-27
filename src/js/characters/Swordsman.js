import Character from '../Character';

export default class Swordsman extends Character {
  constructor(level, type = 'swordsman') {
    super(level);
    this.attack = 40;
    this.defence = 10;
    this.type = type;
    this.characterMovement = 4;
    this.attackRange = 1;
  }
}
