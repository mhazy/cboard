import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

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
    dir: PropTypes.string
  };

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

export default connect(mapStateToProps)(App);
