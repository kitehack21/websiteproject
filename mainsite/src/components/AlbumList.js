import React, {Component} from 'react';
import albumData from '../assets/albumList.json'
import AlbumCard from './AlbumCard'


class AlbumList extends Component {
    state = { albums: []}
    
    componentWillMount(){
        this.setState({albums: albumData})
    }
    
    renderAlbumList = () =>{
        console.log(this.state)
        return this.state.albums.map(albums =>
        <AlbumCard key = {albums.Title} title = {albums.Title} image={albums.Art} artist = {albums.Artist}/>
        )   
    }

    render(){
        console.log(this.state)
      
        return(
            <div>
                <div className="col-md-8">
                    <h3 className="font-thin" align="left">New Releases</h3>
                <section id="content">
                {this.renderAlbumList()}
                </section>
                </div>
            </div>
        );
    }
}

export default AlbumList