import {findWinners} from "./FindWinners";

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

class Character {
  constructor(i, max_damage, N) {
    this.id = i;
    this.damage = getRandomInt(0, max_damage) + 1;
    //здоровье обратно пропорционально урону
    this.health = (max_damage * 2 - this.damage + 10) * max_damage * 2;
    this.rival = getRandomInt(0, 3) + 1;
    this.time = getRandomInt(0, (6 * N)) - 3 * N;
    
    //если время получилось отрицательным или равным нулю, то делаем время и интервал равными нулю
    if (this.time <= 0) {
      this.time = 0;
      this.interval = 0;
    }
    else
      this.interval = this.time * 2 + getRandomInt(0, this.time);
    this.percent = 100;
    this.time_fight = 0;
    this['history'] = [];
  }
}

function fillArrayCharacters(N, maxDamage) {
    let characters = [];
    characters.push({
      id: 'id',
      damage:'damage',
      health: 'health',
      rival: 'rival',
      time: 'time',
      interval:'interval',
      percent: '%',
      time_fight: 'time fight',
    });
    for (let i = 0; i < N; i++) {
        characters.push(new Character(i, maxDamage, N));
    }
    return characters;
}

export {fillArrayCharacters};