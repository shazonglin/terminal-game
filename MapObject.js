class MapObject {
  #treeIcons = ['🌲', '🌳', '🌴', '🎄', '🎋'];

  constructor(icon, type = 'unkown') {
    if (!icon) {
      this.icon =
        this.#treeIcons[Math.floor(Math.random() * this.#treeIcons.length)];
    } else {
      this.icon = icon;
    }
    this.type = type;
  }

  // determine which type of object player encounter

  describe() {
    const randomNum = Math.random();

    if (randomNum < 0.33) {
      console.log('Clear space!');
      console.log('---------------------------');
      return;
    } else if (randomNum < 0.66) {
      console.log('Nothing in this area!');
      console.log('---------------------------');
      return;
    } else {
      console.log('Safe here!');
      console.log('---------------------------');
      return;
    }
  }
}

export { MapObject };
