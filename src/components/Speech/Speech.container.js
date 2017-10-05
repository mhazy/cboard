import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class SpeechContainer extends Component {
  static propTypes = {
    /**
     * @ignore
     */
    children: PropTypes.node.isRequired,
    /**
     * App locale
     */
    locale: PropTypes.string.isRequired
  };

  componentWillMount() {
    const { locale } = this.props;
    this.fetchVoices(locale);
  }

  render() {
    const { children, voices } = this.props;
    if (!voices) {
      return null;
    }

    return React.Children.only(children);
  }
}

const mapStateToProps = state => {
  return {
    locale: state.language.locale,
    voices: state.speech.voices
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchVoices() {
      dispatch(getVoices());
    }
  };
};
export default connect(mapStateToProps)(SpeechContainer);
