/* tablechildcollection.js - Show the list of a solo collection - no sorting function
Edited by Libo Sun, Feb 2022 
Auburn University */

import React from "react";
import axios from "axios";
import parse from 'html-react-parser';

export default class ChildCollection extends React.Component {
// class TestChildCollection extends React.Component {
    // default State object
    state = {
        mainTitle: "Loading...... ",
        description: "",
        collections: [],
        showDetails: false,
        preCollection: []
    };
    
    componentDidMount() {    
        axios
        .get(this.props.dataFromParent.items.url)
        .then(response => {
            // classify the collection text
            const newCollection = response.data.map(c => {
                let textLen = c.element_texts.length;
                let c_title = "";
                let c_creator = "";
                let c_date = "";
                let c_type = "";
                for (var i = 0; i < textLen; i++) {
                    const t = c.element_texts[i].text;
                    
                    switch(c.element_texts[i].element.id) {
                        case 50: c_title  = t; break;
                        case 39: c_creator = t;break;
                        case 40: c_date = t;break;
                        case 7: c_type = t;break;
                        default:break;
            
                    }
                }

            return {
                id: c.id.toString(),
                url: c.url,
                title: c_title,
                creator: c_creator,
                // quotation: c.element_texts[3].text,
                year: c_date,
                type: c_type
            };
            });
    
            // create a new "State" object without mutating 
            // the original State object. 
            const newState = Object.assign({}, this.state, {
                mainTitle: this.props.dataFromParent.element_texts[0].text,
                description: this.props.dataFromParent.element_texts[2].text,
                collections: newCollection
            });
    
            // store the new state object in the component's state
            this.setState(newState);
        })
        .catch(error => console.log(error));
    
    }
    
    
    // chooseCollection= (collection) => {
    //     this.setState(prevState => {
    //     return {
    //         showDetails: true,
    //         preCollection: collection
    //     }
    //     })  
    // }
    
    
    // activeView(){
    //     if (this.state.showDetails){
    //     return <ChildCollection dataFromParent = {this.state.preCollection} />
    //     }
        
    // }
    
    
    render() {  
        return (
        <div className="main_content">
            
            <h1>{this.state.mainTitle} </h1>
            <p className="description">
                {parse(this.state.description)}
            </p>
            <nav>
            <div>
            <table id="smileysTable">

                <tr className="hoverdisabled">
                <th>ID</th>
                <th>Title</th>
                <th>Year</th>
                <th>Creator</th>
                <th>Type</th>
                 </tr>
                {this.state.collections.map(c =>  
                <tr   className="collection_details" key={c.id} >  
                    <td> {c.id}</td>        
                    <td> {parse(c.title)} </td> 
                    <td> {c.year}</td> 
                    <td> {c.creator}</td> 
                    <td> {c.type}</td>             
                </tr>
  
                )}
            </table>
            </div>
            </nav>
            {/* <div>
            {this.activeView()}
            </div> */}
        </div>
        );
    }
}
