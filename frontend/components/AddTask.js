import React from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
// import RaisedButton from 'material-ui/RaisedButton';
import { insertTask, getTaskDescriptions } from '../api/apiFunctions.js';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import { addTask } from '../actions/tasks.js';

const mapStateToProps = function mapState(state) {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = function mapProps(dispatch) {
  return {
    saveTask: (newTask) => {
      insertTask(newTask);
      dispatch(addTask(newTask));
    },
  };
};

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      possibilities: [],
    };
  }
  componentWillMount() {
    const that = this;
    getTaskDescriptions().then((response) => {
      that.setState({ possibilities: response.data });
    });
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
  _saveTask() {
    const text = this.state.searchText;
    if (text) {
      const newTask = { description: text, userId: this.props.user.id, userName: this.props.user.displayName, userImage: this.props.user.image ? this.props.user.image.url : '' };
      this.props.saveTask(newTask);
      this.setState({ searchText: '' });
    }
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
              dataSource={this.state.possibilities}
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
  user: React.PropTypes.object,
};
const ConnectedAddTask = connect(mapStateToProps, mapDispatchToProps)(AddTask);
export default ConnectedAddTask;
