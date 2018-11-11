import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {onLogin} from '../actions'
import Cookies from 'universal-cookie'

const cookies = new Cookies();

class SignIn extends Component {

    componentWillReceiveProps(newProps){
      if(newProps.auth.username !== ""){
                      //cookie name
          cookies.set('myCookie', newProps.auth.email, {path: "/"})
      }
    }

    onLoginClick = () =>{
      if(this.refs.email.value === "" || this.refs.password.value === ""){
        alert("Please Fill All Forms")
    }
      var email = this.refs.email.value;
      var password = this.refs.password.value;

      this.props.onLogin({email, password});
    }

    onKeyPress(x) {
      if (x.which == 13) {
          this.onLoginClick()
      }
  }
    onRegisterClick = () =>{
      this.props.history.push("/RegisterPage")
    }

    errorRender(){
      if(this.props.auth.error !== ""){
        return (
          <div>
            <br/>
            <div id="content" className="alert alert-danger rounded alert-block animated fadeInUp">
              {this.props.auth.error}
            </div>
          </div>
        )
      }
    }
    render() {
      console.log(this.props.auth)
      if(this.props.auth.username === ""){
        return (
        <section id="content" className="m-t-lg wrapper-md animated fadeInUp">    
        <div className="container aside-xl">
          <a className="navbar-brand block"><span className="h1 font-bold">Saku</span></a>
          <section className="m-b-lg">
            <header className="wrapper text-center">
              <strong>Sign in to start listening</strong>
            </header>
            <form>
              <div className="form-group">
                <input type="email" ref="email" placeholder="Email" className="form-control rounded input-lg text-center no-border"  onKeyPress={this.onKeyPress.bind(this)}/>
              </div>
              <div className="form-group">
                 <input type="password" ref="password" placeholder="Password" className="form-control rounded input-lg text-center no-border"  onKeyPress={this.onKeyPress.bind(this)}/>
              </div>
              <Button onClick={()=>this.onLoginClick()} className="btn btn-lg btn-primary lt b-white b-2x btn-block btn-rounded"><i className="icon-arrow-right pull-right"></i><span className="m-r-n-lg">Sign in</span></Button>
              {this.errorRender()}
              <div className="text-center m-t m-b"><a href="#"><small>Forgot password?</small></a></div>
              <div className="line line-dashed"></div>
              <p className="text-muted text-center"><small>Do not have an account?</small></p>
              <a  className="btn btn-lg btn-info btn-block rounded"  onClick={()=>{this.onRegisterClick()}}>Create an account</a>
            </form>
          </section>
        </div>
      </section>
      );
    }
      return <Redirect to = "/" />
  }
}

//state below is the Global State
const mapStateToProps = (state) => {
    const auth = state.auth;
    return {auth};
}
export default connect(mapStateToProps, {onLogin})(SignIn);
  