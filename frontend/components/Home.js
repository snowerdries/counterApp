import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { increase, decrease } from '../actions/count.js';
import RaisedButton from 'material-ui/RaisedButton';
import Badge from 'material-ui/Badge';
import AppBar from 'material-ui/AppBar';

const mapStateToProps = function mapState(state) {
  if (state) {
    return { aantal: state.count.aantal };
  }
  return {};
};

const mapDispatchToProps = function mapProps(dispatch) {
  return {
    counterIncrease: () => {
      dispatch(increase(1));
    },
    counterDecrease: () => {
      dispatch(decrease(1));
    },
  };
};

class Home extends React.Component {
  _signOut() {
    browserHistory.push('/');
  }

  _counterIncrease() {
    this.props.counterIncrease();
  }

  _counterDecrease() {
    this.props.counterDecrease();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12"><AppBar showMenuIconButton={false} title="HOME" /></div>
        </div>
        <div className="row" style={{ marginTop: '10px' }}>
          <div className="col-xs-4">
            <RaisedButton label="Tel op" onMouseDown={() => this._counterIncrease()} primary />
          </div>
          <div className="col-xs-4 text-center">
            <Badge badgeContent={this.props.aantal} primary />
          </div>
          <div className="col-xs-4">
            <RaisedButton className="pull-right" label="Trek af" onMouseDown={() => this._counterDecrease()} primary />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 text-center">
            <RaisedButton label="Sign out" onMouseDown={() => this._signOut()} primary />
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
};

const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);

export default ConnectedHome;
