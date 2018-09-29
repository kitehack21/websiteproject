import React, {Component} from 'react';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import AlbumCard from './AlbumCard'


class AlbumList extends Component {
    state = { albums: []}
    
    componentWillMount(){
        axios.get(API_URL_1 + "/newreleases")
        .then((response)=>{
            console.log(response)
            this.setState({albums: response.data.albums})
        })
    }

    // onAlbumSelect(item){
    //     var url = "/AlbumPage?album=" + item.album_id + "&artist=" + item.artist_id
    //     this.props.history.push(url)
    // }
    
    renderAlbumList = () =>{
        console.log(this.state)
        return this.state.albums.map(albums =>
        <AlbumCard key = {albums.album_id} album_id = {albums.album_id} title = {albums.album_name} 
        image={albums.album_art} artist = {albums.artist_name} artist_id={albums.artist_id}/>
        ) 
    }

    render(){
        console.log(this.state)
        return(
            <div>
                <div className="col-md-8 col-xs-12">
                    <h3 className="font-thin" align="left">New Releases</h3>
                <section id="content">
                    {this.renderAlbumList()}
                </section>
                </div>
            </div>
        );
    }
}

export default AlbumList;