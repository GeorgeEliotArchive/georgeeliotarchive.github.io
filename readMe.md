# Table of Contents

1. PDF Generation
  a. How is it done?
  b. Where is located?
  c. How do I use it?
2. Instructions for Uploading to Omeka
  a. How do I upload new files to Omeka?
  b. Git Editor's Advice about Omeka Nuances
  c. A note regarding original pdf editor errors
  
  
## 1. PDF Generation
The main feature of these development sites is the capability to automatically procure cover sheets for pdfs that will be hosted on the professional builds of the George
Eliot Digital Projects websites (Archive, Scholars, Review). 

#### How is it done?
Basically, we've utilized a Javascript library called "pdfMake" to render these cover sheets and attach them to pdfs. This process for the user is thankfully straight-
forward. The website itself is bootstrapped using React and hosted as a Git Page.

#### Where is it located?
You can find this functionality by navigating to https://georgeeliotarchive.github.io/ . Then, go to "Collections". If you go straight to Collections via this url
-> https://georgeeliotarchive.github.io/collectionlist , you will come across an Error 404 screen. Perhaps this is something that will be addressed later on, but for now
attention lies elsewhere.

#### How do I use it?

To begin, 
      1. Go to "Collections" on the nav bar. 
      2. Identify the item you are replacing. Having the name will allow you to input it into a search bar to speed up searching for the pdf.
      3. Click on the finger to expand the item into a detailed view.
      4. Click "Download Merged PDF" button in detailed view.
After all of this is done, you should have a copy of the original pdf with the new cover sheet attached.

## 2. Instructions for Uploading to Omeka

#### How do I upload new files to Omeka?
Upon downloading the newly created pdf,
      1. Login to the admin side of the omeka sites (i.e. georgeeliotarchive.org/admin)
      2. Go to "Collections" and navigate to the collection where the item in question is.
        i. Click the total number of items in the collection instead of the name of the collection. This will pull up a nice table that will help with finding
        pdfs in need of change.
      3. Click "edit" on the item.
      4. Go to the "Files" tab.
      5. Under "Add new files", click "Choose file".
      6. Add the merged pdf. Make sure to remove the merged part of the file name.
      7. Rearrange the order such that the new pdf is first and foremost.
      8. Save changes.
After this is done, the new file should appear as a button on the public side.

#### Git Editor's Advice
It is important that the new pdf is ordered first when editing. If you do not do so, users will continue to download the old pdf without the cover sheet. This is an
ongoing issue that the web development team is resolving and little information seems to exist on it in Omeka documentation or forum discussion.

#### A note regarding pdf editor errors
Some pdfs will not be in line with MLA standards. For pdfs with a copyright license, they most likely need to be within MLA standards so that the project does not get
in trouble. This might require you to go into the pdf using Adobe Acrobat (or equivalent) to edit the pdfs. This is not an issue with the functionality of the website.
pdfMake is pretty awkward to work with in regards to how our data is stored. There also seems to be some editor discrepancies with how our data was stored (i.e. a lack of <em>
 tags when they should be present). These descrepancies will affect the turn out of the generated pdf, so make sure to review them before uploading. 
      
