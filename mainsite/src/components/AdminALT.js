import React, {Component} from 'react'
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import "../css/datatables.css"

class Admin extends Component{

    state= {data: [], listTables: [], table_select: "albums"}

    

    componentWillMount(){
        axios.get(API_URL_1 + "/admin",{
            params:{
                table: this.state.table_select
            }
        })
        .then((response)=>{
            console.log(response.data)
            this.setState({listTables: response.data.listTables, data: response.data.table })
        })
    }
    

    onTableSelect(TABLE_NAME){
        axios.get(API_URL_1 + "/admin",{
            params:{
                table: TABLE_NAME
            }
        })
        .then((response)=>{
            console.log(response.data)
            this.setState({listTables: response.data.listTables, data: response.data.table, table_select: TABLE_NAME })
        })
    }

    renderTableSelect(){
        const arrJSX = this.state.listTables.map((item) => {
            return (<option value={item.TABLE_NAME}>{item.TABLE_NAME}</option>)
          })
      
        return arrJSX
    }

    renderAlbumsTableHead(){
        return(
            <thead>
                <tr>
                <th  style={{width: "2%"}}>ID</th>
                <th  style={{width: "8%"}}>Artist</th>
                <th  style={{width: "20%"}}>Album Name</th>
                <th  style={{width: "10%"}}>Release Date</th>
                <th  style={{width: "20%"}}>Album Art</th>
                <th  style={{width: "35%"}}>Description</th>
                </tr>
            </thead>
        )
    }

    renderAlbumsDataTable(){
        const arrJSX = this.state.data.map((item) => {
           return (
            <tr key={this.id}>
                <td>{item.album_id}</td>
                <td>{item.artist_name   }</td>
                <td>{item.album_name}</td>
                <td>{item.release_date}</td>
                <td><img src={item.album_art} style={{width:"50%"}}/></td>
                <td>{item.description}</td>
            </tr>)
        })
        return arrJSX
    }

    renderArtistsTableHead(){
        return(
            <thead>
                <tr>
                <th style={{width: "2%"}}>ID</th>
                <th style={{width: "8%"}}>Name</th>
                <th style={{width: "20%"}}>Debut</th>
                <th style={{width: "10%"}}>Birthday</th>
                <th style={{width: "20%"}}>Agency</th>
                <th style={{width: "35%"}}>Artist Picture</th>
                </tr>
            </thead>
        )
    }

    renderArtistsDataTable(){
        const arrJSX = this.state.data.map((item) => {
           return (
            <tr key={this.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.debut}</td>
                <td>{item.birthday}</td>
                <td>{item.agency}</td>
                <td><img src={item.picture} style={{width:"30%"}}/></td>
            </tr>)
        })
        return arrJSX
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
                <th style={{width: "15%"}}>Playtime</th>
                <th style={{width: "5%"}}>Title-Track</th>
                <th style={{width: "5%"}}>Ranking</th>
                <th></th>
                </tr>
            </thead>
        )
    }

    renderTracksDataTable(){
        const arrJSX = this.state.data.map((item) => {
           return (
            <tr key={this.id}>
                <td>{item.id}</td>
                <td>{item.album_name}</td>
                <td>{item.artist_name}</td>
                <td>{item.number}</td>
                <td>{item.name}</td>
                <td>{item.playtime}</td>
                <td>{item.title_track}</td>
                <td>{item.ranking}</td>
            </tr>)
        })
        return arrJSX
    }

    renderGenresTableHead(){
        return(
            <thead>
                <tr>
                <th style={{width: "2%"}}>ID</th>
                <th style={{width: "8%"}}>Name</th>
                <th style={{width: "20%"}}>Description</th>
                </tr>
            </thead>
        )
    }

    renderGenresDataTable(){
        const arrJSX = this.state.data.map((item) => {
           return (
            <tr key={this.id}>
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
                    <div>
                        {this.renderAlbumsTableHead()}
                        <tbody>
                        {this.renderAlbumsDataTable()}
                        </tbody>
                    </div>
                )},
                artists: () =>{return(
                    <div>
                        {this.renderArtistsTableHead()}
                        <tbody>
                        {this.renderArtistsDataTable()}
                        </tbody>
                    </div>

                )},
                genres: () =>{return(
                    <div>
                        {this.renderGenresTableHead()}
                        <tbody>
                        {this.renderGenresDataTable()}
                        </tbody>
                    </div>

                )},
                tracks: () =>{return(
                    <div>
                        {this.renderTracksTableHead()}
                        <tbody>
                        {this.renderTracksDataTable()}
                        </tbody>
                    </div>

                )}
            }
        )
    } 

    render(){
        var selection = this.state.table_select

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
                    <select id="tableSelect" ref="tableSelection" onChange={()=>this.onTableSelect(this.refs.tableSelection.value)}>
                        {this.renderTableSelect()}
                    </select>
                    <header className="panel-heading">
                        Data
                        <i className="fa fa-info-sign text-muted"></i> 
                    </header>
                    <div className="table-responsive">
                        <table className="table table-striped m-b-none">
                        {this.renderFullTable()[selection]()}
                        </table>
                    </div>
                    </section>
                </section>
            </section>
        </section>
        )
    }
}

export default Admin