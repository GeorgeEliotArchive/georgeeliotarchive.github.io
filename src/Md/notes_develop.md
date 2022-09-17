## Notes for development

1. If you want to change redirect link for the other items on the navbar, you must change them in the <navbar.js> file and then change them in the route object in <app.js>.
 - In order to change landing page, go to <package.json> and change "homepage" to the landing url for the repository. I recommend also changing the issues link and the git link to the current repository as well.
 - Currently unsure as documentation is a little lacking, but it seems this makes navigation a little funky for the repository. --Will try to fix if given priority.
2. Additional projects (chronology and relationship mapping) are not needed for the sister test sites at this time. This will help reduce loading stress. 
3. For now, I will forego doing any significant design changes to test sister sites. I will focus solely on development, but will include enough changes that there is a distinction.
4. Pdf elements are now generated separately. This allows Dr. Bev or any student that needs to do formatting changes that much needed flexibility. This seems to have also fixed padding issues. All of these changes and the area of importance for changing pdfMake formatting can be found in <singleitem.js>.
5. Any changes to the footer of the github.io page can be found in <footer.js>.
6. API Json seems to have a label for collection, might be able to add that to cover sheets.