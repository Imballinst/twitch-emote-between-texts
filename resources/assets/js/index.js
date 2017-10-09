import React from 'react';
import { render } from 'react-dom';
// SCSS
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import '../scss/index.scss';
// Relatifve imports
import CInput from './CInput';

render(
  <CInput />,
  document.getElementById('twitch-emotes')
);
