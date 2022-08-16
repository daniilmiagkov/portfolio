function damage(character_enemy, character, temp_character) {
  //если персонаж способен выводить из строя
  if (character.time > 0) {
    //если на данный момент его время больше нуля
    if (temp_character.time > 0) {
      //уменьшаем время персонажа
      temp_character.time--;
      //возвращаем ноль
      return {
        a: 0,
        b: character,
        c: temp_character,
      }
    }

    //если на данный момент его интервал больше нуля
    if (temp_character.interval > 0) {
      //уменьшаем интервал персонажа
      temp_character.interval--;
      //возвращаем урон противника
      return {
        a: character_enemy.damage,
        b: character,
        c: temp_character,
      };
    }
    
    //если оба равны нулю, тогда делаем параметры временного персонажа такими же как у основного персонажа
    temp_character.time = character.time;
    temp_character.interval = character.interval;
    
  }
  //возвращаем урон персонажа противника
  return {
    a: character_enemy.damage,
    b: character,
    c: temp_character,
  };
}

function findWinners(props) {
  let history = [];
  let time, temp_character_enemy = {}, temp_character = {},character_enemy = {};
  let winners = [];
  winners.push({
    id: 'id',
    damage:'damage',
    health: 'health',
    rival: 'rival',
    time: 'time',
    interval:'interval',
    percent: '%',
    time_fight: 'time fight',
  });
  Object.assign(character_enemy, props.character_enemy);
  let characters = props.characters.concat();
  characters.splice(props.numberCharacter, 1);
/*
  console.log(characters, props.id, props.characters);
*/
  
  let value;
  stop:for (let i = 1; i < characters.length; i++) {
    time = 0;
    history = [];
    Object.assign(temp_character_enemy,character_enemy);
    temp_character = {};
    Object.assign(temp_character,characters[i]);
    
    while (true) {
      time++;
      
      //задаем урон персонажей
      let a = damage(character_enemy, characters[i], temp_character);
  
      temp_character_enemy.damage = a.a;
      Object.assign(characters[i],a.b);
      Object.assign(temp_character,a.c);
  
      let b = damage(characters[i], character_enemy, temp_character_enemy);
  
      // if (time % 100 === 1) {
      //   if (time % 1000 === 1) {value = prompt();}
      //   if (value !== 1)
      //     alert(value)
      //   else break stop;
      // }
      
      temp_character.damage = b.a;
      Object.assign(character_enemy,b.b);
      Object.assign(temp_character_enemy,b.c);
      
      //отнимаем время
      temp_character_enemy.health -= temp_character.damage;
      temp_character.health -= temp_character_enemy.damage;
      
/*
      console.log(temp_character_enemy, temp_character);
*/
      history.push(temp_character_enemy, temp_character);
      
      if (temp_character_enemy.health <= 0 || temp_character.health <= 0)
        break;
    }
  
    if (temp_character.health > 0) {
      //меняем параметры персонажа
      temp_character.damage = characters[i].damage;
      temp_character.time = characters[i].time;
      temp_character.time_fight = time;
      temp_character.interval = characters[i].interval;
      temp_character.percent = Math.round((100 * temp_character.health) / characters[i].health);
      temp_character['history'] = history;
      
      //добавляем персонажа
      winners.push(Object.assign(temp_character));
 /*     console.log(winners);*/
  
    }
  
  }
/*  console.log(winners);*/
  
  if (winners.length > 1) {
    //возвращаем массив победителей
    return(rang(props.rang, winners));
    
  }
  else
    return 0;
};

function rang(rang, winners) {
  function swap(a, b) {
    let temp = a;
    a = b;
    b = temp;
  }
  if (rang === 'percent') {
    for (let i = 0; i < winners.length; i++) {
      for (let j = 0; j < winners.length; j++) {
        if (winners[i].percent > winners[j].percent) {
          let temp = winners[i];
          winners[i] = winners[j];
          winners[j] = temp;
        }
      }
    }
  }
  if (rang === 'time') {
    for (let i = 0; i < winners.length; i++) {
      for (let j = 0; j < winners.length; j++) {
        if (winners[i].time_fight < winners[j].time_fight) {
          let temp = winners[i];
          winners[i] = winners[j];
          winners[j] = temp;
        }
      }
    }
  }
  return winners;
}

export {findWinners};