import React, {Component} from 'react'
import {Nav, NavItem, Tab, Row, Col} from 'react-bootstrap'
import axios from 'axios'
import AlbumList from './AlbumList'
import testimage from '../images/ty-i.jpg'
import {API_URL_1} from '../supports/api-url/apiurl'

class ArtistPage extends Component{
    state = {artist: []}

    componentWillMount(){
        axios.get(API_URL_1 + '/artists/' + 1)
        .then(response => {
            console.log(response);
            this.setState({artist: response.data});
        });
    }


    render(){
        return(
            <div className="container-fluid animated fadeInUp">
                <section className="panel panel-default">
                    <div className="panel-body bg-dark" >
                        <div className="clearfix text-center m-t">
                            <div className="inline">
                                <div className="thumb-lg">
                                    <img src={this.state.artist.artistpicture} className="img-circle" alt="..."/>
                                </div>
                                <div className="h4 m-t m-b-xs">{this.state.artist.artistname}</div>
                                <small className="text-muted m-b">Musical Artist</small>
                            </div>                      
                        </div>
                        </div>
                    
                    <Tab.Container id="left-tabs-example" defaultActiveKey="home">
                    <Row>
                        <Col md={12}>
                            <Nav bsStyle="pills" justified >
                                <NavItem eventKey="home" md={4}>Home</NavItem>
                                <NavItem eventKey="songs" md={4}>Songs</NavItem>
                                <NavItem eventKey="albums" md={4}>Albums</NavItem>
                            </Nav>
                        </Col>
                        <Row>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="home">
                                HOME
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="songs">
                            </Tab.Pane>
                            <Tab.Pane eventKey="albums">
                            <Col md={12} mdPush={2}>
                                <AlbumList />
                            </Col>
                                
                            </Tab.Pane>
                        </Tab.Content>
                        </Row>
                    </Row>
                </Tab.Container>
                </section>
            </div>
        )
    }
}

export default ArtistPage