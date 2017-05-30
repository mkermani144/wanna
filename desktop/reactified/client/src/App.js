import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Sidebar from './Sidebar/Sidebar';
import FAB from './FAB/FAB';

import './App.css';

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Sidebar />
          <FAB />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
