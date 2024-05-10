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
}

export { MapObject };
