import React from 'react';
import { render } from 'react-dom';

import '../scss/index.scss';

class Output extends React.Component {
  create() {
    const regex = `(\\w+\\s){${this.props.num}}`;
    const stringArr = this.props.string.replace(/\/s{2,}/g, ' ')
      .split(new RegExp(regex))
      .filter(word => word !== '');

    const emote = this.props.emote.replace(/\/s{2,}/g, ' ');
    console.log(regex, this.props.num, stringArr);
    const newStringArr = stringArr.map((str, idx) => {
      return str + ' ' + emote;
    });

    return newStringArr.join(' ');
  }

  render() {
    return (
      <span>{this.create()}</span>
    );
  }
}

class CInput extends React.Component {
  constructor() {
    super();

    this.state = {
      string: 'how long can this go on',
      emote: 'FeelsBadMan',
      num: '2',
    };
  }

  onChange(prop) {
    return (e) => {
      this.setState({
        [`${prop}`]: e.target.value,
      });
    };
  }

  render() {
    const { string, emote, num } = this.state;

    return (
      <div>
        <input
          type="text"
          placeholder="string"
          onChange={this.onChange('string')}
          className="input-block"
          value={string}
        />
        <input
          type="text"
          placeholder="emote"
          onChange={this.onChange('emote')}
          className="input-block"
          value={emote}
        />
        <input
          type="text"
          placeholder="num"
          onChange={this.onChange('num')}
          className="input-block"
          value={num}
        />

        <Output
          string={string}
          emote={emote}
          num={num}
        />
      </div>
    );
  }
}

render(
  <CInput />,
  document.getElementById('twitch-emotes')
);
