import React, { Component } from 'react';
import {Route, withRouter, Switch } from 'react-router-dom';

import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import ArtistPage from './components/ArtistPage'
import SignIn from './components/SignIn'
import RegisterPage from './components/RegisterPage'
import AlbumPage from './components/AlbumPage'
import Admin from './components/Admin'
import AccountPage from './components/AccountPage'
import BrowsePage from './components/BrowsePage'
import Subscriptions from './components/Subscriptions'
import {connect} from 'react-redux'
import Cookies from 'universal-cookie'
import {keepLogin, cookieChecked} from './actions'

import './css/bootstrap.css'
import './css/animate.css'
import './css/font-awesome.min.css'
import './css/font.css'
import './css/app.css'
import './css/simple-line-icons.css'

const cookies = new Cookies();

class App extends Component {

  componentWillMount(){
    const theCookie = cookies.get('myCookie');
    if(theCookie !== undefined){
      this.props.keepLogin(theCookie)
    }
    else{
      this.props.cookieChecked();
    }
    console.log(this.props.auth.cookieCheck)
    console.log(this.props.auth)
  }
  
  componentWillReceiveProps(newProps){
    if(newProps.auth.username === ""){
      cookies.remove("myCookie")
    }
  }

  render() {
    if(this.props.auth.cookieCheck === true){
      return (
        <div className="App">
          <Header/>
          <div style={{"padding-bottom":"80px"}}>
            <Switch>
            <Route exact path="/" component = {HomePage}/>
            <Route path="/SignIn" component = {SignIn}/>
            <Route path="/ArtistPage" component = {ArtistPage}/>
            <Route path="/RegisterPage" component = {RegisterPage}/>
            <Route path="/AlbumPage" component = {AlbumPage}/>
            <Route path="/Admin/:table" component = {Admin}/>
            <Route path="/browse" component = {BrowsePage}/>
            <Route path="/browse/:genre" component = {BrowsePage}/>
            <Route path="/account" component = {AccountPage}/>
            <Route path="/subscriptions" component = {Subscriptions}/>
            </Switch>
          </div>  
          <Footer />      
        </div>
      );
    }
    return <div>Authentication Checking</div>
  }
}

const mapStateToProps = (state) => {
  const auth = state.auth;
  return {auth};
}
//export
export default withRouter(connect(mapStateToProps, {keepLogin, cookieChecked})(App));
