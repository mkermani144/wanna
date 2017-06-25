import React, { Component } from 'react';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import './About.css';

class About extends Component {
  render() {
    return (
      <div className="About">
        <List>
          <ListItem
            primaryText="Version"
            secondaryText="Flex (1.0.0)"
          />
          <Divider />
          <ListItem
            primaryText="Github repository"
            secondaryText="https://github.com/mkermani144/wanna"
          />
          <Divider />
          <ListItem
            primaryText="Star Wanna on Github"
            secondaryText="Stars: 6"
          />
          <Divider />
          <ListItem
            primaryText="License"
            secondaryText="MIT"
          />
          <Divider />
        </List>
      </div>
    );
  }
}

export default About;
