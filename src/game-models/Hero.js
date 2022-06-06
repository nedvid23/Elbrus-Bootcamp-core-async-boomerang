// Наш герой.

class Hero {
  constructor(position = 0) { // убрал деструктуризацию
    this.skin = '🤠'; // можете использовать любые emoji '💃'
    this.position = position;
    this.isDead = false;
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  moveRight() {
    // Идём вправо.
    this.position += 1;
  }

  attack() {
    // Атакуем.
    this.boomerang.fly();
  }

  die() {
    this.skin = '💀';
    this.isDead = true;
    console.log('YOU ARE DEAD!💀');
    process.exit();
  }
}

module.exports = Hero;
