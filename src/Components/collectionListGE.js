
import React from "react";
import FetchCollectionList from "./collections/fetchcollectionlist";



const apiurl = "https://georgeeliotarchive.org/api/collections";
const pdfheader = "GEORGE ELIOT ARCHIVE";
const pdffooter = "Sharing is permitted for non-commercial purposes with attribution to this database, the George Eliot Archive, edited by Beverley Park Rilett.";

export default class CollectionListGE extends React.Component{
    render(){
        return (
            <div>       
                <FetchCollectionList dataFromParent = {apiurl} 
                    pdfHeader={pdfheader} 
                    pdfFooter={pdffooter} />            
            </div>
        )
    }
}


