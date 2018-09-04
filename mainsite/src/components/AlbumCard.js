import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class AlbumCard extends Component {
    render(){
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
                <a href="#" className="text-ellipsis">{this.props.title}</a>
                <Link to = "ArtistPage" className="text-ellipsis text-xs text-muted">{this.props.artist}</Link>
            </div>
            </div>
        </div>
        )
    }
}

export default AlbumCard