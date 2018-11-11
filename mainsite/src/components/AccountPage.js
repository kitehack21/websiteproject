import React, {Component} from 'react'
import AccountTabs from './AccountTabs'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import {onUnSubcribe} from '../actions'

class AccountPage extends Component{
    state = {subdataCurrent: [], allsubdata: []}
    componentWillMount(){
      this.refreshData()
    }

    refreshData(){
      axios.get(API_URL_1 + "/substatus/" + this.props.auth.id)
      .then((res) => {
        var tempData = ""
        for(var index in res.data){
          if(res.data[index].status == "active"){
            tempData = res.data[index]
          }
        }
        this.setState({subdataCurrent: tempData, allsubdata: res.data})
      })
    }
    
    render(){
      if(this.props.auth.username !== ""){
        return(
          <div className="col-md-push-2 col-md-8">
            <section id="content">
            <section className="vbox">
              <section className="scrollable">
                <section className="hbox stretch">
                  <aside className="aside-lg bg-light lter b-r">
                    <section className="vbox">
                      <section className="scrollable">
                        <div className="wrapper">
                          <div className="text-center m-b m-t">
                            <a href="" className="thumb-lg">
                              <img src="images/a0.png" className="img-circle" alt=""/>
                            </a>
                            <div>
                              <div className="h3 m-t-xs m-b-xs">{this.props.auth.username}</div>
                              <small className="text-muted"><i className="fa fa-map-marker"></i>{this.props.auth.email}</small>
                            </div>                
                          </div>
                          <div className="panel wrapper">
                            <div className="row text-center">
                              <div className="col-xs-6">
                                <a href="">
                                  <span className="m-b-xs h4 block">245</span>
                                  <small className="text-muted">Followers</small>
                                </a>
                              </div>
                              <div className="col-xs-6">
                                <a href="">
                                  <span className="m-b-xs h4 block">55</span>
                                  <small className="text-muted">Following</small>
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="btn-group btn-group-justified m-b">
                            <a className="btn btn-success btn-rounded" data-toggle="button">
                              <span className="text">
                                <i className="fa fa-eye"></i> Follow
                              </span>
                              <span className="text-active">
                                <i className="fa fa-eye"></i> Following
                              </span>
                            </a>
                            <a className="btn btn-dark btn-rounded">
                              <i className="fa fa-comment-o"></i> Chat
                            </a>
                          </div>
                          <div>
                            <small className="text-uc text-xs text-muted">about me</small>
                            <p>Artist</p>
                            <small className="text-uc text-xs text-muted">info</small>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id neque quam. Aliquam sollicitudin venenatis ipsum ac feugiat.</p>
                            <div className="line"></div>
                            <small className="text-uc text-xs text-muted">connection</small>
                            <p className="m-t-sm">
                              <a href="" className="btn btn-rounded btn-twitter btn-icon"><i className="fa fa-twitter"></i></a>
                              <a href="" className="btn btn-rounded btn-facebook btn-icon"><i className="fa fa-facebook"></i></a>
                              <a href="" className="btn btn-rounded btn-gplus btn-icon"><i className="fa fa-google-plus"></i></a>
                            </p>
                          </div>
                        </div>
                      </section>
                    </section>
                  </aside>
                 <AccountTabs refresh={()=>{this.refreshData()}} unSub={()=>this.props.onUnSubcribe()} subscription={this.props.auth.subscription} subdataCurrent={this.state.subdataCurrent} allsubdata={this.state.allsubdata}/>
                </section>
              </section>
            </section>
            <a href="" className="hide nav-off-screen-block" data-toggle="class:nav-off-screen,open" data-target="#nav,html"></a>
          </section>
          </div>
        )
      }
      return <Redirect to = "/" />
    }
}

const mapStateToProps = (state) => {
  const auth = state.auth;
  return {auth};
}
export default connect(mapStateToProps, {onUnSubcribe})(AccountPage)