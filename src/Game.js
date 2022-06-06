// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const keypress = require('keypress');
const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
const Boomerang = require('./game-models/Boomerang');// раскомментировал
const View = require('./View');

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.hero = new Hero(); // Герою можно аргументом передать бумеранг.
    this.enemy = new Enemy(trackLength);
    this.view = new View();
    this.boomerang = new Boomerang();
    this.track = [];
    this.regenerateTrack();
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = (new Array(this.trackLength)).fill(' ');
    this.track[this.hero.position] = this.hero.skin;

    if (this.enemy.flag) {
      this.boomerang.moveRight();
    } else {
      this.boomerang.moveLeft();
      if (this.boomerang.position === this.hero.position) {
        this.boomerang.skin = '';
      }
    }
    this.track[this.boomerang.position] = this.boomerang.skin;
    this.enemy.moveLeft();
    this.track[this.enemy.position] = this.enemy.skin;
  }

  check() {
    if (this.enemy.position === this.boomerang.position) {
      this.enemy.die();
    }

    if (this.hero.position === this.enemy.position) {
      this.hero.die();
    }
  }

  play() {
    this.renderNewShot();
    this.startKeyListener();
  }

  startKeyListener() {
    keypress(process.stdin);
    process.stdin.on('keypress', (ch, key) => {
      if (key) {
        if (key.name === 'd') this.hero.moveRight();
        if (key.name === 'a') this.hero.moveLeft();

        this.check();
        if (this.hero.isDead) this.renderSingleShot();

        if (key.ctrl && key.name === 'c') {
          process.exit();
        }
      }
    });
    process.stdin.setRawMode(true);
  }

  renderNewShot() {
    setInterval(() => {
      this.renderSingleShot();
    }, 100);
  }

  renderSingleShot() {
    this.check();
    this.regenerateTrack();
    this.view.render(this.track);
  }
}

module.exports = Game;
