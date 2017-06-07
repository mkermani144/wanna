import React, { Component } from 'react';

import RepeatIcon from 'material-ui/svg-icons/av/repeat';

import { grey500 } from 'material-ui/styles/colors';

class Repeat extends Component {
  render() {
    const styles = {
      text: {
        color: grey500,
      },
      icon: {
        width: 16,
        height: 16
      },
    };
    return (
      <small className="Repeat" style={styles.text}>
        {this.props.repeat.indexOf('0') !== 0 ?
          <RepeatIcon style={styles.icon} color={grey500} />
          :
          null
        }
        {this.props.repeat.indexOf('0') !== 0 || null}
      </small>
    );
  }
}

export default Repeat;
