import React from 'react';
import { render } from 'react-dom';
import CInput from './CInput';
// SCSS
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import '../scss/index.scss';

render(
  <CInput />,
  document.getElementById('twitch-emotes')
);
