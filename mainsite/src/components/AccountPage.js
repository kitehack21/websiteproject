import React, {Component} from 'react'

class AccountPage extends Component{

    componentWillMount(){

    }
    render(){
        return(
            <section id="content">
            <section className="vbox">
              <section className="scrollable">
                <section className="hbox stretch">
                  <aside className="aside-lg bg-light lter b-r">
                    <section className="vbox">
                      <section className="scrollable">
                        <div className="wrapper">
                          <div className="text-center m-b m-t">
                            <a href="#" className="thumb-lg">
                              <img src="images/a0.png" className="img-circle"/>
                            </a>
                            <div>
                              <div className="h3 m-t-xs m-b-xs">John.Smith</div>
                              <small className="text-muted"><i className="fa fa-map-marker"></i> London, UK</small>
                            </div>                
                          </div>
                          <div className="panel wrapper">
                            <div className="row text-center">
                              <div className="col-xs-6">
                                <a href="#">
                                  <span className="m-b-xs h4 block">245</span>
                                  <small className="text-muted">Followers</small>
                                </a>
                              </div>
                              <div className="col-xs-6">
                                <a href="#">
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
                              <a href="#" className="btn btn-rounded btn-twitter btn-icon"><i className="fa fa-twitter"></i></a>
                              <a href="#" className="btn btn-rounded btn-facebook btn-icon"><i className="fa fa-facebook"></i></a>
                              <a href="#" className="btn btn-rounded btn-gplus btn-icon"><i className="fa fa-google-plus"></i></a>
                            </p>
                          </div>
                        </div>
                      </section>
                    </section>
                  </aside>
                  <aside className="bg-white">
                    <section className="vbox">
                      <header className="header bg-light lt">
                        <ul className="nav nav-tabs nav-white">
                          <li className="active"><a href="#activity" data-toggle="tab">Activity</a></li>
                          <li className=""><a href="#events" data-toggle="tab">Events</a></li>
                          <li className=""><a href="#interaction" data-toggle="tab">Interaction</a></li>
                        </ul>
                      </header>
                      <section className="scrollable">
                        <div className="tab-content">
                          <div className="tab-pane active" id="activity">
                            <ul className="list-group no-radius m-b-none m-t-n-xxs list-group-lg no-border">
                              <li className="list-group-item">
                                <a href="#" className="thumb-sm pull-left m-r-sm">
                                  <img src="images/a0.png" className="img-circle"/>
                                </a>
                                <a href="#" className="clear">
                                  <small className="pull-right">3 minuts ago</small>
                                  <strong className="block">Drew Wllon</strong>
                                  <small>Wellcome and play this web application template ... </small>
                                </a>
                              </li>
                              <li className="list-group-item">
                                <a href="#" className="thumb-sm pull-left m-r-sm">
                                  <img src="images/a1.png" className="img-circle"/>
                                </a>
                                <a href="#" className="clear">
                                  <small className="pull-right">1 hour ago</small>
                                  <strong className="block">Jonathan George</strong>
                                  <small>Morbi nec nunc condimentum...</small>
                                </a>
                              </li>
                              <li className="list-group-item">
                                <a href="#" className="thumb-sm pull-left m-r-sm">
                                  <img src="images/a2.png" className="img-circle"/>
                                </a>
                                <a href="#" className="clear">
                                  <small className="pull-right">2 hours ago</small>
                                  <strong className="block">Josh Long</strong>
                                  <small>Vestibulum ullamcorper sodales nisi nec...</small>
                                </a>
                              </li>
                              <li className="list-group-item">
                                <a href="#" className="thumb-sm pull-left m-r-sm">
                                  <img src="images/a3.png" className="img-circle"/>
                                </a>
                                <a href="#" className="clear">
                                  <small className="pull-right">1 day ago</small>
                                  <strong className="block">Jack Dorsty</strong>
                                  <small>Morbi nec nunc condimentum...</small>
                                </a>
                              </li>
                              <li className="list-group-item">
                                <a href="#" className="thumb-sm pull-left m-r-sm">
                                  <img src="images/a4.png" className="img-circle"/>
                                </a>
                                <a href="#" className="clear">
                                  <small className="pull-right">3 days ago</small>
                                  <strong className="block">Morgen Kntooh</strong>
                                  <small>Mobile first web app for startup...</small>
                                </a>
                              </li>
                              <li className="list-group-item">
                                <a href="#" className="thumb-sm pull-left m-r-sm">
                                  <img src="images/a5.png" className="img-circle"/>
                                </a>
                                <a href="#" className="clear">
                                  <small className="pull-right">Jun 21</small>
                                  <strong className="block">Yoha Omish</strong>
                                  <small>Morbi nec nunc condimentum...</small>
                                </a>
                              </li>
                              <li className="list-group-item">
                                <a href="#" className="thumb-sm pull-left m-r-sm">
                                  <img src="images/a6.png" className="img-circle"/>
                                </a>
                                <a href="#" className="clear">
                                  <small className="pull-right">May 10</small>
                                  <strong className="block">Gole Lido</strong>
                                  <small>Vestibulum ullamcorper sodales nisi nec...</small>
                                </a>
                              </li>
                              <li className="list-group-item">
                                <a href="#" className="thumb-sm pull-left m-r-sm">
                                  <img src="images/a7.png" className="img-circle"/>
                                </a>
                                <a href="#" className="clear">
                                  <small className="pull-right">Jan 2</small>
                                  <strong className="block">Jonthan Snow</strong>
                                  <small>Morbi nec nunc condimentum...</small>
                                </a>
                              </li>
                              <li className="list-group-item" href="#email-content" data-toggle="className:show">
                                <a href="#" className="thumb-sm pull-left m-r-sm">
                                  <img src="images/a8.png" className="img-circle"/>
                                </a>
                                <a href="#" className="clear">
                                  <small className="pull-right">3 minuts ago</small>
                                  <strong className="block">Drew Wllon</strong>
                                  <small>Vestibulum ullamcorper sodales nisi nec sodales nisi nec sodales nisi nec...</small>
                                </a>
                              </li>
                              <li className="list-group-item">
                                <a href="#" className="thumb-sm pull-left m-r-sm">
                                  <img src="images/a9.png" className="img-circle"/>
                                </a>
                                <a href="#" className="clear">
                                  <small className="pull-right">1 hour ago</small>
                                  <strong className="block">Jonathan George</strong>
                                  <small>Morbi nec nunc condimentum...</small>
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="tab-pane" id="events">
                            <div className="text-center wrapper">
                              <i className="fa fa-spinner fa fa-spin fa fa-large"></i>
                            </div>
                          </div>
                          <div className="tab-pane" id="interaction">
                            <div className="text-center wrapper">
                              <i className="fa fa-spinner fa fa-spin fa fa-large"></i>
                            </div>
                          </div>
                        </div>
                      </section>
                    </section>
                  </aside>
                  <aside className="col-lg-3 b-l">
                    <section className="vbox">
                      <section className="scrollable padder-v">
                        <div className="panel">
                          <h4 className="font-thin padder">Latest Tweets</h4>
                          <ul className="list-group">
                            <li className="list-group-item">
                                <p>Wellcome <a href="#" className="text-info">@Drew Wllon</a> and play this web application template, have fun1 </p>
                                <small className="block text-muted"><i className="fa fa-clock-o"></i> 2 minuts ago</small>
                            </li>
                            <li className="list-group-item">
                                <p>Morbi nec <a href="#" className="text-info">@Jonathan George</a> nunc condimentum ipsum dolor sit amet, consectetur</p>
                                <small className="block text-muted"><i className="fa fa-clock-o"></i> 1 hour ago</small>
                            </li>
                            <li className="list-group-item">                     
                                <p><a href="#" className="text-info">@Josh Long</a> Vestibulum ullamcorper sodales nisi nec adipiscing elit. Morbi id neque quam. Aliquam sollicitudin venenatis</p>
                                <small className="block text-muted"><i className="fa fa-clock-o"></i> 2 hours ago</small>
                            </li>
                          </ul>
                        </div>
                        <div className="panel clearfix">
                          <div className="panel-body">
                            <a href="#" className="thumb pull-left m-r">
                              <img src="images/a0.png" className="img-circle"/>
                            </a>
                            <div className="clear">
                              <a href="#" className="text-info">@Mike Mcalidek <i className="fa fa-twitter"></i></a>
                              <small className="block text-muted">2,415 followers / 225 tweets</small>
                              <a href="#" className="btn btn-xs btn-success m-t-xs">Follow</a>
                            </div>
                          </div>
                        </div>
                      </section>
                    </section>              
                  </aside>
                </section>
              </section>
            </section>
            <a href="#" className="hide nav-off-screen-block" data-toggle="class:nav-off-screen,open" data-target="#nav,html"></a>
          </section>
        )
    }
}

export default AccountPage