
import React from "react"
import '../Css/App.css';
import Markdown from 'markdown-to-jsx';


// #1
export default class Knowledge extends React.Component {
    render() {
        return (
            <p className="main_content">                
                <Knowledgemd />
            </p>
            
        )
    }
}

class Knowledgemd extends React.Component {
    constructor(props) {
        super(props)
        this.state = { md: '' }
    }
  
    async componentDidMount() {
        const file = await import(`../Md/knowledge.md`);
        const response = await fetch(file.default);
        const text = await response.text();
  
        this.setState({
            md: text
        })
    }
    
    render() {        

        return (
            <div >
            <h1 >Before Going To Work....</h1>
            <p className="main_content knowledge">
            
                
                <Markdown              
                children={this.state.md} />
                </p>
            </div>
            
        )
    }
  }