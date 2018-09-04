import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Tracklist from './Tracklist'


class AlbumPageDetails extends Component {

  renderTracklist(){
    return this.props.albums[0].songs.map(songs =>
      <Tracklist key={songs.id} id={songs.id} title={songs.title} runtime={songs.runtime} status={songs.status}/>
    )
  }

    render(){
        return(
            <section className="vbox">
            <div className="row">
                <div className="col-sm-8 col-sm-push-1">
                  <div className="panel wrapper-lg">
                    <div className="row">
                      <div className="col-sm-4">
                        <img src={this.props.albumcover} className="img-full m-b album-border"/>
                      </div>
                      <div className="col-sm-8">
                        <h2 className="m-t-none text-black text-justify">{this.props.albumtitle}</h2>
                        <div className="clearfix m-b-lg">
                          <a href="#" className="thumb-sm pull-left m-r">
                            <img src={this.props.picture} className="img-circle"/>
                          </a>
                          <div className="clear text-justify">
                            <a href="#" className="text-info">{this.props.name}</a>
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
                              <td className="pad-left">{this.props.genre}</td>
                            </tr>
                            <tr>
                              <td>Publisher</td>
                              <td className="pad-left">{this.props.publisher}</td>
                            </tr>
                          </table>
                          <br/>
                          <a href="#" className="btn btn-info ">Play</a> <a href="#comments" className="btn btn-default">3 Comments</a>
                        </div>
                        <div>
                          Tags: <a href="#" className="badge bg-light">K-POP</a> <a href="#" className="badge bg-light">Taeyeon</a> <a href="#" className="badge bg-light">태연</a>
                        </div>
                      </div>
                    </div>
                    <div className="m-t">
                      <p className="text-justify" ><strong>{this.props.albumtitle}</strong> is the debut extended play by South Korean singer Taeyeon, released on October 7, 2015 by S.M. Entertainment. The EP was recorded at S.M. Studios in Seoul, South Korea and was produced by Lee Soo-man.</p>
                    </div>
                    <h4 className="m-t-lg m-b text-left">Track List</h4>
                    <ul className="list-group list-group-lg">
                      {this.renderTracklist()}
                    </ul>
                    <h4 className="m-t-lg m-b" id="comments">3 Comments</h4>
                    <section className="comment-list block">
                      <article id="comment-id-1" className="comment-item">
                        <a className="pull-left thumb-sm">
                          <img src="images/a0.png" className="img-circle"/>
                        </a>
                        <section className="comment-body m-b">
                          <header>
                            <a href="#"><strong>John smith</strong></a>
                            <label className="label bg-info m-l-xs">Editor</label> 
                            <span className="text-muted text-xs block m-t-xs">
                              24 minutes ago
                            </span>
                          </header>
                          <div className="m-t-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id neque quam. Aliquam sollicitudin venenatis ipsum ac feugiat. Vestibulum.</div>
                        </section>
                      </article>
                      
                      <article id="comment-id-2" className="comment-item comment-reply">
                        <a className="pull-left thumb-sm">
                          <img src="images/a1.png" className="img-circle"/>
                        </a>
                        <section className="comment-body m-b">
                          <header>
                            <a href="#"><strong>John smith</strong></a>
                            <label className="label bg-dark m-l-xs">Admin</label> 
                            <span className="text-muted text-xs block m-t-xs">
                              26 minutes ago
                            </span>
                          </header>
                          <div className="m-t-sm">Lorem ipsum dolor sit amet, consecteter adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.</div>
                        </section>
                      </article>
                      
                      <article id="comment-id-2" className="comment-item">
                        <a className="pull-left thumb-sm">
                          <img src="images/a2.png" className="img-circle"/>
                        </a>
                        <section className="comment-body m-b">
                          <header>
                            <a href="#"><strong>John smith</strong></a>
                            <label className="label bg-dark m-l-xs">Admin</label> 
                            <span className="text-muted text-xs block m-t-xs">
                              26 minutes ago
                            </span>
                          </header>
                          <blockquote className="m-t">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                            <small>Someone famous in <cite title="Source Title">Source Title</cite></small>
                          </blockquote>
                          <div className="m-t-sm">Lorem ipsum dolor sit amet, consecteter adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.</div>
                        </section>
                      </article>
                    </section>
                    <h4 className="m-t-lg m-b">Leave a comment</h4>
                    <form>
                      <div className="form-group">
                        <label>Comment</label>
                        <textarea className="form-control" rows="5" placeholder="Type your comment"></textarea>
                      </div>
                      <div className="form-group">
                        <button type="submit" className="btn btn-success">Submit comment</button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-sm-2 col-sm-push-1">
                  <div className="panel panel-default">
                    <div className="panel-heading">Suggestions</div>
                    <div className="panel-body">
                      <article className="media">
                        <a href="#" className="pull-left thumb-md m-t-xs">
                          <img src="images/m18.jpg"/>
                        </a>
                        <div className="media-body">                        
                          <a href="#" className="font-semibold">Bootstrap 3: What you need to know</a>
                          <div className="text-xs block m-t-xs"><a href="#">Travel</a> 2 minutes ago</div>
                        </div>
                      </article>
                      <article className="media">
                        <a href="#" className="pull-left thumb-md m-t-xs">
                          <img src="images/m19.jpg"/>
                        </a>
                        <div className="media-body">                        
                          <a href="#" className="font-semibold">Lorem ipsum dolor sit amet it.</a>
                          <div className="text-xs block m-t-xs"><a href="#">Design</a> 2 hours ago</div>
                        </div>
                      </article>
                      <article className="media">
                        <a href="#" className="pull-left thumb-md m-t-xs">
                          <img src="images/m20.jpg"/>
                        </a>
                        <div className="media-body">                        
                          <a href="#" className="font-semibold">Sed diam nonummy tincidunt ut laoreet</a>
                          <div className="text-xs block m-t-xs"><a href="#">MFC</a> 1 week ago</div>
                        </div>
                      </article>
                      <article className="media">
                        <a href="#" className="pull-left thumb-md m-t-xs">
                          <img src="images/m21.jpg"/>
                        </a>
                        <div className="media-body">                        
                          <a href="#" className="font-semibold">Lonummy nibh euismod sed laoreet</a>
                          <div className="text-xs block m-t-xs"><a href="#">MFC</a> 1 week ago</div>
                        </div>
                      </article>
                      <article className="media">
                        <a href="#" className="pull-left thumb-md m-t-xs">
                          <img src="images/m22.jpg"/>
                        </a>
                        <div className="media-body">                        
                          <a href="#" className="font-semibold">Mibh euismod tincidunt ut laoreet</a>
                          <div className="text-xs block m-t-xs"><a href="#">MFC</a> 1 week ago</div>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
              </section>
        )
    }
}

export default AlbumPageDetails