import React, {Component} from 'react';
import {API_URL_1} from '../supports/api-url/apiurl'
import axios from 'axios'
import TopSongs from './TopSongs'


class TopList extends Component {
    state = { albums: []}
    
    componentWillMount(){
        axios.get(API_URL_1 + "/topsongs")
        .then((response)=>{
            console.log(response.data)
            this.setState({albums : response.data.albums})
        })
        .catch((err)=>{
            console.log(err)
            alert("ERROR")
        })
    }

    renderTopSongs = () =>{
        console.log(this.state)
        return this.state.albums.map(songs =>
        <TopSongs key = {songs.id} track_name = {songs.track_name} ranking={songs.ranking} album_name={songs.album_name} album_art={songs.album_art} artist_name = {songs.artist_name}/>
        )   
    }
    top5(arr){
        var output = [];
        for(var i = 0; i <7 ; i++){
            output.push(arr[i]);
        }
        return output
    }
    render(){
        console.log(this.state)
        return(
            <div>
                <div className="col-md-4 col-xs-12">
                    <h3 className="font-thin" align="left">Top Songs
                        <span className="musicbar animate inline m-l-sm" style={{width:20, height:20}}>
                            <span className="bar1 a1 bg-primary lter"></span>
                            <span className="bar2 a2 bg-info lt"></span>
                            <span className="bar3 a3 bg-success"></span>
                            <span className="bar4 a4 bg-warning dk"></span>
                            <span className="bar5 a5 bg-danger dker"></span>
                        </span>
                    </h3>
                    <div className="list-group bg-dark list-group-lg no-bg auto">  
                        {this.top5(this.renderTopSongs())}
                    </div>
                </div>
            </div>
        );
    }
}

export default TopList