import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Tracklist from './Tracklist'
import axios from 'axios';
import {API_URL_1, API_URL_ALBUM_COVERS} from '../supports/api-url/apiurl'


class AlbumPageDetails extends Component {
  state = {suggestions: []}

  componentWillMount(){
    axios.get(API_URL_1 + "/suggestions")
    .then((res) => {
      this.setState({suggestions : res.data})
    })
  }
  renderTracklist(){
    return (this.props.tracks.map(songs =>
      <Tracklist key={songs.id} id={songs.id} title={songs.name} playtime={songs.playtime} 
      title_track={songs.title_track} number = {songs.number}/>
    ))
  }

  renderGenres(){
    return (this.props.genres.map(genre => {
      var genreURL = `/browse?genre=${genre.id}`
      return(
        <Link to={genreURL}><span className="badge bg-success">{genre.name}</span></Link>
      )
    }))
  }
  
  renderSuggestions(){
    var arrJSX = this.state.suggestions.map((item) => {
      return(
        <article className="media">
          <div className="pull-left thumb-md m-t-xs" style={{"cursor":"pointer"}} onClick={()=>{this.props.history.push(`/AlbumPage?album=${item.id}&artist=${item.artist_id}`)}}>
            <img src={`${API_URL_ALBUM_COVERS}/${item.album_art}`} alt=""/>
          </div>
          <div className="media-body">                        
            <a href="" className="font-semibold">{item.album_name}</a>
          </div>
        </article>
      )
    })
    return arrJSX
  }
    render(){
      var artistURL = "/ArtistPage?artist=" + this.props.artist_id
        return(
            <section className="vbox">
            <div className="row">
                <div className="col-sm-8 col-sm-push-1">
                  <div className="panel wrapper-lg">
                    <div className="row bg-light dker padder-v" style={{height:"200%"}}>
                      <div className="col-sm-4">
                        <img src={this.props.albumcover} className="img-full m-b album-border" alt=""/>
                      </div>
                      <div className="col-sm-8">
                        <h2 className="m-t-none text-black text-justify">{this.props.albumtitle}</h2>
                        <div className="clearfix m-b-lg">
                          <Link to = {artistURL} className="thumb-sm pull-left m-r" style={{width:"10%"}}>
                            <img src={this.props.picture} className="img-circle" alt=""/>
                          </Link>
                          <div className="clear text-justify">
                            <Link to = {artistURL} className="text-success">{this.props.name}</Link>
                            <small className="block text-muted">12,500,000 followers / 30 following</small>
                          </div>
                        </div>
                        <div className="m-b-lg text-left">
                          <table className="text-muted">
                            <tr>
                              <td>Release</td>
                              <td className="pad-left">{this.props.release}</td>
                            </tr>
                            <tr>
                              <td>Genre</td>
                              <td className="pad-left">{this.renderGenres()}</td>
                            </tr>
                            <tr>
                              <td>Publisher</td>
                              <td className="pad-left">{this.props.publisher}</td>
                            </tr>
                          </table>
                          <br/>
                          <a href="" className="btn btn-success "><i className="fa fa-play-circle"/>  Play</a> <a href="comments" className="btn btn-default">3 Comments</a>
                        </div>
                        <div>
                          Tags: <a href="" className="badge bg-light">K-POP</a> <a href="" className="badge bg-light">Taeyeon</a> <a href="" className="badge bg-light">태연</a>
                        </div>
                      </div>
                    </div>
                    <div className="m-t">
                      <p className="text-justify panel" ><strong>{this.props.albumtitle}</strong> {this.props.description}</p>
                    </div>
                    <h4 className="m-t-lg m-b text-left">Track List</h4>
                    <ul className="list-group list-group-lg">
                      {this.renderTracklist()}
                    </ul>
                  </div>
                </div>
                <div className="col-sm-2 col-sm-push-1">
                  <div className="panel panel-default">
                    <div className="panel-heading">Suggestions</div>
                    <div className="panel-body">
                     {this.renderSuggestions()}
                    </div>
                  </div>
                </div>
              </div>
              </section>
        )
    }
}

export default AlbumPageDetails