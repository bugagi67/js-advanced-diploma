import Character from '../Character';

export default class Bowman extends Character {
  constructor(level, type = 'bowman') {
    super(level);
    this.attack = 25;
    this.defence = 25;
    this.type = type;
    this.characterMovement = 2;
    this.attackRange = 2;
  }
}
