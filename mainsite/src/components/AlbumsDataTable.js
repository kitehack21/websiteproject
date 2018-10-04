import React, {Component} from 'react';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'

class AlbumsDataTable extends Component {
    state = {edit: 0}

    onEditClick(){
        this.setState({edit:1})
    }
    onCancelClick(){
        this.setState({edit:0})
    }

    onSaveClick(){
        axios.put(API_URL_1 + "/admin/" + this.props.table + "/" + this.props.album_id,
            {
                artist_id: this.refs.editArtist.value,
                album_name: this.refs.editAlbum.value,
                release_date: this.refs.editReleaseDate.value,
                album_art: this.refs.editAlbumArt.value,
                description: this.refs.editDescription.value
            }
        )
        .then((res)=>{
            console.log(res)
            alert("SUCCESS")
            this.props.refresh()
            this.setState({edit:0})
        })
        .catch((err)=>{
            console.log(err)
            alert("ERROR")
        })
    }

    onDeleteClick(){
        if(window.confirm("Are you sure you want to delete entry? This action cannot be reversed")){
            axios.delete(API_URL_1 + "/admin/" + this.props.table + "/" + this.props.album_id)
            .then((res)=>{
                console.log(res)
                alert("DELETE SUCCESS")
                this.props.refresh()
                this.setState({edit:0})
            })
            .catch((err)=>{
                console.log(err)
                alert("ERROR")
            })
        }
    }

    renderArtistSelect(){
        var arrJSX = this.props.listArtists.map((item)=>{
            if(this.props.artist_name === item.name){
                return(
                    <option value={item.id} id={item.id} selected="selected">{item.name}</option>
                    )
            }
            else{
                return(
                    <option value={item.id} id={item.id}>{item.name}</option>
                    )
            }
            
        })
        return arrJSX
    }

    renderPage(){
        return(
            [
                <tr className="table-border">
                <td>{this.props.album_id}</td>
                <td>{this.props.artist_name }</td>
                <td>{this.props.album_name}</td>
                <td>{this.props.release_date}</td>
                <td><img src={this.props.album_art} style={{width:"100%"}} alt={this.props.album_art}/></td>
                <td>{this.props.description}</td>
                <td>
                    <input type="button" className="btn btn-success" style={{width: 70}} onClick={()=>this.onEditClick()} value="Edit"/>
                    <br/>
                    <input type="button" className="btn btn-danger" style={{width: 70}} onClick={()=>this.onDeleteClick()} value="Delete"/>
                </td>
                </tr>,
                <tr className="table-border">
                <td>{this.props.album_id}</td>
                <td>
                    <select ref="editArtist" id="editArtist">
                    {this.renderArtistSelect()}
                    </select>
                </td>
                <td><input type="text" id="editAlbum" ref="editAlbum" defaultValue={this.props.album_name} style={{width: 220}}/></td>
                <td><input type="text" id="editReleaseDate" ref="editReleaseDate" defaultValue={this.props.release_date} style={{width: 80}}/></td>
                <td><input type="text" id="editAlbumArt" ref="editAlbumArt" defaultValue={this.props.album_art}/></td>
                <td><textarea id="editDescription" ref="editDescription" defaultValue={this.props.description} style={{resize:"none"}} rows= '4' cols= '80'/></td>
                <td>
                    <input type="button" className="btn btn-primary" style={{width: 70}} onClick={()=>this.onSaveClick()} value="Save"/>
                    <br/>
                    <input type="button" className="btn btn-warning" style={{width: 70}} onClick={()=>this.onCancelClick()} value="Cancel"/>
                </td>
                </tr>
            ]
        )
    }
  
    render(){
        return(
            this.renderPage()[this.state.edit]
        )
    }
}

export default AlbumsDataTable