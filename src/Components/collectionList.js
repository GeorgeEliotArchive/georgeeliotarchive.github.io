import axios from "axios";
import React from "react";

// import ChildCollection from "./collections/childcollection";
import TableChildCollection from "./collections/tablechildcollection";


const apiurl = "https://georgeeliotarchive.org/api/collections";

export default class CollectionList extends React.Component{
    render(){
        return (
            <div>
              
                <FetchCollectionList />            
            </div>
        )
    }
}

class FetchCollectionList extends React.Component {

  // default State object
  state = {
    collections: [],
    showDetails: false,
    preCollection: []
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


  chooseCollection= (collection) => {
    this.setState(prevState => {
      return {
          showDetails: prevState.showDetails === true ? false : true,
          preCollection: collection
      }
    })  
  }

  
  activeView(){
    if (this.state.showDetails){
      // return <ChildCollection dataFromParent = {this.state.preCollection} />
      return <TableChildCollection dataFromParent = {this.state.preCollection} />
    }
    
  }


  

  render() {
    return (
      <div className="main_content">
        
        <h1>Collections on George Eliot Archive </h1>
        <nav>
           {/* <CollectionList collections={this.state.collections} />           */}
        <div>
        <table id="smileysTable">
        <tbody>
        <tr className="hoverdisabled ">
          <th>Title</th>
          <th>Count</th>
        </tr>
          {this.state.collections.filter(d => d.items.count > 10).map(c => 
             
            <tr 
                // className="collection" 
                className={this.state.preCollection.id === c.id.toString() && this.state.showDetails ? "collection selected": "collection"} 
              key={c.id} onClick={() => this.chooseCollection(c)} >         
            <td >{c.element_texts[0].text}</td> 
            <td> <em>{c.items.count}</em></td> 
            </tr>
            )}
            </tbody>
        </table>
        </div>
        </nav>
        <div>
          {this.activeView()}
        </div>
      </div>
    );
  }
}


// function CollectionList(props) {
//   return (
//       <div>
//         <table id="smileysTable">
//         <tr className="hoverdisabled ">
//           <th>Title</th>
//           <th>Count</th>
//         </tr>
//        {props.collections.filter(d => d.items.count > 10).map(c =><Collection
//                               key={c.id} 
//                               id={c.id} 
//                               url={c.url} 
//                               title={c.element_texts[0].text} 
//                               items_count={c.items.count}
//                               />)}
//      </table>
//      </div>
//   ); 
// } 

// function Collection(props) {
//   return (
//     <tr  className="collection" onClick={() => CollectionDetail(props)} >         
//           <td >{props.title}</td> 
//           <td> <em>{props.items_count}</em></td> 
//     </tr>

    
//   );
// }

  
// Collection.propTypes = {
//   id: PropTypes.string.isRequired
// };