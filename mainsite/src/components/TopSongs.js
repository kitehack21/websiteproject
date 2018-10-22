import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class TopSongs extends Component {
    render(){
        var albumURL = "/AlbumPage?album=" + this.props.album_id + "&artist=" + this.props.artist_id

        return(
            <Link to={albumURL}>                      
            <a className="list-group-item clearfix">
                <span className="pull-right h2 text-muted m-l">{this.props.ranking}</span>
                <span className="pull-left thumb-sm m-r">
                <img src={this.props.album_art} alt={this.props.album_art} />
                </span>
                <span className="clear">
                <span className="pull-left">{this.props.track_name}</span>
                <br/>
                <small className="text-muted clear text-ellipsis pull-left">{this.props.album_name}</small>
                <br/>
                <small className="text-muted clear text-ellipsis pull-left">by {this.props.artist_name}</small>
                </span>
            </a>
            </Link>           
        )
    }
}


export default TopSongs