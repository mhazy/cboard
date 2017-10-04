import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { initApp } from './actions';
import { BoardContainer } from '../Board';
import Notifications from '../Notifications';
import './App.css';

export class App extends Component {
  static propTypes = {
    /**
     * App locale
     */
    locale: PropTypes.string,
    /**
     * App direction
     */
    dir: PropTypes.string,
    initApp: PropTypes.func
  };

  componentDidMount() {
    const { initApp } = this.props;
    initApp();
  }

  render() {
    const { locale, dir } = this.props;

    return (
      <div className="App">
        <Helmet>
          <html lang={locale} dir={dir} />
        </Helmet>
        <BoardContainer />
        <Notifications />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    locale: state.language.locale,
    dir: state.language.dir
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initApp: () => dispatch(initApp())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
