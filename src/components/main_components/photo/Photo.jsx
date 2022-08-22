import React, {useEffect, useReducer} from 'react';
import './Photo.css'
import ImageButton from "../../common/ImageButton/ImageButton";
import axios from "axios";
import Range from "../../common/Range/Range";

/*без глобальных переменных не работает переключение фотографий под музыку*/
let play = 0, array = [], image = null, numberPhoto = 0, size_k = 0.7;

const Photo = () => {
  const size_k_column = 0.7, size_k_row = 0.4, music = 0;
  
  const initialState = {
    image: null,
    numberPhoto: 0,
    flexDirection: 'vertical',
    widthImage: 300,
    loading: null,
    play: 0,
    array: []
  }
  
  const [state, setState] = useReducer((state, updates) => ({
  ...state,
  ...updates,
  }), initialState);
  
  useEffect(() => {
    if (music === 1) {
        if (play === 0) {
        play = 1;
        getArray();
        window.addEventListener('scroll', setSizeAfterScroll)
        window.addEventListener("resize", resizeHandler);
        return () => {
          window.removeEventListener("resize", resizeHandler);
          window.removeEventListener('scroll', setSizeAfterScroll)
        };
      }}
    else {
      getArray();
      window.addEventListener('scroll', setSizeAfterScroll)
      window.addEventListener("resize", resizeHandler);
      return () => {
        window.removeEventListener("resize", resizeHandler);
        window.removeEventListener('scroll', setSizeAfterScroll)
      };
    }
    
  }, []);
  
  function getArray() {
    axios.get('http://localhost:4000/api/photo')
      .then((response) => {
        if (music === 1) {
          setPhotoWithMusic();
        }
        array =  response.data;
        image = response.data[0];
        setState({loading: 1});
      });
  }
  
  const resizeHandler = () => {
    const slider = document.getElementById('slider__container__id').style;
    
    if (() => state.flexDirection === 'vertical') {
      slider.left = 0 + 'px';
      slider.top = 0 + 'px';
      slider.position = 'relative'
      size_k = size_k_column;
    }
    else {
      slider.top = 180 + 'px';
      slider.left = (document.documentElement.clientWidth - 300) * 0.05 + 'px'
      slider.position = 'fixed'
      size_k = size_k_row;
    }
    setCountColumns();
  };
  
  function setSizeAfterScroll() {
    let set = (properties) => {
      const slider = document.getElementById('slider__container__id').style;
      document.getElementById('main__photo').style.flexDirection = properties.rotation;
      document.getElementById('slider__image').style.width = getSizes()[1] + 'px';
      document.getElementById('slider__image').style.height = getSizes()[0] + 'px';
      document.getElementById('slider__wrapper__id').style.width = (document.documentElement.clientWidth - 300) * properties.size_k  + 'px' ;
      document.getElementById('slider__numberPhoto__id').style.height = document.documentElement.clientHeight - 400 + 'px';
      document.getElementById('slider__numberPhoto__id').style.top = 220 + 'px';
  
      if (properties.position === 'horizontal') {
        slider.top = 180 + 'px';
        slider.left = (document.documentElement.clientWidth - 300) * 0.05 + 'px'
        slider.position = 'fixed'
        size_k = size_k_row;
      }
      else {
        slider.left = 0 + 'px';
        slider.top = 0 + 'px';
        slider.position = 'relative';
        size_k = size_k_column;
      }
  
      setCountColumns(properties.size_k);
      setState({flexDirection: properties.position});
    }
    
    if (window.scrollY >= document.documentElement.clientHeight * 0.5) {
      set({
        size_k: size_k_row,
        position: 'horizontal',
        rotation: 'row',
      })
    }
    else if (() => state.flexDirection === 'vertical') {
      set({
        size_k: size_k_column,
        position: 'vertical',
        rotation: 'column',
      })
    }
  }
  

  function setPhotoWithMusic() {
    
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
        if (e.keyCode === 32) {
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
        } else if (e.keyCode === 39) {
          audioDrums.currentTime += 10;
          audioMain.currentTime += 10;
        } else if (e.keyCode === 37) {
          audioDrums.currentTime -= 10;
          audioMain.currentTime -= 10;
        } else if (e.keyCode === 40) {
          audioMain.volume -= 0.1;
        } else if (e.keyCode === 38) {
          audioMain.volume += 0.1;
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
    
    let time = 0;
    audioDrums.play();
    audioMain.play();
    audioDrums.currentTime = audioMain.currentTime;

    
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
          image = array[++numberPhoto];
          setState();
        }
      }, 1);
  }
  
  return (
    <div id='main__photo'>
      {setSizeSliderImage()}
      <div className='container__photo' id='container__photo_id'>
        {(state.loading === 1) ? array.map((name) =>
          <div key={name} style={{width: state.widthImage + 'px', height:state.widthImage / 2 + 'px'}}>
          <img
            alt='photo'
            src={'/img/photo/' + name}
            onClick={() => {
              image = name;
              numberPhoto = array.indexOf(name);
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
            setSizeAfterScroll();
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
  
  function getSizes() {
    let img = document.createElement('img');
    img.src = '/img/photo/' + image;
    let x = Math.floor(30000 / img.height) / 100;
    let y = Math.floor((document.documentElement.clientWidth - 300) * size_k  * 100 / img.width) / 100;
    return [img.height * Math.min(x,y), img.width * Math.min(x, y)];
  }
  
  function setSizeSliderImage(){
    let sizes = getSizes();
    let h = sizes[0], w = sizes[1];
  
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
                image = array[--numberPhoto];
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
              if (numberPhoto !== array.length - 1) {
                image = array[++numberPhoto];
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

/*
import React, {useEffect, useReducer} from 'react';
import './Photo.css'
import ImageButton from "../../common/ImageButton/ImageButton";
import axios from "axios";
import Range from "../../common/Range/Range";

let play = 0;

const Photo = () => {
  const size_k_column = 0.7, size_k_row = 0.4, music = 1;
  
  const initialState = {
    image: null,
    numberPhoto: 0,
    flexDirection: 'vertical',
    widthImage: 300,
    loading: null,
    play: 0,
    size_k: 0.7,
    array: []
  }
  
  const [state, setState] = useReducer((state, updates) => ({
    ...state,
    ...updates,
  }), initialState);
  
  useEffect(() => {
    if (play === 0) {
      play = 1;
      getArray();
      document.addEventListener('scroll', function () {
        setSizeAfterScroll();
      });
      window.addEventListener("resize", resizeHandler);
      resizeHandler();
      return () => {
        window.removeEventListener("resize", resizeHandler);
      };
    }
  }, []);
  
  function getArray() {
    axios.get('http://localhost:4000/api/photo')
      .then((response) => {
        if (music === 1) {
          setPhotoWithMusic();
        }
        setState({loading: 1,
          array: response.data,
          image: response.data[0]});
      });
  }
  
  const resizeHandler = () => {
    
    const slider = document.getElementById('slider__container__id').style;
    
    if (() => state.flexDirection === 'vertical') {
      slider.left = 0 + 'px';
      slider.top = 0 + 'px';
      slider.position = 'relative'
      setState({size_k: size_k_column});
      setCountColumns(size_k_column)
    }
    else {
      slider.top = 180 + 'px';
      slider.left = (document.documentElement.clientWidth - 300) * 0.05 + 'px'
      slider.position = 'fixed'
      setState({size_k: size_k_row});
      setCountColumns(size_k_row);
    }
  };
  
  function setSizeAfterScroll() {
    let set = (properties) => {
      const slider = document.getElementById('slider__container__id').style;
      document.getElementById('main__photo').style.flexDirection = properties.rotation;
      document.getElementById('slider__image').style.width = getSizes()[1] + 'px';
      document.getElementById('slider__image').style.height = getSizes()[0] + 'px';
      document.getElementById('slider__wrapper__id').style.width = (document.documentElement.clientWidth - 300) * properties.size_k  + 'px' ;
      document.getElementById('slider__numberPhoto__id').style.height = document.documentElement.clientHeight - 400 + 'px';
      document.getElementById('slider__numberPhoto__id').style.top = 220 + 'px';
      
      if (properties.position === 'horizontal') {
        slider.top = 180 + 'px';
        slider.left = (document.documentElement.clientWidth - 300) * 0.05 + 'px'
        slider.position = 'fixed'
      }
      else {
        slider.left = 0 + 'px';
        slider.top = 0 + 'px';
        slider.position = 'relative'
      }
      
      setCountColumns(properties.size_k);
      setState({size_k: properties.size_k,
        flexDirection: properties.position});
    }
    
    if (window.scrollY >= document.documentElement.clientHeight * 0.5) {
      set({
        size_k: size_k_row,
        position: 'horizontal',
        rotation: 'row',
        image: () => state.image,
      })
    }
    else if (() => state.flexDirection === 'vertical') {
      set({
        size_k: size_k_column,
        position: 'vertical',
        rotation: 'column',
        image: () => state.image,
      })
    }
  }
  
  
  function setPhotoWithMusic() {
    
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
        if (e.keyCode === 32) {
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
        } else if (e.keyCode === 39) {
          audioDrums.currentTime += 10;
          audioMain.currentTime += 10;
        } else if (e.keyCode === 37) {
          audioDrums.currentTime -= 10;
          audioMain.currentTime -= 10;
        } else if (e.keyCode === 40) {
          audioMain.volume -= 0.1;
        } else if (e.keyCode === 38) {
          audioMain.volume += 0.1;
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
    
    let time = 0;
    audioDrums.play();
    audioMain.play();
    audioDrums.currentTime = audioMain.currentTime;
    
    console.log(state.array)
    
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
        console.log(state.image, state.array, state.numberPhoto);
        setState({image: state.array[state.numberPhoto + 1],
          numberPhoto: state.numberPhoto + 1});
      }
      
    }, 1);
  }
  
  return (
    <div id='main__photo'>
      {setSizeSliderImage()}
      <div className='container__photo' id='container__photo_id'>
        {(state.loading === 1) ? state.array.map((name) =>
          <div key={name} style={{width: state.widthImage + 'px', height:state.widthImage / 2 + 'px'}}>
            <img
              alt='photo'
              src={'/img/photo/' + name}
              onClick={() => {
                setState({image: name,
                  numberPhoto: state.array.indexOf(name)})
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
              setSizeAfterScroll();
            }}
          /> : null}
      </div>
      <div id='slider__numberPhoto__duplicate__id'/>
    </div>
  );
  
  function setCountColumns(y) {
    document.getElementById('slider__container__id').style.marginBottom = document.documentElement.clientWidth * 0.05 + 'px';
    const x = Math.floor(document.documentElement.clientWidth / 320);
    if (y === size_k_row) {
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
  
  function getSizes() {
    let img = document.createElement('img');
    img.src = '/img/photo/' + state.image;
    let x = Math.floor(30000 / img.height) / 100;
    let y = Math.floor((document.documentElement.clientWidth - 300) * state.size_k  * 100 / img.width) / 100;
    return [img.height * Math.min(x,y), img.width * Math.min(x, y)];
  }
  
  function setSizeSliderImage(){
    let array = getSizes();
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
              if (state.numberPhoto !== 0) {
                setState({image: state.array[state.numberPhoto],
                  numberPhoto: state.numberPhoto - 1});
              }
            }}/>
          <div className='slider__wrapper' id='slider__wrapper__id'
               style={{width:  (document.documentElement.clientWidth - 300) * state.size_k + 'px'}}>
            <img
              id='slider__image'
              src={'/img/photo/' + state.image}
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
              setState({image: state.array[state.numberPhoto],
                numberPhoto: state.numberPhoto + 1});
            }}/>
        </div>
        <div className='slider__container' id='slider__container__duplicate__id'
             style={{width:  (document.documentElement.clientWidth - 300) * state.size_k + 92*2 + 'px'}}/>
      </div>)
  }
};

export default Photo;*/
