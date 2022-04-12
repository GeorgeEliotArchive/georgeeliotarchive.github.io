import axios from "axios";
import React from "react";
import TableChildCollection from "./tablechildcollection";


export default class FetchCollectionList extends React.Component {

    _isMounted = false;
  
    // default State object
    state = {
      collections: [],
      showDetails: false,
      preCollection: [],
      pdfHeader: "",
      pdfFooter: "",
    };
  
    componentDidMount() {
      this._isMounted = true;

      this.setState({pdfHeader: this.props.pdfHeader});
      this.setState({pdfFooter: this.props.pdfFooter});
     
      axios
        .get(this.props.dataFromParent)
        .then(response => {
          // create an array of contacts only with relevant data
          // console.log(this.props.dataFromParent)
          
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
          
          

          // console.log(this.state)
  
          // store the new state object in the component's state
          if (this._isMounted){
          this.setState(newState);}
        })
        .catch(error => console.log(error));
  
    }
  
    componentWillUnmount() {
      this._isMounted = false;
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
        // console.log(this.state)
        return <TableChildCollection dataFromParent = {this.state.preCollection} pdfHeader={this.state.pdfHeader} pdfFooter={this.state.pdfFooter}/>
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
            {this.state.collections.filter(d => d.items.count >= 0).map(c => 

               
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