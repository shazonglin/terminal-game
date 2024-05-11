class Player {
  #stats = {
    health: 0,
    defense: 0,
    attack: 0,
  };
  constructor(name, stats) {
    this.name = name;
    this.#stats = stats;
  }

  getName() {
    return this.name;
  }

  getStats() {
    return {
      health: this.#stats.health,
      defense: this.#stats.defense,
      attack: this.#stats.attack,
    };
  }

  //   get weapon or encounter enemy
  updateStats(stats) {
    this.#stats.health += stats.health;
    this.#stats.defense += stats.defense;
    this.#stats.attack += stats.attack;
  }

  // TO-DO-------------------------------------fighting method
  fight(enemyStats) {
    const enemyAttack = enemyStats.attack - this.#stats.defense;
    const playerAttack = this.#stats.attack - enemyStats.defense;
    // console.log(enemyAttack, playerAttack, 'enemyAttack,playerAttack');
    let totalDamage = 0;
    while (enemyStats.health > 0 && this.#stats.health > 0) {
      // player's turn to attack
      if (enemyStats.health - playerAttack > 0) {
        enemyStats.health -= playerAttack;
        // console.log(enemyStats.health, 'enemyStats.health');
      } else {
        this.updateStats({ health: totalDamage, defense: 0, attack: 0 });
        return true;
      }
      // enemy's turn to attack
      if (this.#stats.health - enemyAttack + totalDamage > 0) {
        totalDamage -= enemyAttack;
        // console.log(totalDamage, 'totalDamage');
      } else {
        return false;
      }
    }
  }

  describe() {
    console.log(`The player's stats is:`);
    console.log(
      `Health:${this.#stats.health} , Defense:${this.#stats.defense}, Attack:${
        this.#stats.attack
      }`
    );
    console.log('---------------------------');
  }
}

export { Player };
