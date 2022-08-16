import React, {useState} from 'react';
import DopLab from "../labs_guap/lab_dop/DopLab";
import '../labs_guap/lab_main.css'
import '../labs_guap/labs.scss'
import Description from "./Description";
import Lab from "../labs_guap/Lab";
import Button from "../common/Button/Button";
import Calculator from "../timer/Calculator";
import Lab_3_2 from "../labs_guap/lab_3_2/Lab_3_2";

const Labs = (props) => {
  const [numberBlock, setNumberBlock] = useState(0);
  
  const strings = {
    'doplab': `Исходные данные задачи:
  1. Персонаж обладает несколькими характеристиками:
    − Количество наносимого им урона противнику в секунду. Персонаж наносит урон все время, кроме времени, на которое он выведен из строя. Если персонаж наносит урон нескольким соперникам, указанный урон наносится каждому.
    − Количество соперников, которым наносится урон. Не более 3.
    − Здоровье персонажа. Наносимый урон вычитается из текущего здоровья, при достижении значения 0, персонаж выбывает.
    − Способность выводить из строя одного соперника. Задается двумя значениями в секундах: первое - на которое соперник выводится из строя, второе – интервал вывода из строя. Второе как минимум в двое больше первого. Персонаж выводит из строя, как только удается это сделать.
  2. Персонажи могут сражаться один против одного, и в командах по 3 персонажа. Победой команды считается, когда все персонажи противоположной команды выбыли. Каждого персонажа можно выбирать только один раз (не зависимо от того, в какой команде уже выбран этот персонаж).
  
  Задача
  А. Оптимальный выбор 1х1.
\tДан набор персонажей с произвольно заданными характеристиками, не менее 10 персонажей. Соперник выбрал одного персонажа. Выбрать среди оставшихся персонажей тех, кто побеждает персонажа соперника с указанием времени сражения и процента оставшегося здоровья. В случае если таких персонажей несколько, то ранжировать их по: времени сражения или проценту (от первоначального) оставшегося здоровья. Вариант ранжирования (сортировки задается) как входной параметр.
\tВ. Оптимальная команда.
\tДан набор персонажей с произвольно заданными характеристиками, не менее 10 персонажей. Соперник выбрал трех персонажей. Собрать команду из трех персонажей среди оставшихся таких, которые побеждают команду соперника с указанием времени сражения. В случае если вариантов таких команд несколько, то ранжировать их по времени сражения. Считать, что персонажи наносят урон и выводят из строя в первую очередь соперника с наибольшим уроном. `
,
    'lab 4.2': `пока ничего нет`,
    'lab 3.2': '3.2'
  }
/*  const blocks = {
    'description': (<div>
      <Description
        description={<div><p>Лабораторные работы по курсу "Основы Программирования"
          были сделаны за промежуток с 08.02.22 по 30.05.22. </p>
          <p>Всего было сделано 10 лабораторных работ себе,
          и около 25 лабораторных работ ребятам с потока. </p>
          <p>На данной странице представлены только самые интересные работы из тех, которые я делал. Изначально сделанные на С++, а позже переделанные на JavaScript, для получения навыка программирования на js.</p></div>}/>
      <table className="tableLabs">
        <tbody>
        <tr>
          <td><Button classChild='buttonLabs' text='dop task' onClick={() => setBlock(blocks['doplab'])}></Button></td>
          <td><Button classChild='buttonLabs' text='lab 3.2' onClick={() => setBlock(blocks['lab 3.2'])}></Button></td>
          <td><Button classChild='buttonLabs' text='lab 4.2' onClick={() => setBlock(blocks['lab 4.2'])}></Button></td>
          <td><Button classChild='buttonLabs' text='lab 4.2' onClick={() => setBlock(blocks['lab 4.2'])}></Button></td>
        </tr>
        </tbody>
      </table>
    </div>),
    'doplab':
     /!* <Lab
        setNumberBlock={(a) => setNumberBlock(a)}
        changeBlock={(e) => setBlock(blocks[e])}
        name='dop task'
        description={strings['doplab']}
        numberBlock={() => numberBlock}
        element={
          <DopLab
            numberBlock={() => props.numberBlock}
          />
        }/>,*!/
    'lab 4.2':
      <Lab
        changeBlock={(e) => setBlock(blocks[e])}
        name='lab 4.2'
        description={strings['lab 4.2']}/>,
  
  }*/
  const [block, setBlock] = useState('description');
  
  // eslint-disable-next-line default-case
  switch (block) {
    case 'description': return <div>
      <Description
        description={<div><p>Лабораторные работы по курсу "Основы Программирования"
          были сделаны за промежуток с 08.02.22 по 30.05.22. </p>
          <p>Всего было сделано 10 лабораторных работ себе,
            и около 25 лабораторных работ ребятам с потока. </p>
          <p>На данной странице представлены только самые интересные работы из тех, которые я делал. Изначально сделанные на С++, а позже переделанные на JavaScript, для получения навыка программирования на js.</p></div>}/>
      <div className="tableLabs">
          <Button className='buttonLabs' text='dop lab' onClick={() => setBlock('doplab')}></Button>
          <Button className='buttonLabs' text='lab 3.2' onClick={() => setBlock('lab 3.2')}></Button>
          <Button className='buttonLabs' text='lab 4.2' onClick={() => setBlock()}></Button>
          <Button className='buttonLabs' text='lab 4.2' onClick={() => setBlock()}></Button>
      </div>
    </div>;
    case 'doplab':
      return (
          <DopLab
            changeBlock={(e) => setBlock(e)}
            description={strings['doplab']}/>
      )
    case 'lab 3.2':
      return (
        <Lab_3_2
          changeBlock={(e) => setBlock(e)}
          description={strings['lab 3.2']}/>
      )
  
  }
};

export default Labs;