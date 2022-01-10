
import React from "react"
import ReactDOM from "react-dom"

import '../Css/App.css';
import Markdown from 'markdown-to-jsx'



// #1
export default class Setup extends React.Component {
    render() {
        return (
            <div>                
                <SetupEnv />
            </div>
            
        )
    }
}

class SetupEnv extends React.Component {
    constructor(props) {
        super(props)
        this.state = { md: '' }
    }
  
    async componentDidMount() {
        const file = await import(`../Md/Setup.md`);
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