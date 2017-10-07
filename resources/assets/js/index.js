import React from 'react';
import { render } from 'react-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import classnames from 'classnames';
// React-Bootstrap
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import InputGroupAddon from 'react-bootstrap/lib/InputGroupAddon';
// SCSS
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import '../scss/index.scss';
// Images
import twitchLogo from '../img/twitch.png';

class Output extends React.Component {
  create() {
    const { string, num, emote: propEmote } = this.props;

    const numberOfWords = string.split(' ').filter(Boolean).length;
    const parsedNum = parseInt(num, 10);
    let processedText = '';
    let isValid = false;

    if (numberOfWords === 0) {
      processedText = 'ERROR! Please enter your raw meme (without emotes)!';
    } else if (isNaN(parsedNum)) {
      processedText = 'ERROR! Please enter number of emotes between words!';
    } else if (numberOfWords % parsedNum !== 0 && !isNaN(parsedNum)) {
      processedText = 'ERROR! Number of words MOD Number of emotes between words should equal 0!';
    } else {
      const regex = `\\b\\w+(\\s\\w+){${parsedNum - 1}}\\b`;
      const stringArr = string.replace(/\\s{2,}/g, ' ')
        .match(new RegExp(regex, 'g'));

      const emote = propEmote.replace(/\/s{2,}/g, ' ');

      const newStringArr = stringArr.map((str, idx) => {
        const emoteAddition = emote === '' ? '' : ` ${emote}`;

        return str + emoteAddition;
      });

      processedText = newStringArr.join(' ');
      isValid = true;
    }

    return { isValid, processedText };
  }

  render() {
    const { isValid, processedText } = this.create();
    const preClassnames = classnames({
      result__pre: true,
      'result__pre--error': !isValid,
    });
    let validationState;
    let copyAnchor;

    if (isValid) {
      validationState = null;
      copyAnchor = (
        <CopyToClipboard text={processedText}>
          <span>- <a className="result__anchor-copy">Copy to Clipboard</a></span>
        </CopyToClipboard>
      );
    } else {
      validationState = 'error';
      copyAnchor = '';
    }

    return (
      <div>
        <h4 className="header__title">
          Result {' '} {copyAnchor}
        </h4>
        <pre className={preClassnames}>
          {processedText}
        </pre>
      </div>
    );
  }
}

class CInput extends React.Component {
  constructor() {
    super();

    this.state = {
      string: '',
      emote: '',
      num: '',
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
      <Grid className="grid-block">
        <Row>
          <Col xs={12} className="header">
            <img src={twitchLogo} />

            <h2 className="header__title">Twitch Emote Between Texts</h2>
            <h4 className="header__title">Add Emotes Between Texts Easily</h4>
          </Col>
          <Col xs={12}>
            <h5 className="header__title">Enter Your Meme</h5>
            <FormControl
              placeholder="Example: how long can this go on"
              onChange={this.onChange('string')}
              className="input-block"
              value={string}
            />

            <h5 className="header__title">Enter Your Emote-Between-Texts</h5>
            <FormControl
              placeholder="Example: FeelsBadMan :pick:"
              onChange={this.onChange('emote')}
              className="input-block"
              value={emote}
            />

            <h5 className="header__title">Enter Number of Words Between Emotes</h5>
            <FormControl
              placeholder="Example: 1"
              onChange={this.onChange('num')}
              className="input-block"
              value={num}
            />

            <Output
              string={string}
              emote={emote}
              num={num}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

render(
  <CInput />,
  document.getElementById('twitch-emotes')
);
