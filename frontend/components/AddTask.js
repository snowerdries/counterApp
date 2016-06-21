import React from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
// import RaisedButton from 'material-ui/RaisedButton';
// import * as apiActions from '../actions/api.js';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import { addTask } from '../actions/tasks.js';

const possibilities = [
  'Eten klaarmaken',
  'Vaatwasser opzetten',
  'Brood opzetten',
  'Tafel afruimen',
];

const mapStateToProps = function mapState() {
  return {
  };
};

const mapDispatchToProps = function mapProps(dispatch) {
  return {
    saveTask: (newTask) => {
      dispatch(addTask(newTask));
    },
  };
};

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }
  _cancelAdd() {
    if (this.state.searchText) {
      this.setState({ searchText: '' });
    } else {
      browserHistory.push('/home');
    }
  }
  _handleUpdateInput(input) {
    this.setState({ searchText: input });
  }
  generateUUID() {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
  _saveTask() {
    const text = this.state.searchText;
    const newTask = { id: this.generateUUID(), description: text };
    this.props.saveTask(newTask);
    this.setState({ searchText: '' });
  }
  render() {
    const cancelAdd = this._cancelAdd.bind(this);
    const handleInputChange = this._handleUpdateInput.bind(this);
    const saveTask = this._saveTask.bind(this);
    return (
      <div className="container-fluid">
        <div className="row">
          <AppBar
            iconElementLeft={<IconButton onTouchTap={cancelAdd}><NavigationClose /></IconButton>}
            iconElementRight={<FlatButton label="Save" onTouchTap={saveTask} />}
            showMenuIconButton
            title="ADD TASK"
          />
        </div>
        <div className="row">
          <div className="col-xs-12">
            <AutoComplete
              hintText="Begin met typen"
              filter={AutoComplete.caseInsensitiveFilter}
              dataSource={possibilities}
              fullWidth
              openOnFocus
              searchText={this.state.searchText}
              onUpdateInput={handleInputChange}
              onNewRequest={handleInputChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
AddTask.propTypes = {
  saveTask: React.PropTypes.func,
};
const ConnectedAddTask = connect(mapStateToProps, mapDispatchToProps)(AddTask);
export default ConnectedAddTask;
