// Враг.

class Enemy {
  constructor(obj) {
    this.generateSkin();
    this.position = obj - 1;
    this.flag = true;
  }

  generateSkin() {
    const skins = ['👾', '💀', '👹', '👻', '👽', '👿', '💩', '🤡', '🤺', '🧛', '🧟', '🎃'];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
    return this.skin;
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  die() {
    this.position = -1;
    // eslint-disable-next-line no-console
    console.log('Enemy is dead!');
    this.flag = false;
  }
}

module.exports = Enemy;
