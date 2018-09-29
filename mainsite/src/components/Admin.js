import React, {Component} from 'react'
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import AlbumsDataTable from './AlbumsDataTable'
import ArtistsDataTable from './ArtistsDataTable'
import TracksDataTable from './TracksDataTable'
import "../css/datatables.css"

class Admin extends Component{

    state= {data: [], listTables: [], table_select: "albums", listArtists: []}
 

    componentWillMount(){
        this.refreshData()
    }

    refreshData(){
        var params = new URLSearchParams(this.props.location.search);
        var table_select = params.get('table')
        axios.get(API_URL_1 + "/admin",{
            params:{
                table: table_select
            }
        })
        .then((response)=>{
            console.log(response.data)
            this.setState({listArtists: response.data.listArtists, data: response.data.table })
        })
    }
    

    onTableSelect(TABLE_NAME){
        var url = "/Admin?table=" + TABLE_NAME
        axios.get(API_URL_1 + "/admin",{
            params:{
                table: TABLE_NAME
            }
        })
        .then((response)=>{
            console.log(response.data)
            this.setState({listTables: response.data.listTables, data: response.data.table })
        })
        this.props.history.push(url)
    }



    renderTableSelect(){
        var params = new URLSearchParams(this.props.location.search);
        var table_select = params.get('table')
        function activeSelect(){
            return(
                {
                    albums: ()=>{return ["selected", "", "" ,""]},
                    artists: ()=>{return ["", "selected", "" ,""]},
                    tracks: ()=>{return ["", "" , "selected", ""]},
                    genres: ()=>{return ["", "" ,"", "selected"]}
                }
            )
        }
        return(
            <select  id="tableSelect" ref="tableSelection" onChange={()=>this.onTableSelect(this.refs.tableSelection.value)}>
                <option value="albums" selected = {activeSelect()[table_select]()[0]}>Albums</option>
                <option value="artists" selected = {activeSelect()[table_select]()[1]}>Artists</option>
                <option value="tracks" selected = {activeSelect()[table_select]()[2]}>Tracks</option>
                <option value="genres" selected = {activeSelect()[table_select]()[3]}>Genres</option>
            </select>
        )
    }

    renderAlbumsTableHead(){
        return(
            <thead>
                <tr>
                <th  style={{width: "2%"}}>ID</th>
                <th  style={{width: "12%"}}>Artist</th>
                <th  style={{width: "20%"}}>Album Name</th>
                <th  style={{width: "8%"}}>Release Date</th>
                <th  style={{width: "10%"}}>Album Art</th>
                <th  style={{width: "40%"}}>Description</th>
                <th  style={{width: "7%"}}>Actions</th>
                </tr>
            </thead>
        )
    }

    renderAlbumsDataTable(){
        var params = new URLSearchParams(this.props.location.search);
        var table_select = params.get('table')
        return this.state.data.map((item) =>
        <AlbumsDataTable key={item.album_id} table={table_select} listArtists={this.state.listArtists} artist_name={item.artist_name} album_id={item.album_id} 
        album_name={item.album_name} release_date={item.release_date} album_art={item.album_art} description={item.description} refresh={()=>this.refreshData()}/>)
    }

    renderArtistsTableHead(){
        return(
            <thead>
                <tr>
                <th style={{width: "2%"}}>ID</th>
                <th style={{width: "8%"}}>Name</th>
                <th style={{width: "10%"}}>Debut</th>
                <th style={{width: "10%"}}>Birthday</th>
                <th style={{width: "15%"}}>Agency</th>
                <th style={{width: "10%"}}>Artist Picture</th>
                <th style={{width: "20%"}}>Actions</th>
                </tr>
            </thead>
        )
    }

    renderArtistsDataTable(){
        var params = new URLSearchParams(this.props.location.search);
        var table_select = params.get('table')
        return this.state.data.map((item) =>
        <ArtistsDataTable key={item.id} id={item.id} table={table_select} name={item.name} debut={item.debut} 
        birthday={item.birthday} agency={item.agency} picture={item.picture} refresh={()=>this.refreshData()}/>)
    }

    renderTracksTableHead(){
        return(
            <thead>
                <tr>
                <th style={{width: "2%"}}>ID</th>
                <th style={{width: "10%"}}>Album</th>
                <th style={{width: "10%"}}>Artist</th>
                <th style={{width: "5%"}}>Track No.</th>
                <th style={{width: "20%"}}>Track Name</th>
                <th style={{width: "5%"}}>Playtime</th>
                <th style={{width: "5%"}}>Title-Track</th>
                <th style={{width: "5%"}}>Ranking</th>
                <th style={{width: "20%"}}>Actions</th>
                </tr>
            </thead>
        )
    }

    renderTracksDataTable(){
        var params = new URLSearchParams(this.props.location.search);
        var table_select = params.get('table')
        return this.state.data.map((item) =>
        <TracksDataTable key={item.id} id={item.id} table={table_select} listArtists={this.state.listArtists} album_name={item.album_name} artist_name={item.artist_name} 
        number={item.number} name={item.name} playtime={item.playtime} title_track={item.title_track} ranking={item.ranking} refresh={()=>this.refreshData()}/>)
    }

    renderGenresTableHead(){
        return(
            <thead>
                <tr>
                <th style={{width: "2%"}}>ID</th>
                <th style={{width: "8%"}}>Name</th>
                <th style={{width: "20%"}}>Description</th>
                <th style={{width: "20%"}}>Actions</th>
                </tr>
            </thead>
        )
    }

    renderGenresDataTable(){
        const arrJSX = this.state.data.map((item) => {
           return (
            <tr id={this.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
            </tr>)
        })
        return arrJSX
    }
    
    renderFullTable(){
        return(
            {
                albums: () => {return (
                    <table className="table table-striped m-b-none">
                        {this.renderAlbumsTableHead()}
                        <tbody>
                        {this.renderAlbumsDataTable()}
                        </tbody>
                    </table>
                )},
                artists: () =>{return(
                    <table className="table table-striped m-b-none">
                        {this.renderArtistsTableHead()}
                        <tbody>
                        {this.renderArtistsDataTable()}
                        </tbody>
                    </table>

                )},
                genres: () =>{return(
                    <table className="table table-striped m-b-none">
                        {this.renderGenresTableHead()}
                        <tbody>
                        {this.renderGenresDataTable()}
                        </tbody>
                    </table>

                )},
                tracks: () =>{return(
                    <table className="table table-striped m-b-none">
                        {this.renderTracksTableHead()}
                        <tbody>
                        {this.renderTracksDataTable()}
                        </tbody>
                    </table>

                )}
            }
        )
    } 

    render(){
        var params = new URLSearchParams(this.props.location.search);
        var table_select = params.get('table')

        return(
        <section id="content">
            <section className="vbox">
                <section className="scrollable padder">
                    <div className="m-b-md">
                    <h3 className="m-b-none">Admin Dashboard</h3>
                    </div>
                    <section className="panel panel-default">
                    Select Datatable:
                    <br/>
                    {/* <select id="tableSelect" ref="tableSelection" onChange={()=>this.onTableSelect(this.refs.tableSelection.value)}>
                        {this.renderTableSelect()}
                    </select> */}
                    {this.renderTableSelect()}
                    <header className="panel-heading">
                        Data
                        <i className="fa fa-info-sign text-muted"></i> 
                    </header>
                    <div className="table-responsive">
                        {this.renderFullTable()[table_select]()}
                    </div>
                    </section>
                </section>
            </section>
        </section>
        )
    }
}

export default Admin