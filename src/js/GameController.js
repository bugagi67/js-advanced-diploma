import themes from './themes';
import PositionedCharacter from './PositionedCharacter';
import { generateTeam } from './generators';
import Team from './Team';
import GamePlay from './GamePlay';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.boardSize = gamePlay.boardSize;
    this.stepCounter = 1;
    this.characterCount = 2;
    this.userTeam = Team.getUser();
    this.enemyTeam = Team.getEnemy();
    this.addEventlistener();
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    this.theme = themes.prairie;
    this.gamePlay.drawUi(this.theme);
    this.arrayPosition = [...this.positioningUserCharacter(), ...this.positioningEnemyCharacter()];
    this.gamePlay.redrawPositions(this.arrayPosition);
  }

  addEventlistener() {
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
  }

  onCellClick(index) {
    // TODO: react to click
    const enteredBox = this.arrayPosition.find((element) => element.position === index);
    if (enteredBox) {
      if (
        enteredBox.character.type === 'bowman'
        || enteredBox.character.type === 'swordsman'
        || enteredBox.character.type === 'magician'
      ) {
        this.arrayPosition.forEach((element) => {
          this.gamePlay.deselectCell(element.position);
        });
        this.gamePlay.selectCell(index);
      }
      if (
        enteredBox.character.type === 'vampire'
        || enteredBox.character.type === 'undead'
        || enteredBox.character.type === 'daemon'
      ) {
        GamePlay.showError('Выберите своего персонажа');
      }
    }
  }

  // eslint-disable-next-line consistent-return
  onCellEnter(index) {
    // TODO: react to mouse enter
    const enteredBox = this.arrayPosition.find((element) => element.position === index);
    if (enteredBox) {
      return this.gamePlay.showCellTooltip(enteredBox.character.getinformation(), index);
    }
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    this.gamePlay.hideCellTooltip(index);
  }

  // генератор столбцов стартовых позиция врага
  startEnemyPosition() {
    const position = [];
    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      if (i % this.boardSize === this.boardSize - 1 || i % this.boardSize === this.boardSize - 2) {
        position.push(i);
      }
    }
    return position;
  }

  // генератор столбцов стартовых позиция игрока
  startUserPosition() {
    const position = [];
    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      if (i % this.boardSize === 0 || i % this.boardSize === 1) {
        position.push(i);
      }
    }
    return position;
  }

  // генератор - рандомные позиции врага
  randomEnemyPositionGenerator() {
    const positionArray = this.startEnemyPosition();
    const randomIndex = Math.floor(Math.random() * positionArray.length);
    return positionArray[randomIndex];
  }

  // генератор - рандомные позиции игрока
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
