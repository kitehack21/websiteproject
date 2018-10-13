import React, {Component} from 'react'
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import AlbumCard from './AlbumCard'

class BrowsePage extends Component{
    state = { albums: []}
    componentWillMount(){
        axios.get(API_URL_1 + "/newreleases")
        .then((response)=>{
            console.log(response)
            this.setState({albums: response.data.albums})
        })
    }
    
    renderAlbumList = () =>{
        console.log(this.state)
        return this.state.albums.map(albums =>
            <div>
            <section className="col-xs-12 col-sm-6 col-md-4 bg-primary lter auto list-group-item">
                <div className="col-xs-6 col-sm-6 col-md-6"><img src={albums.album_art} style={{width:"100%"}} alt={albums.album_art}/></div>
                <div className="col-xs-6 col-sm-6 col-md-6">
                    <div>{albums.album_name}</div>
                    <br/>
                    <div>{albums.artist_name}</div>
                    <br/>
                    <div>{albums.release_date}</div>
                </div>
            </section>
            </div>
        ) 
    }

    render(){
        return(
         <section id="content ">
          <section className="hbox stretch">
            <section className ="vbox">
              <div className="row">
                <section className="scrollable padder-lg w-f-md " id="bjax-target" >
                    <div>
                        <div className="col-md-12 col-xs-12">
                            <h3 className="font-thin" align="left">Browse Albums</h3>
                            <section id="content">
                                {this.renderAlbumList()}
                            </section>
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

export default BrowsePage