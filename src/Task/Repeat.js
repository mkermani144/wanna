import React from 'react';
import RepeatIcon from 'material-ui/svg-icons/av/repeat';
import { grey500 } from 'material-ui/styles/colors';

const Repeat = ({ repeat }) => {
  const styles = {
    text: {
      color: grey500,
      MozUserSelect: 'none', /* Firefox */
      MsUserSelect: 'none', /* Internet Explorer */
      KhtmlUserSelect: 'none', /* KHTML browsers (e.g. Konqueror) */
      WebkitUserSelect: 'none', /* Chrome, Safari, and Opera */
      WebkitTouchCallout: 'none', /* Disable Android and iOS callouts */
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
