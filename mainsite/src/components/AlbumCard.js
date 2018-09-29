import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class AlbumCard extends Component {
    render(){
        var albumURL = "/AlbumPage?album=" + this.props.album_id + "&artist=" + this.props.artist_id
        return(
        <div className="col-xs-6 col-sm-3">
            <div className="item">
            <div className="pos-rlt">
                <div className="item-overlay opacity r r-2x bg-black">
                <div className="center text-center m-t-n">
                    <a href="#"><i className="fa fa-play-circle i-2x"></i></a>
                </div>
                </div>
                <a href="#"><img src={this.props.image} alt="" className="r r-2x img-full"/></a>
            </div>
            <div className="padder-v">
                <Link to = {albumURL} className="text-ellipsis">{this.props.title}</Link>
                <Link to = "ArtistPage" className="text-ellipsis text-xs text-muted">{this.props.artist}</Link>
            </div>
            </div>
        </div>
        )
    }
}

export default AlbumCard