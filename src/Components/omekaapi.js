/* omekaapi.js - manually input the address for Omeka Api.
Edited by Libo Sun, April 2022 
Auburn University */

import React from "react";
import { TextField } from '@mui/material';
import FetchCollectionList from "./collections/fetchcollectionlist";

import '../Css/App.css';

export default class Omekaapi extends React.Component {
    _isMounted = false;
    
    constructor(props) {
        super(props)
        this.state = { 
            link: "https://georgeeliotarchive.org/api/collections",
            pdfHeader: "GEORGE ELIOT ARCHIVE",
            pdfFooter: "Sharing is permitted for non-commercial purposes with attribution to this database, the George Eliot Archive, edited by Beverley Park Rilett.",
            onshow: false,
            text: "Show"}
        this.handleChange = this.handleChange.bind(this);
        this.handleChangepdfHeader = this.handleChangepdfHeader.bind(this);
        this.handleChangepdfFooter = this.handleChangepdfFooter.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({link: event.target.value});
      }
    
    handleSubmit(event) {
        event.preventDefault();
    }

    handleChangepdfHeader(event) {
        this.setState({pdfHeader: event.target.value});
      }

      handleChangepdfFooter(event) {
        this.setState({pdfFooter: event.target.value});
      }

    
    //   componentDidMount() {
    //     this._isMounted = true;
        
    //     if (this._isMounted){
    //         this.setState({
    //             onshow: !this.state.onshow
    //         })
    //     }
    // }
    // componentWillUnmount() {
    //     this._isMounted = false;
    //   }
    toggleView= () => {
        this.setState(prevState => {
            return {
                onshow: !prevState.onshow,
                text: prevState.text === "Show" ? "Hide" : "Show"
        }})
    }
    
    activeViewlist(){
        if (this.state.onshow) {
            return ( 
            <div>
                <FetchCollectionList dataFromParent={this.state.link} pdfHeader={this.state.pdfHeader} pdfFooter={this.state.pdfFooter} /> 
            </div> )
            }
        else {return null}
    }


    render() {
        return (
           
            <div className="container" >
                <h1 className="background_inherd">Api parser for Omeka</h1>

                <div className="main_content">  
                    <span className="font-sans font-bold text-red-400">Current input:  </span> 
                    <span className="font-serif"> {this.state.link} </span>                    
                </div>

                <form onSubmit={this.handleSubmit} className="mt-2">       
                        <TextField fullWidth id="outlined-basic" label="Input Omeka Website Address" variant="outlined"  
                            value={this.state.link}
                            onChange={this.handleChange}
                        />             
                </form>

                <div className="mt-2">
                 <button className="w-52 bg-cyan-300 border-2 border-gray-400 px-0.5 rounded"  onClick={() => this.toggleView()}> 
                       {this.state.text} Collection List. </button>
                </div>

                <div className='container pl-4 mt-5'>
                <li >                      
                    <span className="font-sans font-bold">Current pdf Header:  </span> 
                    <span className="font-serif"> {this.state.pdfHeader} </span>
                    <form onSubmit={this.handleSubmit} className="mt-2">      
                    <TextField fullWidth id="outlined-basic" label="Input New Header for pdf" variant="outlined" 
                        value={this.state.pdfHeader}
                        onChange={this.handleChangepdfHeader}
                        
                    />   
                    </form>          
                </li>
                <li className="mt-5">                      
                    <span className="font-sans font-bold">Current pdf Footer:  </span> 
                    <span className="font-serif text-xs"> {this.state.pdfFooter} </span>
                    <form onSubmit={this.handleSubmit} className="mt-2">
                    <TextField fullWidth id="outlined-basic" label="Input New Footer for pdf" variant="outlined" 
                        value={this.state.pdfFooter}
                        onChange={this.handleChangepdfFooter}
                    />       
                    </form>      
                </li>

                </div> 

                <div>
                {this.activeViewlist()}
                </div>
            </div>
            
        )
    }
}

