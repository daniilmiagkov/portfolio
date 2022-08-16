import React, {useEffect, useReducer} from 'react';
import './Photo.css'
import Button from "../../common/Button/Button";
import ImageButton from "../../common/ImageButton/ImageButton";
import axios from "axios";
import {guess} from "web-audio-beat-detector";
import Range from "../../common/Range/Range";

let size_k = 0.7,
  image = '000_ZpkUCzy-j34.jpg',
  play = 0,
  numberPhoto = 0,
  time = 0,
  music = 0;

const Photo = () => {
  let flexDirection = 'vertical';
  const size_k_column = 0.7, size_k_row = 0.4;
  
  const initialState = {
    array: [],
    widthImage: 300,
    loading: null,
  }
  
  const [state, setState] = useReducer((state, updates) => ({
  ...state,
  ...updates,
  }), initialState);
  
  function getArray() {
    axios.get('http://localhost:4000/api/photo')
      .then((response) => {
        setState({loading: 1,
          array: response.data});
        if (music === 1)
          if (play === 0) {
          setPhotoWithMusic(response.data);
          play = 1;
          }
      });
  }
  
  const resizeHandler = () => {
    setCountColumns()
    const slider = document.getElementById('slider__container__id').style;
  
    if (flexDirection === 'vertical') {
      size_k = size_k_column;
      slider.left = 0 + 'px';
      slider.top = 0 + 'px';
      slider.position = 'relative'
    }
    else {
      size_k = size_k_row;
      slider.top = 180 + 'px';
      slider.left = (document.documentElement.clientWidth - 300) * 0.05 + 'px'
      slider.position = 'fixed'
    }
    setState()
  };
  
  function translateDown(y, scale) {
    const slider = document.getElementById('slider__container__id').style;
  
    slider.transform = `translate(0px,${y}px) scale(${scale},${scale})`;
    slider.transitionProperty =  'transform';
    slider.transitionDuration = '1s';
  }
  
  function setSizeAfterScroll(properties) {
    const slider = document.getElementById('slider__container__id').style;
  
    size_k = properties.size_k;
    setTimeout(() => document.getElementById('main__photo').style.flexDirection = properties.rotation, 0);
  
    flexDirection = properties.position;
    document.getElementById('slider__image').style.width = getSizes(properties.l)[1]+ 'px';
    document.getElementById('slider__image').style.height = getSizes(properties.l)[0] + 'px';
    setCountColumns();
    document.getElementById('slider__wrapper__id').style.width = (document.documentElement.clientWidth - properties.l) * size_k  + 'px' ;
    document.getElementById('slider__numberPhoto__id').style.height = document.documentElement.clientHeight - 400 + 'px';
    document.getElementById('slider__numberPhoto__id').style.top = 220 + 'px';
  
    if (properties.position === 'horizontal') {
      slider.top = 180 + 'px';
      slider.left = (document.documentElement.clientWidth - 300) * 0.05 + 'px'
      slider.position = 'fixed'
    }
    else {
/*
      document.getElementById('slider__numberPhoto__id').style.display = '';
*/
      slider.left = 0 + 'px';
      slider.top = 0 + 'px';
      slider.position = 'relative'
    }
    setState()
  }
  
  useEffect(() => {
    document.addEventListener('scroll', function(event) {
      
      if (window.scrollY >= document.documentElement.clientHeight * 0.5) {
/*
        translateDown(100, 0.5);
*/
        flexDirection = 'horizontal';
        setSizeAfterScroll({
          size_k: size_k_row,
          position: 'horizontal',
          rotation: 'row',
          l: 300,
        })
      }
      else if (flexDirection === 'horizontal') {
        flexDirection = 'vertical'
/*
        translateDown(-100, 1);
*/
        setSizeAfterScroll({
          size_k: size_k_column,
          position: 'vertical',
          rotation: 'column',
          l: 0,
        })
      }
    });
    getArray();
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);
  
  function setPhotoWithMusic(array) {
    
    let audioDrums = new Audio(), audioMain = new Audio();
    // аудио контекст представляет собой объект, состоящий из аудио модулей
    // он управляет созданием узлов и выполняет обработку (декодирование) аудио данных
    let contextDrums = new AudioContext(), contextMain = new AudioContext();

    // анализатор представляет собой узел, содержащий актуальную (т.е. постоянно обновляющуюся) информацию о частотах и времени воспроизведения
    // он используется для анализа и визуализации аудио данных
    let analyserDrums = contextDrums.createAnalyser(), analyserMain = contextMain.createAnalyser();

    // метод URL.createObjectURL() создает DOMString, содержащий URL с указанием на объект, заданный как параметр
    // он позволяет загружать файлы из любого места на жестком диске
    // время жизни URL - сессия браузера
    if (audioDrums.src === '') {
      axios.get('http://localhost:4000/api/audio')
        .then((response) => {
          audioDrums.src = '/audio/audio__play/' + response.data[1];
          audioMain.src = '/audio/audio__play/' + response.data[0];
        });
    }
  
    document.addEventListener("keydown", (e) => {
      try {
        if (e.keyCode == 32) {
          if (audioDrums.paused) {
            audioDrums.play();
            audioMain.play();
            setInterval(timerId);
          }
          else {
            audioDrums.pause();
            audioMain.pause();
            clearInterval(timerId);
          }
        } else if (e.keyCode == 13) {
          audioDrums.load();
        } else if (e.keyCode == 39) {
          audioDrums.currentTime += 10;
          audioMain.currentTime += 10;
        } else if (e.keyCode == 37) {
          audioDrums.currentTime -= 10;
          audioMain.currentTime -= 10;
        } else if (e.keyCode == 40) {
          audioDrums.volume -= 0.1;
        } else if (e.keyCode == 38) {
          audioDrums.volume += 0.1;
        }
        e.preventDefault();
      } catch {
        return;
      }
    });
    
    // определяем источник звука
    let source = contextDrums.createMediaElementSource(audioDrums);
    
    // подключаем к источнику звука анализатор
    source.connect(analyserDrums);
    // подключаем к анализатору "выход" звука - акустическая система устройства
    analyserDrums.connect(contextDrums.destination);
  
    let sourceMain = contextMain.createMediaElementSource(audioMain);
  
    // подключаем к источнику звука анализатор
    sourceMain.connect(analyserMain);
    // подключаем к анализатору "выход" звука - акустическая система устройства
    analyserMain.connect(contextMain.destination);
    
    // получаем так называемый байтовый массив без знака на основе длины буфера
    // данный массив содержит информацию о частотах
    let frequencyArray = new Uint8Array(analyserDrums.frequencyBinCount);
    analyserDrums.getByteFrequencyData(frequencyArray);
  
    audioDrums.volume = 0.01;
    audioMain.volume = 0.5;
    
    time = 0;
    audioDrums.play();
    audioMain.play();
    audioDrums.currentTime = audioMain.currentTime - 0.2 ;
  
    play = 1;
    
    let timerId = setInterval(() => {
        analyserDrums.getByteFrequencyData(frequencyArray);
    
        let high = 30, low = 0;
        let sum = 0;
        for (let i = low; i < high; i++) {
          sum += frequencyArray[i];
        }
        sum /= (high - low);
    
        if (sum >= 11 && audioDrums.currentTime - time >= 0.3) {
          time = audioDrums.currentTime;
          console.log(image, sum, audioDrums.currentTime, audioMain.currentTime);
          image = array[numberPhoto + 1];
          numberPhoto =  numberPhoto + 1;
          setState()
        }
    
      }, 1);
    
    /*let timerId = setInterval(() => {
      analyser.getByteTimeDomainData(frequencyArray);
  
      let sum = 0, low = 0, high = 1, medium = 194;
      
      let threshold = frequencyArray[0] * 1.5;
  
      for (let i = 0; i < 64; i++) {
        sum+= frequencyArray[i];
      }
      sum /= (64);
      
      if (threshold - medium >= 0) {
        console.log(threshold,numberPhoto);
        image = state.array[numberPhoto + 1];
        numberPhoto =  numberPhoto + 1;
        setState();
      }
      /!*if (play === 0) {
        audioDrums.pause();
        audioMain.pause();
        clearInterval(timerId);
      }
      else {
        play = 1;
        audioMain.play();
        audioDrums.play();
      }*!/
    }, 1);*/
  }
  
  return (
    <div id='main__photo'>
      {setSizeSliderImage()}
      <div className='container__photo' id='container__photo_id'>
        {(state.loading === 1) ? state.array.map((name) =>
          <div key={name} style={{width: state.widthImage + 'px', height:state.widthImage / 2 + 'px'}}>
          <img
            src={'/img/photo/' + name}
            onClick={() => {
              image = name;
              numberPhoto =  state.array.indexOf(name);
              setState();
            }}
          />
          </div>
        ) : <div>загрузка</div>}
      </div>
      <div id='slider__numberPhoto__id'>
        {(state.loading === 1) ?
          <Range
          classChildUp='upRangeVertical'
          className='photoRangesVertical'
          max={() => document.getElementById('container__photo_id').clientHeight - 400}
          step={10}
          min={0}
          value={window.scrollY}
          withoutNumbers={1}
          onChange={(a) => {
            window.scrollTo(0,+a);
          }}
          /> : null}
      </div>
      <div id='slider__numberPhoto__duplicate__id'/>
    </div>
  );
  
  function setCountColumns() {
    
    document.getElementById('slider__container__id').style.marginBottom = document.documentElement.clientWidth * 0.05 + 'px';
    const x = Math.floor(document.documentElement.clientWidth / 320);
  
    if (size_k === size_k_row) {
      if (x <= 3) {
        document.getElementById('container__photo_id').style.gridTemplateColumns = 'repeat(1, 1fr)';
        return;
      }
      document.getElementById('container__photo_id').style.gridTemplateColumns = 'repeat(2, 1fr)';
    }
    else {
      if (x === 2) {
        document.getElementById('container__photo_id').style.gridTemplateColumns = 'repeat(2, 1fr)';
        return;
      }
      if (x === 3) {
        document.getElementById('container__photo_id').style.gridTemplateColumns = 'repeat(3, 1fr)';
        return;
      }
      document.getElementById('container__photo_id').style.gridTemplateColumns = 'repeat(4, 1fr)';
    }
  }
  
  function getSizes(l) {
    let img = document.createElement('img');
    img.src = '/img/photo/' + image;
    const x = Math.floor(30000 / img.height) / 100;
    const y = Math.floor((document.documentElement.clientWidth - l) * size_k  * 100 / img.width) / 100;
    return [img.height * Math.min(x,y), img.width * Math.min(x, y)];
  }
  
  function setSizeSliderImage(){
    let array = getSizes(300);
    let h = array[0], w = array[1];
  
    return (
      <div>
        <div
          className='slider__container'
          id='slider__container__id'>
          <ImageButton
            className='slider__arrow'
            src='img/leftArrow.png'
            onClick={() => {
              if (numberPhoto !== 0) {
                image = state.array[numberPhoto - 1];
                numberPhoto =  numberPhoto - 1;
                setState();
              }
            }}/>
          <div className='slider__wrapper' id='slider__wrapper__id'
               style={{width:  (document.documentElement.clientWidth - 300) * size_k + 'px'}}>
            <img
              id='slider__image'
              src={'/img/photo/' + image}
              alt='slider'
              style={{
                height: h + 'px',
                width: w + 'px'
              }}/>
          </div>
          <ImageButton
            src='img/rightArrow.png'
            className='slider__arrow'
            onClick={() => {
              if (numberPhoto !== state.array.length - 1) {
                image = state.array[numberPhoto + 1];
                numberPhoto = numberPhoto + 1;
                setState();
              }
            }}/>
        </div>
        <div className='slider__container' id='slider__container__duplicate__id'
             style={{width:  (document.documentElement.clientWidth - 300) * size_k + 92*2 + 'px'}}/>
      </div>)
  }
};

export default Photo;