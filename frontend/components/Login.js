import React from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import * as apiActions from '../actions/api.js';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  doAuthenticate: () => {
    apiActions.doAuthenticate(dispatch);
    // browserHistory.push('/home');
  },
});

class Login extends React.Component {
  componentDidUpdate() {
    if (this._isAuthenticated()) {
      browserHistory.push('/home');
    }
  }

  _isAuthenticated() {
    return (this.props.user && this.props.user.displayName);
  }

  _doAuthenticate() {
    if (this._isAuthenticated()) {
      browserHistory.push('/home');
    } else {
      location.href = '/api/auth/google';
    }
    this.props.doAuthenticate();
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <AppBar showMenuIconButton={false} title="LOGIN" />
          <div className="row" style={{ marginTop: '10px' }}>
            <div className="col-xs-12 text-center">
              <RaisedButton label="Login" onMouseDown={() => this._doAuthenticate()} primary />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  doAuthenticate: React.PropTypes.func,
  user: React.PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
