
import React from "react"
import ReactDOM from "react-dom"

import Togglebk from "./toggle_bk";


import '../Css/App.css';
import Particle from './Particle';
import Setupenv from "./Setup";
import Ongoing  from "./Ongoing";
import Knowledge from "./knowledge";
import Footer from './footer';


/*

Challenge:
1. Convert all 3 components to be class-based
2. Fix the small bug

*/

// #1
class App extends React.Component {

    render() {

        return (
          <div>
            <Togglebk />

            <div>                
                <Header username="this is the development of George Eliot Programs"/>
                <Greeting />
                <Background />
                <Showmain />
                <Footer />
            </div>
          
          </div>
            
        )
    }
}

// #2
class Header extends React.Component {
   
    render() {
        return (
            <header>
                <p>Welcome, {this.props.username}!</p>
            </header>
        )
    }
}

// #3
// Hint: any "display logic" can be placed inside the `render`
// method before the `return` statement
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
      <div>
        <h1>Good {this.state.timeOfDay} to you, sir or madam!</h1>      
        <h2 className = 'button_main button_border' id="more" onClick={this.toggleTime}> {this.state.showTime ? "Hide time" : "What Time is it now" }</h2>  
        <h2 className="timedate">{this.state.showTime ? <Text /> : null} </h2>
      </div>
    )
  }
}


// #3
// Hint: any "display logic" can be placed inside the `render`
// method before the `return` statement
class Background extends React.Component {

  
     
    render() {
      return <div id="particles-js"> <Particle /> </div>
    

    }
}



// Show the Main content in the page
class Showmain extends React.Component {
    state = {
        active: 1
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
          return <Ongoing />;
        case 2:
          return <Knowledge />;
        case 3:
          return <Setupenv />
        default:
          return <Ongoing />;
      }
    }
  
    render() {
      
      

        return (       
          

        <div className="show_main">
            {/* <button className="onging button_main glow-on-hover button_ongoing"  onClick={() => this.toggleView(1)}> */}
            <button className="onging button_main glow-on-hover "  onClick={() => this.toggleView(1)}>
            On-going Development
            </button>
            <button className="button_main glow-on-hover " id="more" onClick={() => this.toggleView(2)}>
            Knowledge Center
            </button>
            <button className="button_main glow-on-hover " id="more" onClick={() => this.toggleView(3)}>
            Setup Enivronment
            </button>
            {/* <hr></hr> */}
            
            {this.ActiveView()}
        </div>

        );
    }
  }

ReactDOM.render(<App />, document.getElementById("root"))


export default App
