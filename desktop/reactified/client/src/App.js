import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Sidebar from './Sidebar/Sidebar.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div>

          </div>
          <div>
            <Sidebar />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
