import React, {useContext, useState} from 'react';
import './home.css'

const Home = () => {
  return (
    <div className="home">
      <div>
        <h3>personal data:</h3>
        <table>
          <tbody>
          <tr>
            <td>name:</td>
            <td>Daniil Miagkov</td>
          </tr>
          <tr>
            <td>date:</td>
            <td>22.04.2003</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h3>education:</h3>
        <table>
          <tbody>
          <tr>
            <td>university:</td>
            <td>GUAP - information technology in design</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h3>contacts:</h3>
    
        <table>
          <tbody>
          <tr>
            <td>phone number:</td>
            <td><a href="tel:+79537962556">79537962556</a></td>
          </tr>
          <tr>
            <td>email:</td>
            <td><a href="mailto:d.miagkov.work@gmail.com" target="_blank">d.miagkov.work@gmail.com</a></td>
          </tr>
          </tbody>
        </table>
        <div id='contacts'>
          <a href="https://t.me/daniil_miagkov_l" target="_blank">telegram</a>
          <a href="https://vk.com/daniil_miagkov" target="_blank">vk</a>
          <a href="https://github.com/daniilmiagkov" target="_blank">github</a>
        </div>
      </div>
    </div>
  );
};

export default Home;