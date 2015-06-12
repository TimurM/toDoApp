#Angular Shopping List App

Link to the live site: 
http://timurmeyster.me/toDoApp/#

##Instructions

1) Replace the hardcoded shopping list with items retrieved from the mock REST endpoint: http://demo3374525.mockable.io/shopping-list
   There are no mock REST endpoints for adding or deleting items so you can just maintain this data locally in $shoppingService

2) Add functionality to remove items from the shopping list

3) Add functionality to add new items to the shopping list

4) Add functionality to sorting the items by name or type by clicking on the table header links

5) Add a text input where you can search for items by name or type.  As you type into the box, the list of items should update (i.e. If you starting typing "m", items like "milk" and "meat" would be in the list, but not "bananas")

6) Add pagination so that only 10 items display at a time, with buttons to toggle to next or previous page. 

Notes: Feel free to use any online resources to assist you.

##Getting Started 

open root directory and run 
```
 -m SimpleHTTPServer 
```

Resources used: 

* http://chariotsolutions.com/blog/post/angularjs-corner-using-promises-q-handle-asynchronous-calls/
* https://github.com/michaelbromley/angularUtils/tree/master/src/directives/pagination
* http://www.webdeveasy.com/javascript-promises-and-angularjs-q-service/