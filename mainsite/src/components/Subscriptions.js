import React, {Component} from 'react'
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import {connect} from 'react-redux'

class Subscriptions extends Component{

    onPurchaseClick(){
        console.log(this.props.auth)
        if(this.props.auth.id === ""){
            alert("Please Sign In/ Register an Account first before purchasing")
            this.props.history.push("/SignIn")
        }
        else{
            axios.post(API_URL_1 + "/subscribe",{
                user_id: this.props.auth.id,
                streampass_id: 1
            })
            .then((response)=>{
                console.log(response.data)
                alert("Streamingpass Purchased!")
            })
            .catch((err)=>{
                console.log(err)
                alert("ERROR")
            })
        }
        

    }


    render(){
        return(
            <div>
                <div>
                    <img src="https://i.imgur.com/8C7Fmrl.png" style={{"max-width": "100%"}}/>
                </div>
                <div className="container-fluid animated fadeInUp" style={{"max-width": "1200px"}}>
                    <section className="panel panel-default">
                        <div className="panel-body bg-dark" >
                            <div className="clearfix m-t">
                                    <div className="col-md-3">BASIC STREAMING PASS</div>
                                    <div className="col-md-4">
                                        <div><div className="label bg-success">PC | Mobile</div>   30 DAYS UNLIMITED MUSIC STREAMING</div>
                                        <div><div className="label bg-success">Mobile</div>   ENABLE OFFLINE STORAGE ON MOBILE</div>
                                    </div>
                                    <div className="col-md-2 text-right"> Rp.100,000.-</div>
                                    <div className="col-md-3 text-right"><input className="btn btn-success" type="button" value="Purchase" onClick={()=>this.onPurchaseClick()}/></div>                      
                            </div>
                            </div>
                    </section>
                </div>
                <div className="container-fluid animated fadeInUp" style={{"max-width": "1200px"}}>
                    <section className="panel panel-default">
                        <div className="panel-body bg-dark" >
                            <div className="clearfix m-t">
                                    <div className="col-md-3">DELUXE STREAMING PASS</div>
                                    <div className="col-md-4">
                                        <div><div className="label bg-success">PC | Mobile</div>  30 DAYS UNLIMITED MUSIC STREAMING</div>
                                        <div><div className="label bg-success">Mobile</div>     ENABLE OFFLINE STORAGE ON MOBILE</div>
                                        <div><div className="label bg-success">PC | Mobile</div> DOWNLOAD 30 MP3s</div>
                                    </div>
                                    <div className="col-md-2 text-right"> Rp.250,000.-</div>
                                    <div className="col-md-3 text-right"><input className="btn btn-success" type="button" value="Purchase" onClick={()=>this.onPurchaseClick()}/></div>                      
                            </div>
                            </div>
                    </section>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;
    return {auth};
  }

export default connect(mapStateToProps, {})(Subscriptions);