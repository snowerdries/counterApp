import React from 'react';
// import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { increase, decrease } from '../actions/count.js';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Avatar from 'material-ui/Avatar';
// import * as apiFunctions from '../api/apiFunctions.js';
import * as apiActions from '../actions/api.js';
import { List, ListItem } from 'material-ui/List';
import * as _ from 'lodash';
import * as moment from 'moment';
import { grey400 } from 'material-ui/styles/colors';
// import Checkbox from 'material-ui/Checkbox';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { deleteTask } from '../actions/tasks.js';
import { browserHistory } from 'react-router';
import { deleteTaskOnServer } from '../api/apiFunctions.js';


import { RECIEVE_TASK } from '../constants.js';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
  actionButton: {
    position: 'fixed',
    right: '50px',
    bottom: '25px',
  },
};

const iconButtonElement = (
  <IconButton
    style={{ marginTop: '-7px' }}
    touch
  >
    <MoreVertIcon touch color={grey400} />
  </IconButton>
);

const mapStateToProps = function mapState(state) {
  return {
    aantal: state.count.aantal,
    user: state.user,
    tasks: state.tasks,
  };
};

export const setTask = (task) => ({
  type: RECIEVE_TASK,
  task,
});

const mapDispatchToProps = function mapProps(dispatch) {
  return {
    counterIncrease: () => {
      dispatch(increase(1));
    },
    counterDecrease: () => {
      dispatch(decrease(1));
    },
    doLogout: () => {
      apiActions.doLogout(dispatch);
    },
    updateTask: (task) => {
      dispatch(setTask(task));
      apiActions.updateTask(task, dispatch);
    },
    deleteTask: (task) => {
      deleteTaskOnServer(task);
      dispatch(deleteTask(task));
    },
    getTasks: () => {
      apiActions.getTasks(dispatch);
    },
  };
};

class Home extends React.Component {
  componentWillMount() {
    this.props.getTasks();
  }
  _signOut() {
    this.props.doLogout();
  }

  _counterIncrease() {
    this.props.counterIncrease();
  }

  _counterDecrease() {
    this.props.counterDecrease();
  }
  _renderRightMenu() {
    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem onTouchTap={() => this._signOut()} value="signOut" primaryText="Sign Out" />
      </IconMenu>
    );
  }
  _taskChecked(task) {
    const modTask = task;
    modTask.executionDate = !task.executionDate ? moment.default().format('DD-MM-YYYY HH:mm') : null;
    modTask.isExecuted = !task.executionDate;
    this.props.updateTask(task);
  }
  _addTask() {
    browserHistory.push('/AddTask');
  }
  _taskDeleted(task) {
    this.props.deleteTask(task);
  }
  _renderTasks() {
    const rightIconMenuClicked = (task) => this._taskDeleted.bind(this, task);
    const rightIconMenu = (task) =>
      (<IconMenu touch iconButtonElement={iconButtonElement}><MenuItem touch onTouchTap={rightIconMenuClicked(task)}>Delete</MenuItem></IconMenu>);
    const taskChecked = (task) => this._taskChecked.bind(this, task);
    // const leftCheckBox = (task) => (<Checkbox value={`chk${task.id}`} checked={task.isExecuted} style={styles.checkbox} />);
    const leftAvatar = (task) => (<Avatar style={{ marginTop: '-7px' }} src={task.userImage} />);
    const items = _.map(this.props.tasks, (task) => (<ListItem leftAvatar={leftAvatar(task)} onTouchTap={taskChecked(task)} key={`taskListItem${task._id}`} secondaryText={<span style={{ color: 'green' }}>{task.executionDate}</span>} rightIconButton={rightIconMenu(task)} primaryText={task.description} />));
    return (<List className={'smoothScroll'} style={{ maxHeight: '90vh' }}>{items}</List>);
  }
  render() {
    const rightMenu = this._renderRightMenu();
    const title = `HOME ${this.props.user.displayName}`;
    const src = (this.props.user && this.props.user.image) ? this.props.user.image.url : '';
    const avatar = (<Avatar src={src} />);
    return (
      <div className="container-fluid">
        <div>
          <div className="row"><AppBar title={title} iconElementLeft={avatar} iconElementRight={rightMenu} /></div>
          <div className="row">
            <div>
              {this._renderTasks()}
            </div>
            <FloatingActionButton onTouchTap={this._addTask} style={styles.actionButton}>
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  getTasks: React.PropTypes.func,
  counterIncrease: React.PropTypes.func,
  counterDecrease: React.PropTypes.func,
  aantal: React.PropTypes.number,
  doLogout: React.PropTypes.func,
  user: React.PropTypes.object,
  tasks: React.PropTypes.array,
  updateTask: React.PropTypes.func,
  deleteTask: React.PropTypes.func,
};

const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);

export default ConnectedHome;
