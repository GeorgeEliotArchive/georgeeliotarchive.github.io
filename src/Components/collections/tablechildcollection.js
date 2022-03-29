
/* tablechildcollection.js - Show the list of a solo collection
Edited by Libo Sun, Feb 2022 
Auburn University */


import React from 'react'
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce, useExpanded } from 'react-table'
import axios from "axios";
import parse from 'html-react-parser';

import { matchSorter } from 'match-sorter' 

import ItemDetails from './singleitem';

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span>
      Search:{' '}
      <input className='bg-gray-100'
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </span>
  )
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}





function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val


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
      
    render() {  
        return (
        <div className="main_content">
            
            <h1>{this.state.mainTitle} </h1>
            <p className="description">
                {parse(this.state.description)}
            </p>
            <nav>
            <div>
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


// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter(row => {
    const rowValue = row.values[id]
    return rowValue >= filterValue
  })
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = val => typeof val !== 'number'

function Table({ columns, data }) {

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    // setHiddenColumns,

  } = useTable({
    columns,
    data,
    initialState: {
      hiddenColumns: columns.map(column => {
          if (column.show === false) return column.accessor || column.id;
          return column;
      }),
  },
    defaultColumn, // Be sure to pass the defaultColumn option
    filterTypes,
  },
  
  useFilters, // useFilters!
  useGlobalFilter, // useGlobalFilter!
  useSortBy,
  useExpanded,
  )

  return (
    <>
      <table  id="smileysTable " {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
            <tr className='border-dotted h-10 text-center' {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column =>  (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                
                <th  className='border-black pl-1.5  not-italic min-w-20' {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}                 
                  <span >
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
          <tr>
            <th className='border-black h-12 pl-1.5 not-italic'
              colSpan={visibleColumns.length}
   
            >
              <GlobalFilter className='h-12 pl-1.5'
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(
            (row, i) => {
              prepareRow(row);
              return (
                // <tr className="collection_details" onClick={() => test_click(row)} {...row.getRowProps()}>
                //   {row.cells.map(cell => {
                //     return (
                //       <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                //     )
                //   })}
                //   <span>  {row.isExpanded ? "" :"TEST"} </span>
                // </tr>
                // Use a React.Fragment here so the table markup is still valid
                <React.Fragment {...row.getRowProps()}>
                <tr >
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
                {/*
                    If the row is in an expanded state, render a row with a
                    column that fills the entire length of the table.
                  */}
                {row.isExpanded ? (
                  <tr>
                    <td colSpan={visibleColumns.length}>
                      {/*
                          Inside it, call our renderRowSubComponent function. In reality,
                          you could pass whatever you want as props to
                          a component like this, including the entire
                          table instance. But for this example, we'll just
                          pass the row
                        */}
                        {/* <span>{row.values.title} </span>
                        <button>This is a button</button> */}
                        <ItemDetails dataFromParent={row} />

                    </td>
                  </tr>
                ) : null}
               </React.Fragment>
                
              )}
          )}
        </tbody>
      </table>
      <br />
      <div>Showing {rows.length} rows</div>
      <div>
        {/* <pre>
          <code>{JSON.stringify(state.filters, null, 2)}</code>
        </pre> */}
      </div>
    </>
  )
}


function ChildCollectionList(props) {
    // console.log(props.collections);
    const columns = React.useMemo(() => COLUMNS, [])
  const data = makeData(props.collections);

  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  )
}

// The colomn data header
const COLUMNS = [
  {
    // Make an expander cell
    Header: () => null, // No header
    id: 'expander', // It needs an ID
    Cell: ({ row }) => (
      // Use Cell to render an expander for each row.
      // We can use the getToggleRowExpandedProps prop-getter
      // to build the expander.
      <span className='pl-3'{...row.getToggleRowExpandedProps()}>
        {row.isExpanded ? '👇' : '👉'}
      </span>
    ),
  },
  {
    Header: 'Id',
    Footer: 'Id',
    accessor: 'id',
    sticky: 'left'
  },
  {
    Header: 'Title',
    Footer: 'Title',
    accessor: 'title',
    sticky: 'left'
  },
  {
    Header: 'Date',
    Footer: 'Date',
    accessor: 'date',
    sticky: 'left'
  },
  {
    Header: 'Creator',
    Footer: 'Creator',
    accessor: 'creator'
  },
  {
    Header: 'Type',
    Footer: 'Type',
    accessor: 'type'
  },
  {
    Header: 'Url',
    Footer: 'Url',
    accessor: 'url',
    show: false
  }
]

const newCollection = (props) => {
    return {
      id: props.id,
      title: parse(props.title),
      date: props.year,
      creator: props.creator,
      type: props.type,
      url: props.url
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
    // console.log(text_string);
    for (var i = 0; i < text_string.length; i++) {
        const t = text_string[i].text;
        switch(text_string[i].element.id) {
            case 39: identifier = t;break;
            case 41: description = t;break;
            default:break;
        }
    }
    if (description !== "") {
        return description;
    }
    else {
        return identifier;
    }
}
