import React, {Component} from 'react'
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import {Tabs, Tab, Pagination} from 'react-bootstrap'

class BrowsePage extends Component{
    constructor(props, context) {
        super(props, context);
    
        this.handleSelect = this.handleSelect.bind(this);
    }

    state = { albums: [], key:0}

    componentWillMount(){
        var params = new URLSearchParams(this.props.location.search);
        var genre_id = params.get('genre')
        if(genre_id !== null){
            this.setState({key: parseInt(genre_id)})
        }
        axios.get(API_URL_1 + "/albums/browse",{
            params:{
            genre : genre_id
        }})
        .then((response)=>{
            console.log(response)
            this.setState({albums: response.data.albums})
        })
        
    }

    componentWillReceiveProps(NewProps){
        var params = new URLSearchParams(NewProps.location.search);
        var genre_id = params.get('genre')
        console.log(genre_id)
        axios.get(API_URL_1 + "/albums/browse",{
            params:{
            genre : genre_id
        }})
        .then((response)=>{
            console.log(response)
            this.setState({albums: response.data.albums})
        })
    }
    
    handleSelect(key) {
        this.setState({ key });
        if(key === 0){
            this.props.history.push(`/browse`)
        }
        else{
            this.props.history.push(`/browse?genre=${key}`)
        }
    }
    
    renderAlbumList = () =>{
        if(this.state.albums.length === 0){
            return(<div>No results found</div>)
        }
        else{
            return this.state.albums.map(albums =>
                <div>
                <section className="col-xs-12 col-sm-6 col-md-4 bg-info dker list-group-item clearfix" style={{"padding":0}}>
                    <aside className="col-xs-6 col-sm-6 col-md-6 bg-info dk padder-v"><img src={albums.album_art} className="img-full" alt={albums.album_art}/></aside>
                    <section className="col-xs-6 col-sm-6 col-md-6">
                        <div className="col-md-12 text-ellipsis text-lg padding-v m-t-md" title={albums.album_name} >{albums.album_name}</div>
                        <div className="col-md-12 text-muted text-sm padding-v text-ellipsis" title={albums.artist_name}>{albums.artist_name}</div>
                        <div className="col-md-12 m-t-lg">{albums.release_date} | {albums.tracksAmount} Tracks</div>
                        <div className="col-md-12 padding-v" style={{"margin-top":"60px"}}>
                            <a href="" className="btn btn-success " title="Play Album"><i className="fa fa-play-circle"/></a>
                            <a href="" className="btn btn-info" title="Buy Album"><i className="fa fa-shopping-cart"/></a>
                            <a href="" className="btn btn-danger " title="Like"><i className="fa  fa-heart"/></a>
                        </div>
                    </section>
                </section>
                </div>
            ) 
        } 
    }

    render(){

        return(
         <section id="content ">
          <section className="hbox stretch">
            <section className ="vbox">
              <div className="row">
                <section className="scrollable padder-lg w-f-md " id="bjax-target" >
                    <div>
                        <div className="col-md-12 col-xs-12">
                            <h3 className="font-thin" align="left">Latest Releases</h3>
                            <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
                                <Tab eventKey={0} title="All Albums" >
                                <section id="content" className="animated fadeInUp">
                                    {this.renderAlbumList()}
                                </section>
                                <Pagination>
                                    <Pagination.First />
                                    <Pagination.Prev />
                                    <Pagination.Item>{1}</Pagination.Item>
                                    <Pagination.Ellipsis />
                                    <Pagination.Item>{10}</Pagination.Item>
                                    <Pagination.Item>{11}</Pagination.Item>
                                    <Pagination.Item active>{12}</Pagination.Item>
                                    <Pagination.Item>{13}</Pagination.Item>
                                    <Pagination.Item>{14}</Pagination.Item>
                                    <Pagination.Ellipsis />
                                    <Pagination.Item>{20}</Pagination.Item>
                                    <Pagination.Next />
                                    <Pagination.Last />
                                </Pagination>
                                </Tab>
                                <Tab eventKey={1} title="R&B">
                                <section id="content" className="animated fadeInUp">
                                    {this.renderAlbumList()}
                                </section>
                                </Tab>
                                <Tab eventKey={2} title="Dance">
                                <section id="content" className="animated fadeInUp">
                                    {this.renderAlbumList()}
                                </section>
                                </Tab>
                                <Tab eventKey={3} title="Ballad">
                                <section id="content" className="animated fadeInUp">
                                    {this.renderAlbumList()}
                                </section>
                                </Tab>
                                <Tab eventKey={4} title="Hip-hop">
                                <section id="content" className="animated fadeInUp">
                                    {this.renderAlbumList()}
                                </section>
                                </Tab>
                                <Tab eventKey={5} title="Korean">
                                <section id="content" className="animated fadeInUp">
                                    {this.renderAlbumList()}
                                </section>
                                </Tab>
                                <Tab eventKey={6} title="Japanese">
                                <section id="content" className="animated fadeInUp">
                                    {this.renderAlbumList()}
                                </section>
                                </Tab>
                                <Tab eventKey={7} title="Pop">
                                <section id="content" className="animated fadeInUp">
                                    {this.renderAlbumList()}
                                </section>
                                </Tab>
                                <Tab eventKey={8} title="Rock">
                                <section id="content" className="animated fadeInUp">
                                    {this.renderAlbumList()}
                                </section>
                                </Tab>
                                <Tab eventKey={9} title="Folk">
                                <section id="content" className="animated fadeInUp">
                                    {this.renderAlbumList()}
                                </section>
                                </Tab>
                            </Tabs>                            
                        </div>
                    </div>
                </section>
              </div>
            </section>
          </section>
        </section>
        )
    }
}

export default BrowsePage