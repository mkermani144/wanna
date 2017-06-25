import React from 'react';
import Timer from 'material-ui/svg-icons/image/timer';
import { amber800, red500 } from 'material-ui/styles/colors';

const DueDate = ({ due }) => {
  const colors = {
    tomorrow: amber800,
    today: red500,
  };
  const styles = {
    tomorrow: {
      color: amber800,
    },
    today: {
      color: red500,
    },
    icon: {
      width: 16,
      height: 16,
    },
  };
  switch (due) {
    case 'tomorrow':
      return (
        <span className="DueDate">
          <span>
            <Timer
              style={styles.icon}
              color={colors.tomorrow}
            />
            <small style={styles.tomorrow}>Tomorrow</small>
          </span>
        </span>
      );
    case 'today':
      return (
        <span className="DueDate">
          <span>
            <Timer
              style={styles.icon}
              color={colors.today}
            />
            <small style={styles.today}>Today</small>
          </span>
        </span>
      );
    default:
      return (
        <span className="DueDate">
          <span />
        </span>
      );
  }
};

export default DueDate;
