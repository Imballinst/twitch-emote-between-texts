import React from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import classnames from 'classnames';

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

      const newStringArr = stringArr.map((str) => {
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
    const copyAnchor = isValid ? (
      <CopyToClipboard text={processedText}>
        <span>- <a className="result__anchor-copy">Copy to Clipboard</a></span>
      </CopyToClipboard>
    ) : '';

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

Output.propTypes = {
  string: PropTypes.string.isRequired,
  num: PropTypes.num.isRequired,
  emote: PropTypes.emote.isRequired,
};

export default Output;
