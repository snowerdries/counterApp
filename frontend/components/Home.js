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
import { grey400 } from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

const iconButtonElement = (
  <IconButton
    touch
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

const leftCheckBox = (
  <Checkbox
    style={styles.checkbox}
  />
);

const mapStateToProps = function mapState(state) {
  return {
    aantal: state.count.aantal,
    user: state.user,
    tasks: state.tasks,
  };
};

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
  };
};

class Home extends React.Component {
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
  _renderTasks() {
    const items = _.map(this.props.tasks, (task) => (<ListItem secondaryText={'18-06-2016 22:30'} leftCheckbox={leftCheckBox} rightIconButton={rightIconMenu} primaryText={task.description} />));
    return (<List className={'smoothScrolling'} style={{ maxHeight: '90vh', overflow: 'scroll' }}>{items}</List>);
  }
  render() {
    const rightMenu = this._renderRightMenu();
    const title = `HOME ${this.props.user.displayName}`;
    const src = (this.props.user && this.props.user.image) ? this.props.user.image.url : '';
    const avatar = (<Avatar src={src} />);
    return (
      <div className="container-fluid">
        <div className="row">
          <AppBar title={title} iconElementLeft={avatar} iconElementRight={rightMenu} />
          <div className="row">
            <div className="col-xs-12">
              {this._renderTasks()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  counterIncrease: React.PropTypes.func,
  counterDecrease: React.PropTypes.func,
  aantal: React.PropTypes.number,
  doLogout: React.PropTypes.func,
  user: React.PropTypes.object,
  tasks: React.PropTypes.array,
};

const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);

export default ConnectedHome;
