
/* APP.js - Main Page
Edited by Libo Sun, Jan 2022 
Auburn University */
import React from "react"
import ReactDOM from "react-dom"

import '../Css/App.css';
// import Particle from './particles';
// import Setupenv from "./setupenv";
import Ongoing  from "./ongoing";
import Knowledge from "./knowledge";
import Footer from './footer';
import CollectionList from "./collectionListGE";
// import Blog from "./blog/mediumblog";
import Omekaapi from "./omekaapi";

import { Routes, Route,  BrowserRouter } from "react-router-dom";

import SingleBlog from "./blog/singleblog";

import Layout from "./Menubar/Layout/Layout";
import GitFooter from "./footer/footer";




// Default App class, export
class App extends React.Component {

    render() {

        return (

          <div className="App">   
    
          <BrowserRouter >          
            <Layout />
            {/* <Togglebk />  */}
           <Greeting /> 
            <Routes>
              {/* <Route path="/blog" element={<Blog />} > </Route> */}
              <Route path="/omeka" element={<Omekaapi />} > </Route>
              <Route path="/knowledge" element={<Knowledge/>}></Route>
              <Route path="/blog/:id" element={<SingleBlog />}></Route>
              <Route path="/collectionlist" element={<CollectionList />}></Route>
              {/* <Route path="/setup" element={<Setupenv />}></Route> */}
              <Route path="/" element={<Ongoing />}></Route>
            </Routes>  
          </BrowserRouter>  
          <GitFooter />
          <div>
            <div> 
            </div>                          
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
//
//    render() {
//      return <div id="particles-js"> <Particle /> </div>    
//    }
//}





ReactDOM.render(<App />, document.getElementById("root"))


export default App
