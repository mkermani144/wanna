/* eslint-env browser */

import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { blue500, green800, pink300 } from 'material-ui/styles/colors';
import { HotKeys } from 'react-hotkeys';

import store from './store';
import Sidebar from './Sidebar/Sidebar';
import FABContainer from './FAB/FABContainer';
import TaskListContainer from './Task/TaskListContainer';
import IdeaListContainer from './Idea/IdeaListContainer';
import SettingsContainer from './Settings/SettingsContainer';
import About from './About/About';

import { update } from './lib/database';

import './App.css';

injectTapEventPlugin();

class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      toTasks: false,
      toIdeas: false,
      toSettings: false,
      toAbout: false,
    };
    this.keyMap = {
      showTasks: 'shift+t',
      showIdeas: 'shift+i',
      showSettings: 'shift+s',
      showAbout: 'shift+a',
    };
  }
  render() {
    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: blue500,
      },
      datePicker: {
        selectColor: green800,
      },
      snackbar: {
        actionColor: pink300,
      },
    });
    store.subscribe(() => {
      update(store.getState());
    });
    const handlers = {
      showTasks: () => {
        this.setState({
          toTasks: true,
        }, () => {
          this.setState({
            toTasks: false,
          });
        });
      },
      showIdeas: () => {
        this.setState({
          toIdeas: true,
        }, () => {
          this.setState({
            toIdeas: false,
          });
        });
      },
      showSettings: () => {
        this.setState({
          toSettings: true,
        }, () => {
          this.setState({
            toSettings: false,
          });
        });
      },
      showAbout: () => {
        this.setState({
          toAbout: true,
        }, () => {
          this.setState({
            toAbout: false,
          });
        });
      },
    };
    return (
      <Provider store={store}>
        <HotKeys
          focused
          attach={window}
          keyMap={this.keyMap}
          handlers={handlers}
        >
          <Router>
            <MuiThemeProvider muiTheme={muiTheme}>
              <div className="App">
                <Sidebar />
                <FABContainer />
                <Redirect from="/" to="tasks" />
                {this.state.toTasks &&
                  <Redirect to="/tasks" />
                }
                {this.state.toIdeas &&
                  <Redirect to="/ideas" />
                }
                {this.state.toSettings &&
                  <Redirect to="/settings" />
                }
                {this.state.toAbout &&
                  <Redirect to="/about" />
                }
                <Route path="/tasks" component={TaskListContainer} />
                <Route path="/ideas" component={IdeaListContainer} />
                <Route path="/settings" component={SettingsContainer} />
                <Route path="/about" component={About} />
              </div>
            </MuiThemeProvider>
          </Router>
        </HotKeys>
      </Provider>
    );
  }
}

export default App;
