Instructions for generating PDF cover pages for documents we share to indicate original source
# Table of Contents

1. PDF Generation
  - How is it done?
  - Where is located?
  - How do I use it?
2. Instructions for Uploading to Omeka
  - How do I upload new files to Omeka?
  - Git Editor's Advice about Omeka Nuances
  - A note regarding original pdf editor errors
3. FAQ
  
## 1. PDF Generation
The main feature of this repository is to explain to George Eliot Archive project team members how to automatically procure cover sheets for pdfs that will be hosted on the public websites (Archive, Scholars, Review). The cover sheet will remind those who download documents where they procured them so that they can properly cite THEIR SOURCE. Our project website information is provided, along with rights information for further sharing (default is CC BY-NC-SA 4.0). The cover page also provides information on OUR SOURCE --the original publication information and, if not digitized by us, then the organization responsible for digitizing the document, for verification and transparency.

#### How is it done?
Basically, we've utilized a Javascript library called "pdfMake" to render these cover sheets and attach them to pdfs. This process for the user is thankfully straight-
forward. The website itself is bootstrapped using React and hosted as a Git Page.

#### Where is it located?
You can find this functionality by navigating to https://georgeeliotarchive.github.io/ . Then, go to "Collections". If you go straight to Collections via this url
-> https://georgeeliotarchive.github.io/collectionlist , you will come across an Error 404 screen. Perhaps this is something that will be addressed later on, but for now
attention lies elsewhere.

If you're looking for the Scholars version, go to https://georgeeliotarchive.github.io/georgeeliotscholars/ . Same procedure applies as described below.

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

  1. Login to the admin side of the omeka sites (i.e. georgeeliotarchive.org/admin , georgeeliotscholars.org/admin)
  2. Go to "Collections" and navigate to the collection where the item in question is.
    - Click the total number of items in the collection instead of the name of the collection. This will pull up a nice table that will help with finding
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
pdfMake is pretty awkward to work with in regards to how our data is stored. There also seems to be some editor discrepancies with how our data was stored (i.e. a lack of \<em>
 tags when they should be present). These descrepancies will affect the turn out of the generated pdf, so make sure to review them before uploading. 
 
## 3. FAQ

Q. The mergePDF button doesn't work. What should I do now?

If the mergePDF button doesn't work, it is because the pdf version on Omeka is depricated (older than version 1.7). In order to correct this, you must download the current pdf, optimize it for version 1.7 (Acrobat 8) and then replace the old one on Omeka. To do this, you can use Adobe Acrobat. Adobe Acrobat is free (at the time of writing this) for Auburn students. Simply sign in using your auburn email. After downloading Adobe Acrobat, follow the instructions on this [link](https://answers.acrobatusers.com/How-I-save-pdf-lower-revision-level-q121604.aspx#:~:text=To%20change%20the%20version%20of,PDF%20version%20is%20compatible%20with.)
    
