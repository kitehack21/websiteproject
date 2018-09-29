import React, {Component} from 'react'
import AlbumList from './AlbumList'
import TopList from './TopList'

class HomePage extends Component{
    render(){
        return(
         <section id="content " className="animated fadeInUp">
          <section className="hbox stretch">
            <section className ="vbox">
              <div className="row">
                <section className="scrollable padder-lg w-f-md " id="bjax-target" >
                  <AlbumList/>
                  <TopList/>
                </section>
              </div>
            </section>
          </section>
        </section>
        )
    }
}

export default HomePage