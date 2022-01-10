
import React from "react"
import ReactDOM from "react-dom"

import '../Css/App.css';
import Particle from './Particle';
import Markdown from 'markdown-to-jsx'


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
                <Header username="this is the development of George Eliot Programs"/>
                <Greeting />
                <Background />
                <Ongoing />
                <Learning />
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
    console.log(date.getHours())
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
        <h2 className = 'button' id="more" onClick={this.toggleTime}> {this.state.showTime ? "Hide time" : "What Time is it now" }</h2>  
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


class Ongoing extends React.Component {
  constructor(props) {
      super(props)
      this.state = { md: '' }
  }

  async componentDidMount() {
      const file = await import(`../Md/ongoing.md`);
      const response = await fetch(file.default);
      const text = await response.text();

      this.setState({
          md: text
      })
  }

  render() {
      return (
          <div className="ongoing">
              <Markdown children={this.state.md} />
          </div>
      )
  }
}



class Learning extends React.Component {
  constructor(props) {
      super(props)
      this.state = { md: '' }
  }

  async componentDidMount() {
      const file = await import(`../Md/readme.md`);
      const response = await fetch(file.default);
      const text = await response.text();

      this.setState({
          md: text
      })
  }

  render() {
      return (
          <div className="article">
              <Markdown children={this.state.md} />
          </div>
      )
  }
}




ReactDOM.render(<App />, document.getElementById("root"))


export default App
