import themes from './themes';

export default class GameState {
  constructor(
    level = 1,
    positionEnemyCharacter = [],
    positionPlayerCharacter = [],
  ) {
    this.level = level;
    this.positionEnemyCharacter = positionEnemyCharacter;
    this.positionPlayerCharacter = positionPlayerCharacter;
  }

  static from(object) {
    // TODO: create object
  }

  get themes() {
    switch (this.level) {
      case 1: {
        return themes.prairie;
      }
      case 2: {
        return themes.desert;
      }
      case 3: {
        return themes.arctic;
      }
      case 4: {
        return themes.mountain;
      }
      default: {
        throw new Error(`Несуществующий уровень ${this.level}`);
      }
    }
  }
}
