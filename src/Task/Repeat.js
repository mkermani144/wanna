import React from 'react';
import RepeatIcon from 'material-ui/svg-icons/av/repeat';
import { grey500 } from 'material-ui/styles/colors';

const Repeat = ({ repeat }) => {
  const styles = {
    text: {
      color: grey500,
    },
    icon: {
      width: 16,
      height: 16,
    },
  };
  return (
    <small className="Repeat" style={styles.text}>
      {
        repeat && repeat.indexOf('0') !== 0 ?
          <RepeatIcon style={styles.icon} color={grey500} />
        :
        null
      }
      {
        repeat && repeat.indexOf('0') ?
        repeat :
        null
      }
    </small>
  );
};

export default Repeat;
