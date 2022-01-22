
import React from "react"
import '../Css/App.css';
import Markdown from 'markdown-to-jsx';


// #1
export default class Knowledge extends React.Component {
    render() {
        return (
            <div className="main_content">                
                <Knowledgemd />
            </div>
            
        )
    }
}

class Knowledgemd extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props)
        this.state = { md: '' }
    }
  
    async componentDidMount() {
        this._isMounted = true;
        const file = await import(`../Md/knowledge.md`);
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
    
    render() {        

        return (
            <div >
            <h1 >Before Going To Work....</h1>
            <div className="main_content knowledge">
            
                
                <Markdown              
                children={this.state.md} />
                </div>
            </div>
            
        )
    }
  }