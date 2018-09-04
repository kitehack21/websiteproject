import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import albumData from '../assets/albumList.json'
import TopSongs from './TopSongs'


class TopList extends Component {
    state = { albums: []}
    
    componentWillMount(){
        this.setState({albums: albumData})
    }
    renderTopSongs = () =>{
        console.log(this.state)
        return this.state.albums.map(albums =>
        <TopSongs key = {albums.Title} title = {albums.Title} image={albums.Art} artist = {albums.Artist}/>
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
                <div className="col-md-4">
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