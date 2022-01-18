
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


class Relationship extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            md: '' ,
            onshow: false,
            text: "Show"}
    }
  
    async componentDidMount() {
        const file = await import(`../Md/dev_relationship.md`);
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
            <div className="main_content ongoing sub_ongoing">
                <Markdown children={this.state.md} />      
                <button className="button_main button_sub_ongoing" id="more" onClick={() => this.toggleView()}>
                    {/* Show relationship development progress */}
                    {this.state.text} Development of Relationship
                </button>                      

            {this.ActiveView()}
            </div>
        )
    }
  }


// ------ Chronology --------
class Chronologydev extends React.Component {
    render() {
        return (
            <div >                         
                <iframe width="100%" scrolling="yes" height="900" title="relationship" src="https://georgeeliotarchive.github.io/chronology/" />         
            </div>
        )
    }
  }


class Chronology extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            onshow: false,
            text: "Show"}
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
          return <Chronologydev />
        }
        else{
            return null
        }
      }
  
    render() {
        return (
            <div className="main_content ongoing sub_ongoing">
            <Chronologymd />
            <button className="button_main button_sub_ongoing" id="more" onClick={() => this.toggleView()}>
                {/* Show relationship development progress */}
                {this.state.text} Development of Chronology
            </button>                      

            {this.ActiveView()}
            </div>
        )
    }
  }

class Chronologymd extends React.Component {
    constructor(props) {
        super(props)
        this.state = { md: '' }
    }
  
    async componentDidMount() {
        const file = await import(`../Md/dev_chronology.md`);
        const response = await fetch(file.default);
        const text = await response.text();
  
        this.setState({
            md: text
        })
    }
    
    render() {
        // const MyParagraph = ({ children, ...props }) => (
        //     <div {...props}>{children}</div>
        // );

        return (
            // <div className="main_content setupenv">
                <Markdown 
                //     options={{wrapper: "pre", forceWrapper: false,forceBlock: false,
                //     overrides: {
                        
                //         code: {
                //             component: MyParagraph,
                //             props: {
                //                 className: 'highlight_quote',
                //             },
                //         },
                //     }                    
                // }}
                children={this.state.md} />
            // </div>
        )
    }
  }



export default class Ongoing extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            md: '' ,
            // showRelationsip: false,
            // showChronology: false,

        }
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
            <div className="main_content ongoing">    
            <Markdown children={this.state.md} />         
            <Relationship />
            <Chronology />
               

            </div>
        )
    }
  }