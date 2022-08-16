import React, {useState} from "react";
import './styles/App.css';
import Header from "./components/main_components/header/Header";
import Name from "./components/main_components/name/Name";
import Body from "./components/main_components/Body";
import Labs from "./components/main_components/Labs";
import Home from "./components/main_components/Home/Home";
import Footer from "./components/main_components/Footer";
import ArrayTimers from "./components/timer/ArrayTimers";
import CrossesAndNulls from './components/main_components/crossesAndNulls/CrossesAndNulls'
import Photo from './components/main_components/photo/Photo.jsx';

/*let output;

output = 'маша';
console.log(output);

let a = 12;
let b = 10;

let c = (12 - 10) / 10 + 10 / 10
console.log('c = ' + c);

console.log('a - b = ' + (a - b));

output = a + b;
console.log('a + b = ' + ( a + b ));

output = a * b;
console.log('a * b = ' + ( a * b ));

output = a / b;
console.log('a / b = ' + ( a / b ));*/





function App() {
  let blocks = {
    "home": (<Home />),
    "guap op labs": (<Labs/>),
    "timer": <ArrayTimers/>,
    "crosses and nulls": <CrossesAndNulls />,
    "julia's photo": <Photo />,
  };
  
  const [block, setBlock] = useState(<Home/>);
  const [name, setName] = useState('home');
  const [language, setLanguage] = useState('english');
  
  return (
    <div className="App">
      <div className='withHeader'>
        <Header
          changeBlock={(a) => {
            setBlock(blocks[a]);
            setName(a);
          }}
          changeLanguage={(a) => setLanguage(a)}
          language={language}/>
      </div>
      <div className='withoutHeader'>
        <Name
          name={name}
          language={language}/>
        <Body
          block={block}
          language={language}/>
      </div>
      <Footer/>
    </div>
  );
/*  return (<div className="App">
    <h1>{output}</h1>
  </div>)*/
}










export default App;

