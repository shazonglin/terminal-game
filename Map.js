import { MapObject } from './MapObject.js';

class Map {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    // init player starting position ( x: col pos, y: row pos)
    this.playerPos = { x: 0, y: this.row - 1 };

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
  }

  // check if next move is out of bound
  checkOutOfMap(dir) {
    switch (dir) {
      case 'up':
        return this.playerPos.y - 1 >= 0;
      case 'down':
        return this.playerPos.y + 1 < this.row;
      case 'left':
        return this.playerPos.x - 1 >= 0;
      case 'right':
        return this.playerPos.x + 1 < this.column;
      default:
        return false;
    }
  }

  // method for player to move
  movePlayer(dir) {
    if (!this.checkOutOfMap(dir)) {
      console.log('Out of bound');
      return;
    }

    // position change when move up,down,left,right
    const dirctions = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 },
    };

    // current position and dirction to move
    const { x, y } = this.playerPos;
    const { x: dx, y: dy } = dirctions[dir];
    this.map[y][x] = new MapObject('🚧', 'passed');
    // update new position
    this.playerPos = { x: x + dx, y: y + dy };
    this.map[this.playerPos.y][this.playerPos.x] = new MapObject(
      '🤺',
      'player'
    );
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

    console.log('---------------------------');
  }
}

const map = new Map(5, 5);
map.printMap();
// map.movePlayer('down');
map.movePlayer('up');
map.movePlayer('up');
map.movePlayer('down');
map.movePlayer('up');
map.movePlayer('right');
map.printMap();
