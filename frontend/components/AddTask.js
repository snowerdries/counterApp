import React from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
// import RaisedButton from 'material-ui/RaisedButton';
// import * as apiActions from '../actions/api.js';
// import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
class AddTask extends React.Component {
  _cancelAdd() {
    browserHistory.push('/home');
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <AppBar
            iconElementLeft={<IconButton onTouchTap={this._cancelAdd}><NavigationClose /></IconButton>}
            iconElementRight={<FlatButton label="Save" />}
            showMenuIconButton
            title="ADD TASK"
          />
        </div>
      </div>
    );
  }
}

AddTask.propTypes = {};

export default AddTask;
