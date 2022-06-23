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

const post = new Post('Webpack post title', webpackLogo);

console.log(post.toString());
console.log('JSON:', json);
console.log('XML:', xml);
console.log('CSV:', csv);
