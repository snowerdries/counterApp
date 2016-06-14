import React from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

export default function Login() {
  return (
    <div className="container-fluid">
      <div className="row">
        <AppBar showMenuIconButton={false} title="LOGIN" />
        <div className="row" style={{ marginTop: '10px' }}>
          <div className="col-xs-12 text-center">
            <RaisedButton label="Login" onMouseDown={() => browserHistory.push('/home')} primary />
          </div>
        </div>
      </div>
    </div>
  );
}
