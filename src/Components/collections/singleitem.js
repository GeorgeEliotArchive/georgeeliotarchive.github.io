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
              <tr key={c.id + c.text + Math.random() + " $key"}>
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
          <li className="pt-0 list-none hover:list-disc" key={entry.id + entry.url}>
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
        <button className="bg-slate-400 h-10 w-52 inline-block mr-2 hover:bg-sky-500 text-left pl-2"
                    // onClick={() => pdfmakedownload(posts[1].description, posts[1].pdfheader, posts[1].pdffooter)} type="primary">
                    onClick={() => pdfmakedownload(posts)} type="primary">
                Download Front-page PDF</button>
      </div>
      <div>
        {
          pdfexiting(posts) ?
           (<button className="bg-slate-400 h-10 w-52 inline-block mr-2 hover:bg-sky-500 text-left pl-2"
                     onClick={() => pdfmakemerge(posts)} type="primary">
                 Download Merged PDF</button>)
                 :
                 ""     
        }
        
      </div>
      

    </div> 

    );
}

const pdfexiting = (posts) => {
  var x = false;
  let lpost=posts.length;
  for(let i=1; i<lpost; i++){
    if (posts[i].mimetype === "application/pdf"){
      x=true;
    }
  }
    
  return x;

}

/* make the pdf file and hence download it */
const pdfmakedownload = (posts) => {

  let [dd, title] = pdfdata(posts);

  pdfMake.createPdf(dd).download("front_page_"+title+".pdf");

};


/* merge the pdf file with a generated front-page, and hence download it */
const pdfmakemerge = (posts) => {

  let [dd, title] = pdfdata(posts);
  const pdfDocGenerator = pdfMake.createPdf(dd);
  
  const PDFMerger = require('pdf-merger-js');

  var merger = new PDFMerger();
  // console.log(posts);

  pdfDocGenerator.getDataUrl((dataUrl) => {
    (async () => {
      merger.add(dataUrl);
      // await merger.add(posts[1].url);  //merge all pages. parameter is the path to file and filename.
      let lpost = posts.length;
      for(let i=1; i<lpost; i++){
        if (posts[i].mimetype === "application/pdf"){
          await merger.add(posts[i].url); }
      }
      await merger.save("merged_"+title+".pdf"); //save under given name and reset the internal document
    })();
  });

};


const pdfdata=(posts)=>{

  // var solid_line = {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ],margin: [0, 2, 0, 5] };
  let text = posts[1].description;
  let pdfheader =  posts[1].pdfheader;
  let pdffooter =  posts[1].pdffooter;
 
  var dd = {
    /* the content of the the pdf */
    pageSize: 'LETTER',
    header: "",
    footer: {
      columns: [
        pdffooter,  
      ],alignment: "center",
      style: "small"
    },
    content:[
      {
        columns: [
          {
            text:  "\n\n\n"+pdfheader,
            style: "brand",
          },
          {
            image: 'data:image/jpeg;base64, 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',
            fit: [100, 100],
            alignment: 'right',
          }
        ]
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
      title:{
        // italics: true, 
        fontSize: 16
      },
      header: {
        fontSize: 14,
        italics: true, 
        bold: true,
        color: "#3b3b3b",
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

    var mstyle = {
      style: ""
    }

    if (text[i].element.name === "Rights") {
      header_text = "Copyright License";  
    }
    else if (text[i].element.name === "Title") {
      header_text = "";  
      mstyle.style="title";
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
    
    var d2txt = text[i].text.replace(/<(.|\n)*?>/g, '');  
    d2txt = d2txt.replace(/&nbsp;/g, ' ');
    d2txt = d2txt.replace(/amp;/g, ' ');
    d2txt =  truncate(d2txt, len_words);
    var d2 = {
      text: d2txt,
      style: mstyle.style,
    }
    
    /* push the text to dd object 
       Relation and Original Format removed*/
    if (d1.text!== "Relation" && d1.text !== "Original Format" && d1.text !== "Email"){
      dd.content.push(d1);
      dd.content.push(d2);
    }
  }
  /* Adding a solid line if necessary */
  // dd.content.push(solid_line); 
  return [dd, title];
}

/* truncate a string by the number limit of words */
function truncate(str, no_words) {
  return str.split(" ").splice(0,no_words).join(" ");
}







