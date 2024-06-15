import { getTypedArrayConstructor } from 'core-js/internals/array-buffer-view-core';
import themes from './themes';
import PositionedCharacter from './PositionedCharacter';
import { generateTeam } from './generators';
import Team from './Team';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.boardSize = gamePlay.boardSize;
    this.characterCount = 3;
    this.userTeam = Team.getUser();
    this.enemyTeam = Team.getEnemy();
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    this.theme = themes.prairie;
    this.gamePlay.drawUi(this.theme);

    const arrayPosition = [...this.positioningUserCharacter(), ...this.positioningEnemyCharacter()];
    console.log(arrayPosition);
    this.gamePlay.redrawPositions(arrayPosition);
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }

  // столбцы стартовых позиция игрока
  startEnemyPosition() {
    const position = [];
    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      if (i % this.boardSize === this.boardSize - 1 || i % this.boardSize === this.boardSize - 2) {
        position.push(i);
      }
    }
    return position;
  }

  // столбцы стартовых позиция врага
  startUserPosition() {
    const position = [];
    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      if (i % this.boardSize === 0 || i % this.boardSize === 1) {
        position.push(i);
      }
    }
    return position;
  }

  // генератор позиций игрока
  // eslint-disable-next-line class-methods-use-this
  randomEnemyPositionGenerator() {
    const positionArray = this.startEnemyPosition();
    const randomIndex = Math.floor(Math.random() * positionArray.length);
    return positionArray[randomIndex];
  }

  // генератор позиций врага
  randomPlayerPositionGenerator() {
    const positionArray = this.startUserPosition();
    const randomIndex = Math.floor(Math.random() * positionArray.length);
    return positionArray[randomIndex];
  }

  // позиционирование персонажей игрока
  positioningUserCharacter() {
    const positionedUserTeam = [];
    const userTeams = generateTeam(this.userTeam, 1, this.characterCount);
    const uniquePositions = new Set();
    userTeams.characters.forEach((character) => {
      let position;
      do {
        position = this.randomPlayerPositionGenerator();
      } while (uniquePositions.has(position));
      uniquePositions.add(position);
      positionedUserTeam.push(new PositionedCharacter(character, position));
    });
    return positionedUserTeam;
  }

  // позиционирование персонажей врага
  positioningEnemyCharacter() {
    const positionedEnemyTeam = [];
    const enemyTeams = generateTeam(this.enemyTeam, 1, this.characterCount);
    const uniquePositions = new Set();
    enemyTeams.characters.forEach((character) => {
      let position;
      do {
        position = this.randomEnemyPositionGenerator();
      } while (uniquePositions.has(position));
      uniquePositions.add(position);
      positionedEnemyTeam.push(new PositionedCharacter(character, position));
    });
    return positionedEnemyTeam;
  }
}
