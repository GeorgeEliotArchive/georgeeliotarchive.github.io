
/* Ongoing.js - Show "Ongoing" Page
Edited by Libo Sun, Jan 2022 
Auburn University */

import React from "react"
import '../Css/App.css';
import Markdown from 'markdown-to-jsx';



// Relationship d3 page inserted
class Relationshipdev extends React.Component {
    render() {
        return (
            <div className="wrapper" >
                <div class="h_iframe">                                 
                    <iframe  scrolling="yes" title="relationship" 
                        src="https://georgeeliotarchive.github.io/relationship/" />                     
                </div>
            </div>
        )
    }
  }

// render Relationship text(md)
class Relationship extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props)
        this.state = { 
            md: '' ,
            onshow: false,
            text: "Show"}
    }
  
    async componentDidMount() {
        this._isMounted = true;
        
        const file = await import(`../Md/dev_relationship.md`);
        const response = await fetch(file.default);
        const text = await response.text();
        if (this._isMounted){
            this.setState({
                md: text
            })
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
      }

    toggleView= () => {
        this.setState(prevState => {
            return {
                onshow: !prevState.onshow,
                text: prevState.text === "Show" ? "Hide" : "Show"
            }
        })
    }

    ActiveView(){
        if (this.state.onshow) {
          return <Relationshipdev />
        }
        else{
            return null
        }
      }
  
    render() {
        return (
               
            <div className="nowrapper">
                <div className="main_content sub_ongoing ongoing_relationship">
                    <Markdown children={this.state.md} />   
                </div>
                <div className="force_center " >
                    <button className="arrow-icon force_transparent" id="more" onClick={() => this.toggleView()}>
                        <div className={this.state.onshow ? "open" : null} >
                            {/* Show relationship development progress */}
                            <span className="left-bar"></span>
                            <span className="right-bar"></span>
                        </div> 
                        
                    </button> 
                    <div className="arrow_right_text">
                    {this.state.text} Relationship
                    </div>
                </div>
                <div>
                    <br />                
                    {this.ActiveView()}
                </div>
            </div> 
        )
    }
  }


// Chronology page of d3 inserted
class Chronologydev extends React.Component {
    render() {
        return (
            <div className="wrapper" >
                <div className="h_iframe">                                 
                    <iframe  scrolling="yes" title="chronology" 
                        // src="https://georgeeliotarchive.github.io/chronology/calendar" />      
                        src="https://georgeeliotarchive.github.io/Chronology_Search/calendar"     />           
                </div>
            </div>
        )
    }
  }
// Chronology page of d3 2019 version inserted
class Chronologydev2019 extends React.Component {
    render() {
        return (
            <div className="wrapper" >
                <div class="h_iframe">                          
                <iframe scrolling="yes" title="chronology" 
                        src="https://georgeeliotarchive.github.io/chronology/chronology-tree" />         
                </div>
            </div>
        )
    }
  }

//Chronolgy buttons - show or hide
class Chronology extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            onshow: false,
            text: "Show",
            onshow2019:false,
            text2019:"Show",}
    }    

    toggleView = () => {
        this.setState(prevState => {
            return {
                onshow: !prevState.onshow,
                text: prevState.text === "Show" ? "Hide" : "Show"
            }
        })
    }
    toggleView2019 = () => {
        this.setState(prevState => {
            return {
                onshow2019: !prevState.onshow2019,
                text2019: prevState.text2019 === "Show" ? "Hide" : "Show"
            }
        })
    }

    ActiveView(){
        if (this.state.onshow) {
          return <Chronologydev />
        }
        else{
            return null
        }
      }

      ActiveView2019(){
        if (this.state.onshow2019) {
            return <Chronologydev2019 />
          }
          else{
              return null
          }
      }
  
    render() {
        return (
            <div className="main_content ongoing sub_ongoing ongoing_chronology">
                
            <Chronologymd />
            <div className="nowrapper">
                <div className="force_center " >
                    <button className="arrow-icon force_transparent" id="more" onClick={() => this.toggleView()}>
                        <div className={this.state.onshow ? "open" : null} >
                            {/* Show relationship development progress */}
                            <span className="left-bar"></span>
                            <span className="right-bar"></span>
                        </div> 
                        
                    </button> 
                    <div className="arrow_right_text">
                        {this.state.text} Chronology 1
                    </div>
                </div>
                <div>
                    <br />                
                    {this.ActiveView()}
                </div>
            </div>    
            <div className="nowrapper">
                <div className="force_center " >
                    <button className="arrow-icon force_transparent" id="more" onClick={() => this.toggleView2019()}>
                        <div className={this.state.onshow2019 ? "open" : null} >
                        {/* Show relationship development progress */}
                        <span className="left-bar"></span>
                        <span className="right-bar"></span>
                        </div>                        
                    </button>  
                    <div className="arrow_right_text">
                        {this.state.text2019} Chronology 2
                    </div>
                </div>
                <div>
                    <br />                                    
                    {this.ActiveView2019()}
                </div>
            </div>
            </div>
        )
    }
  }


// Chronology text(md) render
class Chronologymd extends React.Component {
    _isMounted = false;
    
    constructor(props) {
        super(props)
        this.state = { md: '' }
    }
  
    async componentDidMount() {
        this._isMounted = true;

        const file = await import(`../Md/dev_chronology.md`);
        const response = await fetch(file.default);
        const text = await response.text();
        if(this._isMounted){
            this.setState({
                md: text
            })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
      }
    
    render() {
        return (

                <Markdown 
                children={this.state.md} />
        )
    }
  }


//Chronogy class intergrated and export default
export default class Ongoing extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props)
        this.state = { 
            md: '' ,
        }
    }
    async componentDidMount() {
        this._isMounted = true;

        const file = await import(`../Md/ongoing.md`);
        const response = await fetch(file.default);
        const text = await response.text();
        if(this._isMounted){
            this.setState({
                md: text
            })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
      }
  
  
    render() {
        return (           
            <div className="main_content">    
                <div>
                    <Markdown children={this.state.md} />   
                </div>
                <br />                     
                <Relationship />
                <Chronology />             
            </div>
        )
    }
  }