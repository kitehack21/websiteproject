import React,{Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {API_URL_1, API_URL_ALBUM_COVERS} from '../supports/api-url/apiurl'
import AlbumPageDetails from './AlbumPageDetails'


class AlbumPage extends Component{
    state = {artist: [], album:[], tracks: [], genres: []}
    
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
            this.setState({album: response1.data.album[0], tracks: response1.data.tracks, genres: response1.data.genres});
        });
    }

    componentWillReceiveProps(newProps){
        const params = new URLSearchParams(newProps.location.search);
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
            this.setState({album: response1.data.album[0], tracks: response1.data.tracks, genres: response1.data.genres});
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
            albumcover = {`${API_URL_ALBUM_COVERS}/${this.state.album.album_art}`} 
            release = {this.state.album.release_date}
            genre = {this.state.album.release_date}
            publisher = {this.state.artist.agency}
            description = {this.state.album.description}
            tracks = {this.state.tracks}
            artist_id = {this.state.artist.id}
            genres = {this.state.genres}
            history = {this.props.history}/>
            )
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