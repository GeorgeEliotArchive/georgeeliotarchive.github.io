
import React from "react"
import '../Css/App.css';
import Markdown from 'markdown-to-jsx';



class Relationshipdev extends React.Component {
    render() {
        return (
            <div >                         
                <iframe width="100%" scrolling="yes" height="900" title="relationship" src="https://georgeeliotarchive.github.io/relationship/" />         
            </div>
        )
    }
  }


export default class Ongoing extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            md: '' ,
            onshow: false,
            text: "Show"}
    }
  
    async componentDidMount() {
        const file = await import(`../Md/ongoing.md`);
        const response = await fetch(file.default);
        const text = await response.text();
  
        this.setState({
            md: text
        })
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
            <div className="main_content ongoing">
                <Markdown children={this.state.md} />      
                <button className="button_main button_relationship" id="more" onClick={() => this.toggleView()}>
                    {/* Show relationship development progress */}
                    {this.state.text} Progress of Relationship
                </button>                      

            {this.ActiveView()}
            </div>
        )
    }
  }