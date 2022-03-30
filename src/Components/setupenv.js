/* setup.js - setup environment section
Edited by Libo Sun, Jan 2022 
Auburn University */

import React from "react"
import '../Css/App.css';
import Markdown from 'markdown-to-jsx';


// default export
export default class Setupenv extends React.Component {
    render() {
        return (
            <div className="main_content" >
                <h1 className="background_inherd">Set Up Local Working Enivronment</h1>
            
            <div className="main_content setupenv">                
                <SetupEnv />
            </div>
            </div>
            
        )
    }
}


// setup text(md) render
class SetupEnv extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props)
        this.state = { md: '' }
    }
  
    async componentDidMount() {
        this._isMounted = true;

        const file = await import(`../Md/setup.md`);
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
        const MyParagraph = ({ children, ...props }) => (
            <span {...props}>{children}</span>
        );

        return (
            <div>         

                <Markdown 
                options={{wrapper: "pre", forceWrapper: false,forceBlock: false,
                    overrides: {
              
                        code: {
                            component: MyParagraph,
                            props: {
                                className: 'codeblock',
                            },
                        },
                    }                    
                }}
                children={this.state.md} />
            </div>
           
        )
    }
  }