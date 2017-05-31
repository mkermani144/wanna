import React, { Component } from 'react';

import Timer from 'material-ui/svg-icons/image/timer';

import { amber500, red500 } from 'material-ui/styles/colors';

class DueDate extends Component {
  render() {
    const colors = {
      tomorrow: amber500,
      today: red500,
    };
    const styles = {
      tomorrow: {
        color: amber500,
      },
      today: {
        color: red500,
      }
    };
    return (
      <span className="DueDate">
        {this.props.due === 'tomorrow' ?
          (
            <span>
              <Timer color={colors.tomorrow} /><small style={styles.tomorrow}>Tomorrow</small>
            </span>
          )
          :
          (
            <span>
              <Timer color={colors.today} /><small style={styles.today}>Today</small>
            </span>
          )
        }
      </span>
    );
  }
}

export default DueDate;
