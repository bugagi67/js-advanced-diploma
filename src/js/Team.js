import Bowman from './characters/Bowman';
import Swordsman from './characters/Swordsman';
import Magician from './characters/Magician';
import Daemon from './characters/Daemon';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire';

/**
 * Класс, представляющий персонажей команды
 *
 * @todo Самостоятельно продумайте хранение персонажей в классе
 * Например
 * @example
 * ```js
 * const characters = [new Swordsman(2), new Bowman(1)]
 * const team = new Team(characters);
 *
 * team.characters // [swordsman, bowman]
 * ```
 * */
export default class Team {
  // TODO: write your logic here
  constructor(characters = []) {
    this.characters = new Set(characters);
  }

  add(character) {
    if (this.characters.has(character)) {
      throw new Error('Такой персонаж уже существует');
    }
    return this.characters.add(character);
  }

  addAll(...characters) {
    characters.forEach((item) => this.characters.add(item));
    return this.characters;
  }

  toArray() {
    return Array.from(this.characters);
  }

  static getEnemy() {
    return [Vampire, Undead, Daemon];
  }

  static getUser() {
    return [Bowman, Swordsman, Magician];
  }
}
