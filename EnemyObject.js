import { MapObject } from './MapObject.js';

class EnemyObject extends MapObject {
  #stats = {
    name: '',
    health: 0,
    defense: 0,
    attack: 0,
  };

  constructor(icon, stats) {
    super(icon);
    this.type = 'enemy';
    this.#stats = stats;
  }

  getName() {
    return this.#stats.name;
  }

  getStats() {
    return {
      name: this.#stats.name,
      health: this.#stats.health,
      defense: this.#stats.defense,
      attack: this.#stats.attack,
    };
  }

  describe() {
    console.log(`You encountered a ${this.#stats.name}, ${this.icon}`);
    console.log(`The stats of ${this.#stats.name} is:`);
    console.log(
      `Health:${this.#stats.health} , Defense:${this.#stats.defense}, Attack:${
        this.#stats.attack
      }`
    );
    console.log('---------------------------');
  }
}

export { EnemyObject };
