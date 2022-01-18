
import React from "react";
import importImageNnebraska from '../Images/logo_nebraska.jpg';
import importImageAU from '../Images/logo_auhorizontal.png';
import importImageArchive from '../Images/logo_archive.jpg';
import importImageCopyright from '../Images/copy_right_88x31.png';

const Footer = () => (
  <div className="footer">
      <img src={importImageNnebraska} alt='Negraska'></img>
      <img src={importImageAU} alt='AU'></img>
      <img className="right_image" src={importImageArchive} alt='Archive'></img>
      
      <br/>
      <p className="center_image">
      <img src={importImageCopyright} alt='copy right'></img>
      </p>
    <p className="foot_text"><a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
        Copyright license</a>: CC-BY-NC-SA 4.0 Sharing is permitted for non-commercial purposes with attribution to this database, 
        the George Eliot Archive, edited by Beverley Park Rilett.</p>
  </div>
);

export default Footer;