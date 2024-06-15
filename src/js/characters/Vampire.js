import Character from '../Character';

export default class Vampire extends Character {
  constructor(level, type = 'vampire') {
    super(level);
    this.attack = 25;
    this.defence = 25;
    this.type = type;
  }
}
