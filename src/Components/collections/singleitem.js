import axios from "axios";
import React , {useState, useEffect} from "react";
import parse from 'html-react-parser';


export default class ItemDetails extends React.Component {

  // default State object
  state = {
    is_ready: false,
    id: "",
    url: "",
    file_urls: "",
    title:"",
    tags:"",
    description:[],
    itemlink:""
  };

  componentDidMount() {
    axios
      .get(this.props.dataFromParent.values.url)
      .then(res => {
        console.log(res.data.files);
      this.setState({
        is_ready: true,
        id: res.data.id,
        url: res.data.url,
        // file_urls: ShowPosts(res.data.files.url),
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
      <div>
        <br />
        <div className="mx-2">
        
          {this.state.description.map(
            c =>(
              <tr >
                <td className="border-none font-bold">{c.element.name}: </td>
                <td className="border-none">{parse(c.text)}</td>
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
            <td className="border-none font-bold">
              File: 
            </td>
            <td className="border-none">         
              {this.state.is_ready ? (<ShowFiles url={this.state.file_urls} /> ): ""}
            </td>
          </tr>
        </div>
        <br />
      </div>
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
const ShowFiles = (url) => {

  const [posts, setPosts] = useState([
    {
      url: null,
      filename: null,
      mimetype: null
    }]
  );
   
  useEffect( () => { 
      async function fetchData() {
          try {
              const res = await axios.get(url.url); 
              res.data.map(           
                c=>{
                  var newpost = {
                    url:c.file_urls.original,
                    filename: c.original_filename,
                    mimetype: c.mime_type
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
  }, [url.url]);

  return (
    <div> 
      <div>{posts.map(entry =>
      entry.url != null ? (
          <li className="list-none hover:list-disc">
          <a href={entry.url}>{entry.filename}</a> 
          </li>) :""
          )}       
      </div>

      <div>{posts.map(entry =>    
           entry.mimetype === "image/jpeg" ||  entry.mimetype === "image/png" ?
          (<img src={entry.url} alt={entry.filename} className="h-40 inline-block mr-2"/>) : "") 
          }
      </div>

    </div> 

    );
}