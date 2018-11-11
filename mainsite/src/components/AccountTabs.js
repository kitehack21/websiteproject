import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class SimpleTabs extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  onCancelClick(){
    if(window.confirm("Are you sure you want to cancel subscription?")){
      axios.put(API_URL_1 + "/subcancel/" + this.props.subdataCurrent.id)
      .then(res =>{
        alert("Subscription has been cancelled")
        this.props.refresh()
        this.props.unSub()
      })
    }
  }
  renderAccount(){
    return(
      <div>
        <div className="m-b-xs h4 block">
          Subscription Status : {this.props.subscription}
        </div>
        <div className="m-b-xs h4 block"> 
          Start Date : {this.props.subdataCurrent.start_date}
        </div>
        <div className="m-b-xs h4 block"> 
          End Date : {this.props.subdataCurrent.end_date}
        </div>
        <div>
          <input type="button" className="btn btn-danger" value="Cancel Subscription" onClick={()=>{this.onCancelClick()}}/> 
        </div>
      </div>
    )
  }

  renderSubHistory(){
    var arrJSX = this.props.allsubdata.map((item) => {
      return(
        <tr className="table-border">
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>{item.start_date}</td>
          <td>{item.end_date}</td>
          <td>{item.status}</td>
        </tr>
    )})

    return arrJSX
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="My Account" />
            <Tab label="Transactions" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>{this.renderAccount()}</TabContainer>}
        {value === 1 && <TabContainer>
          <table className="table table-striped m-b-none">
          <thead>
                <tr>
                <th style={{width: "8%"}}>Pass Type</th>
                <th style={{width: "8%"}}>Price</th>
                <th style={{width: "8%"}}>Start Date</th>
                <th style={{width: "20%"}}>End Date</th>
                <th style={{width: "20%"}}>Status</th>
                </tr>
            </thead>
            <tbody>
             {this.renderSubHistory()}
            </tbody>
        </table>
        </TabContainer>}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);