
import React from "react"
// import ReactDOM from "react-dom"

import '../Css/App.css';
import Markdown from 'markdown-to-jsx'




// #1
export default class Setupenv extends React.Component {
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
        const file = await import(`../Md/setup.md`);
        const response = await fetch(file.default);
        const text = await response.text();
  
        this.setState({
            md: text
        })
    }
    
    render() {
        const MyParagraph = ({ children, ...props }) => (
            <div {...props}>{children}</div>
        );

        return (
            <div className="main_content setupenv">
                <Markdown 
                options={{wrapper: "pre", forceWrapper: true,forceBlock: true,
                    overrides: {
                        
                        code: {
                            component: MyParagraph,
                            props: {
                                className: 'highlight',
                            },
                        },
                    }                    
                }}
                children={this.state.md} />
            </div>
        )
    }
  }