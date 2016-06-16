import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { increase, decrease } from '../actions/count.js';
import RaisedButton from 'material-ui/RaisedButton';
import Badge from 'material-ui/Badge';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import * as apiActions from '../actions/api.js';

const mapStateToProps = function mapState(state) {
  return {
    aantal: state.count.aantal,
    user: state.user,
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
    doAuthenticate: () => {
      apiActions.doAuthenticate(dispatch);
      // browserHistory.push('/home');
    },
  };
};

class Home extends React.Component {
  componentDidMount() {
    if (!this._isAuthenticated()) {
      this.props.doAuthenticate();
    }
  }
  _isAuthenticated() {
    return (this.props.user && this.props.user.displayName);
  }

  _signOut() {
    browserHistory.push('/');
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
        <MenuItem onTouchTap={this._signOut} value="signOut" primaryText="Sign Out" />
      </IconMenu>
    );
  }
  render() {
    const rightMenu = this._renderRightMenu();
    return (
      <div className="container-fluid">
        <div className="row">
          <AppBar showMenuIconButton={false} title="HOME" iconElementRight={rightMenu} />
          <div className="row" style={{ marginTop: '10px' }}>
            <div className="col-xs-4 text-center">
              <RaisedButton label="+" onMouseDown={() => this._counterIncrease()} primary />
            </div>
            <div className="col-xs-4 text-center">
              <Badge badgeContent={this.props.aantal} primary />
            </div>
            <div className="col-xs-4 text-center">
              <RaisedButton label="-" onMouseDown={() => this._counterDecrease()} primary />
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
  doAuthenticate: React.PropTypes.func,
  user: React.PropTypes.object,
};

const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);

export default ConnectedHome;
