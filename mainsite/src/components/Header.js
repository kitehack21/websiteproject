import React, {Component} from 'react';
import {Nav, Navbar, NavItem, NavDropdown, FormControl, FormGroup,  NavbarBrand, MenuItem} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {onLogout} from '../actions'
import '../css/simple-line-icons.css'

class Header extends Component{
  onSignOutClick = () =>{
    this.props.onLogout();
  }
    renderNavbar(){
      if(this.props.auth.username !== ""){
        return(
          <Navbar className="bg-dark dk" collapseOnSelect fixedTop={true}>
          <Navbar.Header >
              <NavbarBrand>
                <Link to='/'>Saku</Link>
              </NavbarBrand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1}>
                <Link to="/Admin/albums">Test Admin</Link>
              </NavItem>
              <NavItem eventKey={2}>
                <Link to="/browse">Browse</Link>
              </NavItem>
              <NavItem eventKey={3}>
                <Link to="/subscriptions">Purchase Pass</Link>
              </NavItem>
            </Nav>
            <Nav pullRight>
              {/* <Navbar.Form pullLeft>
                <FormGroup>
                  <FormControl className="form-control input-s-lg no-border rounded col-xs-10" style={{"max-length":"200px"}} type="text" placeholder="Artist, Songs , Albums..." />
                  <a class="fa fa-search btn-icon rounded colxs-2" style={{"margin-top":"10px"}}/>
                </FormGroup>{' '}
              </Navbar.Form> */}
              <NavDropdown eventKey={3} title={this.props.auth.username} id="basic-nav-dropdown">
                <MenuItem onSelect={() => this.props.history.push("/account")}>Account</MenuItem>
                <MenuItem onSelect={this.onSignOutClick} >Sign Out</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          </Navbar>
        );
      }
      return(
        <Navbar className="bg-dark dk" collapseOnSelect fixedTop={true}>
        <Navbar.Header >
            <NavbarBrand>
              <Link to='/'>Saku</Link>
            </NavbarBrand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1}>
              <Link to="/Admin/albums">Test Admin</Link>
            </NavItem>
            <NavItem eventKey={2}>
            <Link to="/browse">Browse</Link>
            </NavItem>
            <NavItem eventKey={3}>
                <Link to="/subscriptions">Purchase Pass</Link>
              </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={2}>
              <Link to="/SignIn"> Sign In</Link>
            </NavItem>
            <NavItem eventKey={2}>
              <Link to="/RegisterPage">Register</Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    ); 
    }
    render(){
      return(
        this.renderNavbar()
      );
    }
}

//state below is the Global State
const mapStateToProps = (state) => {
  const auth = state.auth;
  return {auth};
}
//export
export default connect(mapStateToProps, {onLogout})(Header);