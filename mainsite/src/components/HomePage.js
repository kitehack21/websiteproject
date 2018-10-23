import React, {Component} from 'react'
import AlbumList from './AlbumList'
import TopList from './TopList'
import {Link} from 'react-router-dom'

class HomePage extends Component{
    render(){
        return(
         <section id="content " className="animated fadeInUp">
          <section className="hbox stretch">
            <section className ="vbox">
              <div className="row">
                <section className="scrollable padder-lg w-f-md " id="bjax-target" >
                  <div className="row row-sm">
                  <AlbumList/>
                  <TopList/>
                  </div>
                  <div class="row m-t-lg m-b-lg col-md-12">
                    <div class="col-xs-12 col-md-4">
                      <div class="bg-primary wrapper-md r">
                        <Link to="/SignIn">
                          <span class="h4 m-b-xs block"><i class="icon-user-follow i-lg"></i> Login or Create account</span>
                          <span class="text-muted">Save and share your playlists when you log in</span>
                        </Link>
                      </div>
                    </div>
                    <div class="col-xs-12 col-md-4">
                      <div class="bg-success lt wrapper-md r">
                        <Link to="/subscriptions">
                          <span class="h4 m-b-xs block"><i class="fa fa-bookmark-o i-lg"></i> Purchase a Streaming Pass</span>
                          <span class="text-muted">Get unlimited streaming to our amazing library of songs!</span>
                        </Link>
                      </div>
                    </div>
                    <div class="col-xs-12 col-md-4">
                      <div class="bg-black wrapper-md r">
                        <a href="#modal-app" data-toggle="modal">
                          <span class="h4 m-b-xs block"><i class="icon-cloud-download i-lg"></i> Download our app</span>
                          <span class="text-muted">Start listening music at anywhere and anytime.</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </section>
          </section>
        </section>
        )
    }
}

export default HomePage