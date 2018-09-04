import React, {Component} from 'react';
 
var number = 1;

class TopSongs extends Component {
    addNumber(){
        number++;
    }
    render(){
        return(                          
            <a href="#" className="list-group-item clearfix">
                <span className="pull-right h2 text-muted m-l">{number}</span>
                <span className="pull-left thumb-sm avatar m-r">
                <img src={this.props.image} alt="..."/>
                </span>
                <span className="clear">
                <span className="pull-left">{this.props.title}</span>
                <br/>
                <small className="text-muted clear text-ellipsis pull-left">by {this.props.artist}</small>
                </span>
                {this.addNumber()}
            </a>          
        )
    }
}


export default TopSongs