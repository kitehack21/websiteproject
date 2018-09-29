import React, {Component} from 'react';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'

class ArtistsDataTable extends Component {
    state = {edit: 0}

    onEditClick(){
        this.setState({edit:1})
    }
    onCancelClick(){
        this.setState({edit:0})
    }

    onSaveClick(){
        axios.put(API_URL_1 + "/admin/" + this.props.album_id,
            {
                artist_id: this.refs.editArtist.value,
                album_name: this.refs.editAlbum.value,
                release_date: this.refs.editReleaseDate.value,
                album_art: this.refs.editAlbumArt.value,
                description: this.refs.editDescription.value,
                table: this.props.table
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
            axios.delete(API_URL_1 + "/admin/" + this.props.table + "/" + this.props.id)
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

    renderPage(){
        return(
            [
                <tr className="table-border">
                <td>{this.props.id}</td>
                <td>{this.props.name}</td>
                <td>{this.props.debut}</td>
                <td>{this.props.birthday}</td>
                <td>{this.props.agency}</td>
                <td><img src={this.props.picture} style={{width:"100%"}}/></td>
                <td>
                    <input type="button" className="btn btn-success" style={{width: 70}} onClick={()=>this.onEditClick()} value="Edit"/>
                    <br/>
                    <input type="button" className="btn btn-danger" style={{width: 70}} onClick={()=>this.onDeleteClick()} value="Delete"/>
                </td>
                </tr>,
                <tr className="table-border">
                <td>{this.props.id}</td>
                <td><input type="text" defaultValue={this.props.name}/></td>
                <td><input type="text" defaultValue={this.props.debut}/></td>
                <td><input type="text" defaultValue={this.props.birthday}/></td>
                <td><input type="text" defaultValue={this.props.agency}/></td>
                <td><input type="text" defaultValue={this.props.picture}/></td>
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

export default ArtistsDataTable