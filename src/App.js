import React, { Component } from 'react';
import './css/App.css';
import Header from './components/Header';
import InvoiceComponent from './components/InvoiceComponent';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
      primary1: blue,
  }
});

class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <div className="App">
        <header className="">
          <Header content='Invoice Editor' />
        </header>
        <div className="bodyWrapper">
          <InvoiceComponent/>
        </div>
        <footer>
          <Header content='...' />
        </footer>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
