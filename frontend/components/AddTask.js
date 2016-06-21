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

const mapDispatchToProps = function mapProps() {
  return {
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
  render() {
    const cancelAdd = this._cancelAdd.bind(this);
    const handleInputChange = this._handleUpdateInput.bind(this);
    return (
      <div className="container-fluid">
        <div className="row">
          <AppBar
            iconElementLeft={<IconButton onTouchTap={cancelAdd}><NavigationClose /></IconButton>}
            iconElementRight={<FlatButton label="Save" />}
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

AddTask.propTypes = {};
const ConnectedAddTask = connect(mapStateToProps, mapDispatchToProps)(AddTask);
export default ConnectedAddTask;
