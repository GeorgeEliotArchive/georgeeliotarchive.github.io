/* singleitem.js - 
  1. Single item display 
    1.1 detailed information
    1.2 file url diplay
    1.3 img display

  2. front-page pdf generator

Edited by Libo Sun, Mar 2022 
Auburn University */

import axios from "axios";
import React , {useState, useEffect} from "react";
import parse from 'html-react-parser';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


const len_words = 50;

export default class ItemDetails extends React.Component {

  /* default State object */
  state = {
    is_ready: false,
    id: "",
    url: "",
    file_urls: "",
    title:"",
    tags:"",
    description:[],
    itemlink:"",
    pdfheader: "",
    pdffooter: ""
  };

  componentDidMount() {
    axios
      .get(this.props.data.values.url)
      .then(res => {
      this.setState({
        is_ready: true,
        pdfheader: this.props.data.values.pdfheader,
        pdffooter: this.props.data.values.pdffooter,
        id: res.data.id,
        url: res.data.url,
        file_urls: res.data.files.url,
        title: res.data.title,
        tags: getTags(res.data.tags),
        description:res.data.element_texts
      });
        
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <table className="my-2 ml-2">
        <tbody className="mx-2" id={this.state.id}>
          {this.state.description.map(
            c =>(
              <tr key={c.id + c.text + " $key"}>
                <td className="border-none font-bold">{c.element.name}: </td>
                <td  className="border-none">{parse(c.text)}</td>
              </tr>
            )
          )}

          <tr>
            <td className="border-none font-bold underline">
              Tags: 
            </td>
            <td className="border-none">         
              {this.state.tags}
            </td>
            </tr>
         
          <tr>
            <td className="font-bold border-none align-top">
              File: 
            </td>
            <td className="border-none italic">         
              {this.state.is_ready ? (<ShowFiles data={this.state} /> ): ""}
            </td>
          </tr>
        </tbody>
  
      </table>
    );
  }
}

/* parse the tags array */
function getTags(tagArray) {
  const length = Object.keys(tagArray).length;
  let tags = "";
  for(var i=0; i < length; i++){
    tags += tagArray[i].name;
    if (i < length - 1)
      tags  += ", "
  }
  return tags;
}

/* 
1. list the file links with the original file name
2. show images if available 
note: a url for file api is needed.   */
const ShowFiles = (data) => {

  const [posts, setPosts] = useState([
    {
      id: null,
      url: null,
      description: null,
      filename: null,
      mimetype: null,
      pdfheader: null,
      pdffooter: null,
    }
  ]
  );
   
  useEffect( () => { 
      async function fetchData() {
          try {
              const res = await axios.get(data.data.file_urls); 
              res.data.map(           
                c=>{
                  var newpost = {
                    id: data.data.id,
                    url:c.file_urls.original,
                    description: data.data.description,
                    filename: c.original_filename,
                    mimetype: c.mime_type,
                    pdfheader: data.data.pdfheader,
                    pdffooter: data.data.pdffooter,
                  }
                  setPosts(oldArray => [...oldArray, newpost]);
                  return c;
                }               
              )
          } catch (err) {
              console.log(err);
          }
      }
      fetchData();
  }, [data.data]);

  return (
    <div> 
      <div>{posts.map(entry =>
        entry.url !== null ? (
          <li className="pt-0 list-none hover:list-disc" key={entry.id}>
          <a href={entry.url}>{entry.filename}</a> 
          </li>) :""
          )}       
      </div>

      <div>{posts.map(entry =>   
           entry.mimetype === "image/jpeg" ||  entry.mimetype === "image/png" ?
          (<img src={entry.url} alt={entry.filename} className="h-40 inline-block mr-2"/>) : ""
          )        
        }
      </div>

      <div>
        <button className="bg-slate-400 h-10 w-52 inline-block mr-2 hover:bg-sky-500"
                    onClick={() => pdfmakedownload(posts[1].description, posts[1].pdfheader, posts[1].pdffooter)} type="primary">
                Preview Front-page PDF</button>
      </div>
      {/* <div>{console.log(posts)}</div> */}

    </div> 

    );
}


/* make the pdf file and hence download it */
const pdfmakedownload = (text, pdfheader, pdffooter) => {

  // var solid_line = {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ],margin: [0, 2, 0, 5] };
 
  var dd = {
    /* the content of the the pdf */
    header: "",
    footer: {
      columns: [
        pdffooter,  
      ],alignment: "center",
      style: "small"
    },
    content:[
      {
        // text: "GEORGE ELIOT ARCHIVE",
        text: pdfheader,
        style: "brand"
      },
      {canvas: [ 
      
        { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ],margin: [0, 2, 0, 5] }
      
    ],

    /* styles for pdf document */
    styles: {
      brand: {
        fontSize: 18,
        color: "#ff5500",
        bold: true
      },
      header: {
        fontSize: 14,
        bold: true
      },
      subheader: {
        fontSize: 12,
        bold: true
      },
      quote: {
        italics: true
      },
      small: {
        fontSize: 8
      }
    }
  };

  /* interpret the text data object to the desired architecture */
  let dlen =  text.length;
  var title = "";
  var header_text = "";
  for(let i= 0; i < dlen; i ++){
    /* set title as file name */
    if (text[i].element.name === "Title") {
      title = text[i].text.replace(/<(.|\n)*?>/g, '');
      title = title.replace('"', '');
    }

    if (text[i].element.name === "Rights") {
      header_text = "Copyright License";  
    }
    else{
      header_text = text[i].element.name
    }


    var d1 =  {
          text: header_text,
          style: 'header'
        }

    /* maintain the description which may:
    1. contain html tags hence being removed
    2. result in a long text hence being truncated */
    var d2 = text[i].text.replace(/<(.|\n)*?>/g, '');  
    d2 = d2.replace(/&nbsp;/g, ' ');
    d2 = d2.replace(/amp;/g, ' ');
    d2 =  truncate(d2, len_words);
    
    /* push the text to dd object 
       Relation and Original Format removed*/
    if (d1.text!== "Relation" && d1.text !== "Original Format"){
      dd.content.push(d1);
      dd.content.push(d2);
    }
  }

  /* Adding a solid line if necessary */
  // dd.content.push(solid_line); 

  pdfMake.createPdf(dd).download(title+".pdf");

};

/* truncate a string by the number limit of words */
function truncate(str, no_words) {
  return str.split(" ").splice(0,no_words).join(" ");
}







