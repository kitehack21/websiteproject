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
        axios.put(API_URL_1 + "/admin/" + this.props.table + "/" + this.props.id,
            {
                name: this.refs.editName.value,
                debut: this.refs.editDebut.value,
                birthday: this.refs.editBirthday.value,
                agency: this.refs.editAgency.value,
                picture: this.refs.editPicture.value
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
                <td><img src={this.props.picture} style={{width:"100%"}} alt={this.props.picture}/></td>
                <td>
                    <input type="button" className="btn btn-success" style={{width: 70}} onClick={()=>this.onEditClick()} value="Edit"/>
                    <br/>
                    <input type="button" className="btn btn-danger" style={{width: 70}} onClick={()=>this.onDeleteClick()} value="Delete"/>
                </td>
                </tr>,
                <tr className="table-border">
                <td>{this.props.id}</td>
                <td><input type="text" ref="editName" defaultValue={this.props.name}/></td>
                <td><input type="text" ref="editDebut" defaultValue={this.props.debut}/></td>
                <td><input type="text" ref="editBirthday" defaultValue={this.props.birthday}/></td>
                <td><input type="text" ref="editAgency" defaultValue={this.props.agency}/></td>
                <td><input type="text" ref="editPicture" defaultValue={this.props.picture}/></td>
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