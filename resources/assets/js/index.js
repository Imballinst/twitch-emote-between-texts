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
    console.log(parsedNum);
    if (numberOfWords % parsedNum !== 0 && !isNaN(parsedNum)) {
      processedText = 'ERROR! Number of words MOD Number of emotes between words should equal 0!';
    } else if (isNaN(parsedNum)) {
      processedText = 'ERROR! Please enter number of emotes between words!';
    } else {
      const regex = `\\b\\w+(\\s\\w+){${parsedNum - 1}}\\b`;
      const stringArr = string.replace(/\\s{2,}/g, ' ')
        .match(new RegExp(regex, 'g'));

      const emote = propEmote.replace(/\/s{2,}/g, ' ');
      const newStringArr = stringArr.map((str, idx) => {
        return str + ' ' + emote;
      });

      processedText = newStringArr.join(' ');
      isValid = true;
    }

    return { isValid, processedText };
  }

  render() {
    const { isValid, processedText } = this.create();
    let validationState;
    let copyButton;

    if (isValid) {
      validationState = 'null';
      copyButton = (
        <CopyToClipboard text={processedText}>
          <Button>Copy</Button>
        </CopyToClipboard>
      );
    } else {
      validationState = 'error';
      copyButton = (
        <Button disabled>Copy Not Available</Button>
      );
    }

    return (
      <FormGroup validationState={validationState}>
        <InputGroup>
          <FormControl
            type="text"
            placeholder="string"
            className="input-block--disabled"
            value={processedText}
            disabled
          />
          <InputGroup.Button>
            {copyButton}
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
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
              type="text"
              placeholder="how long can this go on"
              onChange={this.onChange('string')}
              className="input-block"
              value={string}
            />

            <h5 className="header__title">Enter Your Emote-Between-Texts</h5>
            <FormControl
              type="text"
              placeholder="FeelsBadMan :pick:"
              onChange={this.onChange('emote')}
              className="input-block"
              value={emote}
            />

            <h5 className="header__title">Enter Number of Words Between Emotes</h5>
            <FormControl
              type="text"
              placeholder="1"
              onChange={this.onChange('num')}
              className="input-block"
              value={num}
            />

            <h4 className="header__title">Result</h4>
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
