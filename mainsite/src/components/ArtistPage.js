import React, {Component} from 'react'
import {Nav, NavItem, Tab, Row, Col} from 'react-bootstrap'
import axios from 'axios'
import AlbumCard from './AlbumCard'
import Tracklist from './Tracklist'
import {API_URL_1, API_URL_ALBUM_COVERS} from '../supports/api-url/apiurl'

class ArtistPage extends Component{
    state = {artist: [], albums:[] , tracks: []}

    componentWillMount(){
        var params = new URLSearchParams(this.props.location.search);
        var id_select = params.get('artist')
        axios.get(API_URL_1 + '/artistinfo/' + id_select)
        .then(response => {
            console.log(response.data);
            this.setState({artist: response.data.artist[0], albums: response.data.albums, tracks: response.data.tracks});
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    renderAlbumList = () =>{
        console.log(this.state.albums)
        return this.state.albums.map(albums =>
        <AlbumCard key = {albums.id} album_id = {albums.id} title = {albums.album_name} 
        image={`${API_URL_ALBUM_COVERS}/${albums.album_art}`} artist = {albums.release_date} artist_id={albums.artist_id}/>
        ) 
    }

    renderTracksHeader(){
        return(
            <li className="list-group-item">
                <div className="pull-right m-l">
                    Download
                </div>
                <div className="clear text-ellipsis text-left">
                    <strong>TRACKS</strong>
                    <span className="pad-left"></span>
                    <span className="text-muted"></span>
                </div>
            </li>
        )
    }

    renderTracklist(){
        return (this.state.tracks.map(songs =>
          <Tracklist key={songs.id} id={songs.id} title={songs.track_name} playtime={songs.playtime} 
          title_track={songs.title_track}/>
        ))
      }


    render(){
        return(
            <div className="container-fluid animated fadeInUp col-md-push-2 col-md-8 padder-bottom">
                <section className="panel panel-default">
                    <div className="panel-body bg-dark dker" >
                        <div className="clearfix text-center m-t">
                            <div className="inline">
                                <div className="thumb-lg">
                                    <img src={this.state.artist.picture} className="r r-2x img-full" alt="..."/>
                                </div>
                                <div className="h4 m-t m-b-xs">{this.state.artist.name}</div>
                                <div className="text-muted">Debut Date: {this.state.artist.debut}</div>
                                <div className="text-muted">Agency: {this.state.artist.agency}</div>
                            </div>                 
                        </div>
                        </div>
                    
                    <Tab.Container defaultActiveKey="tracks">
                    <Row>
                        <Col md={12}>
                            <Nav bsStyle="pills" justified>
                                <NavItem eventKey="tracks" md={4}>Tracks</NavItem>
                                <NavItem eventKey="albums" md={4}>Albums</NavItem>
                            </Nav>
                        </Col>
                        <Row>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="tracks">
                            <Col xs={8} md={8} xsPush={2} mdPush={2}>
                                {this.renderTracksHeader()}
                                {this.renderTracklist()}
                            </Col>
                            </Tab.Pane>
                            <Tab.Pane eventKey="albums">
                            <Col xs={8} md={8} xsPush={2} mdPush={2}>
                                {this.renderAlbumList()}
                            </Col>
                                
                            </Tab.Pane>
                        </Tab.Content>
                        </Row>
                    </Row>
                </Tab.Container>
                </section>
            </div>
        )
    }
}

export default ArtistPage