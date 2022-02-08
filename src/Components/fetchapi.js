import axios from "axios";
import React from "react";
// import PropTypes from "prop-types";

const apiurl = "https://georgeeliotarchive.org/api/collections";

export default class Fetchapi extends React.Component{
    render(){
        return (
            <div>
              
                <Fetchdata />
              
            </div>
        )
    }
}

class Fetchdata extends React.Component {

  // default State object
  state = {
    collections: []
  };

  componentDidMount() {
   
    axios
      .get(apiurl)
      .then(response => {
        // create an array of contacts only with relevant data
        const newCollection = response.data.map(c => {
          return {
            id: c.id.toString(),
            url: c.url,
            public: c.public,
            featured: c.featured,
            added: c.added,
            modified: c.modified,
            owner: c.owner,
            items: c.items,
            element_texts: c.element_texts,

          };
        });

        // create a new "State" object without mutating 
        // the original State object. 
        const newState = Object.assign({}, this.state, {
          collections: newCollection
        });

        // store the new state object in the component's state
        this.setState(newState);
      })
      .catch(error => console.log(error));


  }
  

  render() {
    return (
      <div className="main_content">
        
        <h1>Collections on George Eliot Archive </h1>
        {console.log(this.state.collections)}
        <nav>
        
      
           <CollectionList collections={this.state.collections} /> 
         
        </nav>

      
        
      </div>
    );
  }
}

function CollectionList(props) {
    return (
        <div>
          <table id="smileysTable">
          <tr className="hoverdisabled ">
            <th>Title</th>
            <th>Count</th>
          </tr>
        {props.collections.map(c =><Collection 
                                key={c.id} 
                                id={c.id} 
                                url={c.url} 
                                title={c.element_texts[0].text} 
                                items_count={c.items.count} 
                                />)}
       </table>
       </div>
    ); 
  } 

function Collection(props) {
  return (
    <tr  className="collection" > 
      {/* <nav className="collection"> */}
      
        {/* <li>ID: {props.id}</li> */}
        
          <td>{props.title}</td> 
          <td> <em>{props.items_count}</em></td> 
        
        {/* <li>URL: {props.url}</li> */}
        {/* <li>Item Count: {props.items_count}</li> */}
        
      {/* </nav> */}

    </tr>

    
  );
}
  
// Collection.propTypes = {
//   id: PropTypes.string.isRequired
// };