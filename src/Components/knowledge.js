/* knowledge.js - knowledge section
Edited by Libo Sun, Jan 2022 
Auburn University */

import React from "react"
import '../Css/App.css';
import Markdown from 'markdown-to-jsx';
import Setupenv from "./setupenv";



// default export class - Knowledge
export default class Knowledge extends React.Component {
    render() {
        return (
            <div className="container ml-4 mt-3.5">
            <div className="pl-0.5 border border-solid border-current ">   
                            
                <Knowledgemd />
               
            </div>
        
            <div className="mt-3.5 pl-0.5 border border-solid border-current">    
                <Setupenv />
               
            </div>
            </div>
            
        )
    }
}


// embeded intro video
// class Introvideo extends React.Component {
//     render () {
//         return (
//             <div>
//                 <iframe width="800" height="600" 
//                 src="https://www.youtube.com/embed/YFzIbuN_GOU" 
//                 title="YouTube video player" frameborder="0" 
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
//                 allowfullscreen></iframe>
//             </div>
//         )
//     }
// }


// knowledge text(md) render
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
            <h1 >Learning list and Knowledge desired:</h1>
            <div className="main_content knowledge">
            

                <Markdown              
                children={this.state.md} />
                </div>
            </div>
            
        )
    }
  }