import React, {Component} from 'react'


class Tracks extends Component {

    renderTrackStatus(){
        console.log()
        if(this.props.title_track){
            return <span className="badge bg-success" style={{margin: 5, color: "#ffffff"}}>Title-track</span>
        }
        if(this.props.status === "Hot"){
            return <span className="badge bg-danger" style={{margin: 5, color: "#ffffff"}}>Hot</span>
        }
    }

    render(){
        return(
            <li className="list-group-item">
                <div className="pull-right m-l">
                    <a href="#" className="m-r-sm"><i className="icon-cloud-download" data-toggle="tooltip" data-placement="top" title="Download"></i></a>
                    <a href="#" className="m-r-sm"><i className="icon-plus" data-toggle="tooltip" data-placement="top" title="Add to playlist" ></i></a>
                    <a href="#" className="pull-right active" data-toggle="className" data-placement="top" title="Favorite" >
                        <i className="fa fa-heart-o text-active"   ></i>
                        <i className="fa fa-heart text text-danger"  title="Favorited"></i>
                    </a> 
                </div>
                <a href="#" className="jp-play-me m-r-sm pull-left">
                    <i className="icon-control-play text"></i>
                    <i className="icon-control-pause text-active"></i>
                </a>
                <div className="clear text-ellipsis text-left">
                    <strong>{this.props.number}</strong>
                    <span className="pad-left">{this.props.title}</span>
                    <span className="text-muted">
                    {this.renderTrackStatus()}-- {this.props.playtime}</span>
                </div>
            </li>
        )
    }
}

export default Tracks