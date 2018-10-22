import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {OverlayTrigger, Tooltip} from 'react-bootstrap'

class AlbumCard extends Component {
    render(){
        const tooltip = (
            <Tooltip id="tooltip" arrowOffsetLeft>
              <strong>{this.props.title}</strong>
            </Tooltip>
          );
        var albumURL = "/AlbumPage?album=" + this.props.album_id + "&artist=" + this.props.artist_id
        var artistURL = "/ArtistPage?artist=" + this.props.artist_id
        return(
        <div className="col-xs-6 col-sm-3">
            <div className="item">
            <Link to = {albumURL}><div className="pos-rlt">
                <div className="item-overlay opacity r r-2x bg-black">
                <div className="center text-center m-t-n">
                <Link to = {albumURL}><i className="fa fa-play-circle i-2x"></i></Link>
                </div>
                </div>
                <a><img src={this.props.image} alt="" className="r r-2x img-full"/></a>
            </div>
            </Link>
            <div className="padder-v">
                <Link to = {albumURL} className="text-ellipsis" title={this.props.title}>{this.props.title}</Link>
                <Link to = {artistURL} className="text-ellipsis text-xs text-muted" title={this.props.artist}>{this.props.artist}</Link>
            </div>
            </div>
        </div>
        )
    }
}

export default AlbumCard