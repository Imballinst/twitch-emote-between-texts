import React from 'react';
// React-Bootstrap
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
// Custom modules
import Output from './Output';
// Images
import twitchLogo from '../img/twitch.png';

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
            <img alt="Twitch Brand Logo" src={twitchLogo} />

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

export default CInput;
