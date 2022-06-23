import Post from '@model/Post';
import '@css/styles.css';
import json from '@assets/json';
import webpackLogo from '@assets/webpack-logo';
import xml from '@assets/data.xml';
import csv from '@assets/data.csv';
import '@less/styles.less';
import '@sass/styles.scss';
import '@sass/styles.sass';
import './babel';
import '@babel/polyfill';
import '@model/lodash';

const post = new Post('Webpack post title', webpackLogo);

import React from 'react';
import {render} from 'react-dom';
import {createRoot} from 'react-dom/client';

const App = () => (
  <div className="container">
    <h1>Webpack course</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum nulla quaerat provident inventore voluptatum fuga necessitatibus eius cum? Rem velit facere perspiciatis quis voluptatibus saepe
      numquam totam, eos nulla id.
    </p>
    <hr />
    <div className="logo" />
    <div className="less-demo">
      <h2>Less</h2>
    </div>
    <div className="scss-demo">
      <h2>Scss</h2>
    </div>
    <div className="sass-demo">
      <h2>Sass</h2>
    </div>
  </div>
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

console.log(post.toString());
console.log('JSON:', json);
console.log('XML:', xml);
console.log('CSV:', csv);
