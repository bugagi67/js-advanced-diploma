import Character from '../Character';

export default class Daemon extends Character {
  constructor(level, type = 'daemon') {
    super(level);
    this.attack = 10;
    this.defence = 10;
    this.type = type;
    this.characterMovement = 1;
    this.attackRange = 4;
  }
}
