// Сделаем отдельный класс для отображения игры в консоли.

class View {
  render(track) { // вставил аргумент track
    const yourTeamName = 'Elbrus';

    // Тут всё рисуем.
    console.clear();
    console.log(track.join(''));// удалил this.game
    console.log('\n\n');
    console.log(`Created by "${yourTeamName}" with love`);
  }
}

module.exports = View;
