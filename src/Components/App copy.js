
/* APP.js - Main Page
Edited by Libo Sun, Jan 2022 
Auburn University */
import React from "react"
import ReactDOM from "react-dom"

import Togglebk from "./toggletheme";


import '../Css/App.css';
// import Particle from './particles';
// import Setupenv from "./setupenv";
import Ongoing  from "./ongoing";
import Knowledge from "./knowledge";
import Footer from './footer';
import Fetchapi from "./fetchapi";
// import Blog from "./blog/mediumblog";
import Blog from "./blog/mediumblog";
import { BrowserRouter } from "react-router-dom";



// Default App class, export
class App extends React.Component {

    render() {

        return (
          <div>
            <Togglebk />

            <div>                
                <Greeting />
                
                <Showmain />
                
                <Footer />
            </div>
          
          </div>
            
        )
    }
}


// Getting text
class Greeting extends React.Component {

  state = {
    timeOfDay: this.setTime(),
    showTime: false
  }

  setTime(){
  
    var date = new Date()
    var hours = date.getHours()
    var t = ""
    // console.log(date.getHours())
    if (hours < 12) {  t = "Morning" }
    else if (hours >= 12 && hours < 17) { t = "Afternoon"}
    else {t = "Evening"}

    return t
  }

  toggleTime = () => {
    this.setState(prevState => {
        return {
            showTime: prevState.showTime === true ? false : true
        }
    })
}

  render() {
    const Text = () => <div>{Date().toLocaleString()}</div>;
    return (      
      <div className="lmarging01" >
        <header>Good {this.state.timeOfDay} to you, this is the development of <em>George Eliot Digital Projects!</em></header> 
        <div>
          <h2 className = 'button_main button_border' id="more" onClick={this.toggleTime}> {this.state.showTime ? "Hide time" : "What Time is it now?" }</h2>          
          <h2 className="timedate">{this.state.showTime ? <Text /> : null} </h2>
        </div>
      </div>
    )
  }
}


// particles background 
//class Background extends React.Component {
//    render() {
//      return <div id="particles-js"> <Particle /> </div>
//    }
//}



// Show the Main content in the page
class Showmain extends React.Component {
    state = {
        active: 2
      }

    toggleView= (selection) => {
        this.setState(() => {
            return {
                active: selection
            }
        })
    }
  
    ActiveView(){
      switch (this.state.active) {
        case 1: 
        return <Fetchapi />;
        case 2:
          return <Ongoing />;
        case 3:
          return <Knowledge />;
        case 4:
        
          // return <Setupenv />
        
          // return <Blog />;
          return (<BrowserRouter><Blog /></BrowserRouter>) 
        default:
          
          return <Ongoing />;
      }
    }
  
    render() {
      
    
        return (   
          <div>
            <nav className="home_bar">
              <ul className="menu">
              <li className="menu_list"><button className={this.state.active===1? "navcurrent": ""}  id="navmore" onClick={() => this.toggleView(1)}> 
              Browser data
              </button></li>
              <li  className="menu_list" ><button className={this.state.active===2? "navcurrent": ""}  id="navmore" onClick={() => this.toggleView(2)}>
              Development
              </button></li>
              <li className="menu_list"><button className={this.state.active===3? "navcurrent": ""}  id="navmore" onClick={() => this.toggleView(3)}>
              Knowledge
              </button></li>
              <li className="menu_list"><button  className={this.state.active===4? "navcurrent": ""}  id="navmore" onClick={() => this.toggleView(4)}>
              Setup
              </button></li>
              </ul>
            </nav>
         
          
          <div>
                    
            {this.ActiveView()} 
          </div>

        </div>
          
          
        

        );
    }
  }

ReactDOM.render(<App />, document.getElementById("root"))


export default App
