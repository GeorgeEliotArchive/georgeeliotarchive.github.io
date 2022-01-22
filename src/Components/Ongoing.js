
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
            <div className="main_content ongoing sub_ongoing ongoing_relationship">
                <Markdown children={this.state.md} />      
                <button className="glow-on-hover" type="button"  id="more" onClick={() => this.toggleView()}>
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

class Chronologydev2019 extends React.Component {
    render() {
        return (
            <div >                         
                <iframe width="100%" scrolling="yes" height="900" title="relationship" src="https://georgeeliotarchive.github.io/chronology/version_2019" />         
            </div>
        )
    }
  }


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
            <div>
                <button className="glow-on-hover" type="button" id="more" onClick={() => this.toggleView()}>
                    {/* Show relationship development progress */}
                    {this.state.text} Development of Chronology
                </button>    
                {this.ActiveView()}
            </div>    
            <div>
            <button className="glow-on-hover" type="button" id="more" onClick={() => this.toggleView2019()}>
                {/* Show relationship development progress */}
                {this.state.text2019} Another Version of Chronology
            </button>                   

            
            {this.ActiveView2019()}
            </div>
            </div>
        )
    }
  }

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
    _isMounted = false;

    constructor(props) {
        super(props)
        this.state = { 
            md: '' ,
            // showRelationsip: false,
            // showChronology: false,

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
            
            <div className="main_content ongoing">    
            <Markdown children={this.state.md} />   
            <br />      
            {/* <hr /> */}
            <Relationship />
            {/* <hr className="new1" /> */}
            <Chronology />
               

            </div>
        )
    }
  }