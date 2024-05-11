import { MapObject } from './MapObject.js';
import { ItemObject } from './ItemObject.js';
import { EnemyObject } from './EnemyObject.js';
import { Player } from './Player.js';
import { playerDirectionPrompt } from './PlayerPrompt.js';

// Main class to generate the game
class Map {
  #currentObject;

  constructor(row, column) {
    this.row = row;
    this.column = column;
    // init player starting position ( x: col pos, y: row pos)
    this.playerPos = { x: 0, y: this.row - 1 };
    this.player = new Player('Warrior', {
      health: 20,
      attack: 5,
      defense: 5,
    });

    // create grip/map
    this.map = [];

    for (let i = 0; i < row; i++) {
      // init row
      this.map[i] = [];
      for (let j = 0; j < column; j++) {
        // insert Map Object
        this.map[i][j] = new MapObject();
      }
    }
    // First row, last col should be the final destination(top-right corner)
    this.map[0][this.column - 1] = new MapObject('💰', 'victory');
    // Last row,first col should be the starting pos (bottom-left corner)
    this.map[this.row - 1][0] = new MapObject('🤺', 'player');

    console.log('finish init');
    this.startGame();
  }

  // start the game
  async startGame() {
    while (this.player.getStats().health > 0) {
      this.printMap();
      const reponse = await playerDirectionPrompt();
      if (reponse == '☹️Quit') {
        process.exit();
      }
      this.movePlayer(reponse);
    }
  }

  // check if next move is out of bound
  checkOutOfMap(dir) {
    switch (dir) {
      case 'Up':
        return this.playerPos.y - 1 >= 0;
      case 'Down':
        return this.playerPos.y + 1 < this.row;
      case 'Left':
        return this.playerPos.x - 1 >= 0;
      case 'Right':
        return this.playerPos.x + 1 < this.column;
      default:
        return false;
    }
  }

  // method for player to move
  movePlayer(dir) {
    if (!this.checkOutOfMap(dir)) {
      console.log('Out of map, You cannot go there!');
      return;
    }

    // position change when move up,down,left,right
    const directions = {
      Up: { x: 0, y: -1 },
      Down: { x: 0, y: 1 },
      Left: { x: -1, y: 0 },
      Right: { x: 1, y: 0 },
    };

    // current position and dirction to move
    const { x, y } = this.playerPos;
    const { x: dx, y: dy } = directions[dir];
    const newX = x + dx;
    const newY = y + dy;

    // update the passed icon and current location
    this.map[y][x] = new MapObject('🚧', 'path');
    this.playerPos = { x: newX, y: newY };

    // if the new location passed before, just move
    if (this.map[this.playerPos.y][this.playerPos.x].type == 'path') {
      this.map[this.playerPos.y][this.playerPos.x] = new MapObject(
        '🤺',
        'player'
      );
      return;
    }

    // discover unknown position and generate object
    this.#currentObject = this.generateMapObject();

    this.actionAfterMove();
    this.map[this.playerPos.y][this.playerPos.x] = new MapObject(
      '🤺',
      'player'
    );
  }

  // methond of actions after move
  actionAfterMove() {
    if (this.map[this.playerPos.y][this.playerPos.x].type == 'victory') {
      console.log('🎉Congrats! You won the game!');
      process.exit();
    }

    this.#currentObject.describe();
    // get stats if is weapon or enemy
    let stats;
    this.#currentObject.type != 'path'
      ? (stats = this.#currentObject.getStats())
      : '';

    if (this.#currentObject.type == 'path') {
      return;
    }
    if (this.#currentObject.type == 'item') {
      this.player.updateStats(stats);
      this.player.describe();
    }
    if (this.#currentObject.type == 'enemy') {
      // get fight result
      if (!this.player.fight(stats)) {
        console.log('You are defeated by the enemy!');
        process.exit();
      } else {
        this.player.describe();
      }
    }
  }

  // helper method to choose the action according to different object
  actionCases(objectType) {}

  // method to generate random MapObject(weapon,enemy or path)
  generateMapObject() {
    let randomNum = Math.random();
    let object;

    if (randomNum < 0.15) {
      object = new ItemObject('🗡️', {
        name: 'Sword',
        health: 1,
        defense: 1,
        attack: 5,
      });
    } else if (randomNum < 0.35) {
      object = new EnemyObject('🐯', {
        name: 'Tiger',
        health: 10,
        defense: 2,
        attack: 7,
      });
    } else {
      object = new MapObject('🚧', 'path');
    }
    return object;
  }

  //  to print the grid/map
  printMap() {
    for (let i = 0; i < this.row; i++) {
      let rowString = '';
      for (let j = 0; j < this.column; j++) {
        rowString += this.map[i][j].icon + '\t';
      }
      //  print it to a new row
      console.log(rowString);
    }
  }
}

const map = new Map(5, 5);
// map.startGame();
// map.printMap();
// map.movePlayer('Down');
// map.movePlayer('Up');
// map.movePlayer('Up');
// map.movePlayer('Up');
// map.movePlayer('Down');
// map.movePlayer('Down');
// map.movePlayer('Down');
// map.movePlayer('Up');
// map.movePlayer('Up');
// map.movePlayer('Right');
// map.movePlayer('Right');
// map.movePlayer('Right');
// map.movePlayer('Right');
// map.printMap();
