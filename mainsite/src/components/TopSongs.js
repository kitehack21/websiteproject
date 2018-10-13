import React, {Component} from 'react';
 
var number = 1;

class TopSongs extends Component {
    render(){
        return(                          
            <a href="#" className="list-group-item clearfix">
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
        )
    }
}


export default TopSongs