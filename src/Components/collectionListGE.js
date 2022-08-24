
import React from "react";
import FetchCollectionList from "./collections/fetchcollectionlist";

/* Contains the pdf footer and header presets. Changing these will impact
 * the pdfmake generation result.
 * Last edited by Cj Short - Aug. 2022
 */


const apiurl = "https://georgeeliotarchive.org/api/collections";
const pdfheader = "GEORGE ELIOT ARCHIVE";
const pdffooter = "This article is brought to you by George Eliot Archive- a free online resource devoted to making" 
    + " scholarship about George Eliot accessible worldwide.";

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


