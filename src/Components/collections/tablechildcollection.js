
/* tablechildcollection.js - Show the list of a solo collection
Edited by Libo Sun, Feb 2022 
Auburn University */


import React from 'react'
// import styled from 'styled-components'
import { useTable, useSortBy } from 'react-table'
import axios from "axios";
import parse from 'html-react-parser';

export default class TableChildCollection extends React.Component {
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
            const nCollection = response.data.map(c => {
                let textLen = c.element_texts.length;
                let c_title = "";
                let c_creator = "";
                let c_date = "";
                let c_type = "";
                for (var i = 0; i < textLen; i++) {
                    const t = c.element_texts[i].text;
                    
                    switch(c.element_texts[i].element.id) {
                        case 50: c_title  = t.replace(/<\/?[^>]+(>|$)/g, ""); break;
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
                // description: this.props.dataFromParent.element_texts[2].text,
                description: getDescription(this.props.dataFromParent.element_texts),
                collections: nCollection
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
            {/* <table id="smileysTable">

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
            </table> */}
            <ChildCollectionList collections={this.state.collections} />
            </div>
            </nav>
            {/* <div>
            {this.activeView()}
            </div> */}
        </div>
        );
    }
}


function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  },
  useSortBy
  )

  // Render the UI for your table
//   return (
//     <table {...getTableProps()}>
//       <thead>
//         {headerGroups.map(headerGroup => (
//           <tr {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map(column => (
//               <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody {...getTableBodyProps()}>
//         {rows.map((row, i) => {
//           prepareRow(row)
//           return (
//             <tr {...row.getRowProps()}>
//               {row.cells.map(cell => {
//                 return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//               })}
//             </tr>
//           )
//         })}
//       </tbody>
//     </table>
//   )
return (
    <>
      <table  id="smileysTable" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr className="collection_details" onClick={() => test_click(row)} {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
              )}
          )}
        </tbody>
      </table>
      <br />
  
    </>
  )
}

function test_click(props) {
    console.log(props);
    console.log(props.original.title);
}

function ChildCollectionList(props) {
    console.log(props.collections);
  const columns = React.useMemo(
    () => [
      {
        Header: ' ',
        columns: [
          {
            Header: 'ID',
            accessor: 'id',
          },
          {
            Header: 'Title',
            accessor: 'title',
          },
          {
            Header: 'Date',
            accessor: 'date',
          },
          {
            Header: 'Creator',
            accessor: 'creator',
          },
          {
            Header: 'Type',
            accessor: 'type',
          },
        ],
      },
    ],
    []
  )

  const data = makeData(props.collections);

  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  )
}


const newCollection = (props) => {
    return {
      id: props.id,
      title: parse(props.title),
      date: props.year,
      creator: props.creator,
      type: props.type
  }
}

function makeData(props) {
    const makeDataLevel = () => {
      return props.map(d => {
        return {
          ...newCollection(d)
        }
      })
    }
  
    return makeDataLevel()
  }

function getDescription (text_string) {
    let description = "";
    let identifier = "";
    console.log(text_string);
    for (var i = 0; i < text_string.length; i++) {
        const t = text_string[i].text;
        switch(text_string[i].element.id) {
            case 39: identifier = t;break;
            case 41: description = t;break;
            default:break;
        }
    }
    if (description != "") {
        return description;
    }
    else {
        return identifier;
    }
}
