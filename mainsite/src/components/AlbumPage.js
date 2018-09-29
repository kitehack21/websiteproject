import React,{Component} from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import AlbumPageDetails from './AlbumPageDetails'


class AlbumPage extends Component{
    state = {artist: [], album:[], tracks: []}
    
    componentWillMount(){
        const params = new URLSearchParams(this.props.location.search);
        const album_id = params.get('album')
        const artist_id = params.get('artist')
        console.log(album_id)
        console.log(artist_id)

        axios.get(API_URL_1 + '/artists/' + artist_id)
        .then(response => {
            console.log(response);
            this.setState({artist: response.data[0]});
        });

        axios.get(API_URL_1 + '/albumAndTracks/' + album_id)
        .then(response1 => {
            console.log(response1);
            this.setState({album: response1.data.album[0], tracks: response1.data.tracks});
        });
    }

    renderAlbumPage = () => {
        return (<AlbumPageDetails 
            key = {this.state.album.id}
            album_id = {this.state.album.id}
            name = {this.state.artist.name} 
            picture={this.state.artist.picture} 
            album = {this.state.artist.albums} 
            albumtitle = {this.state.album.album_name}
            albumcover = {this.state.album.album_art} 
            release = {this.state.album.release_date}
            genre = {this.state.album.release_date}
            publisher = {this.state.album.release_date}
            description = {this.state.album.description}
            tracks = {this.state.tracks}/>)
    }
    
    render(){
        console.log(this.state.artist);
        return(
            <div className="animated fadeInUp">
               {this.renderAlbumPage()}
            </div>
        )
    }
}

//state below is the Global State
const mapStateToProps = (state) => {
    const select = state.select;
    return {select};
  }
  //export
  export default connect(mapStateToProps, null)(AlbumPage);