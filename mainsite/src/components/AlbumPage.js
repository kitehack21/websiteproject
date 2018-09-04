import React,{Component} from 'react'
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import AlbumPageDetails from './AlbumPageDetails'

class AlbumPage extends Component{
    state = {artist: []}

    componentWillMount(){
            axios.get(API_URL_1 + '/artists')
            .then(response => {
                console.log(response);
                this.setState({artist: response.data});
            });
    }

    renderAlbumPage = () => {
        return this.state.artist.map(artists =>
            <AlbumPageDetails 
            key = {artists.artistname} 
            name = {artists.artistname} 
            picture={artists.artistpicture} 
            albums = {artists.albums} 
            albumtitle = {artists.albums[0].albumtitle}
            albumcover = {artists.albums[0].albumcover} 
            release = {artists.albums[0].release}
            genre = {artists.albums[0].genre}
            publisher = {artists.albums[0].publisher} />
        )
    }
    
    render(){
        console.log(this.state);
        return(
            <div>
               {this.renderAlbumPage()}
            </div>
        )
    }
}

export default AlbumPage