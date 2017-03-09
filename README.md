# Bounty: Web Ticket Management System

The Bug Ticket Management System (BTMS) objectives are to provide engineers to  see, create and track software issues. The bugs can be created by one support engineer and resolved by a product engineer.
 
There are 3 roles:
* Support Engineer
* Product Engineer
* Admin

Functionality (you can choose some or all):
* Admin
 * An admin will have a login into BTMS.
 * He can create username and password(along with other details) for a new engineer.
 * He can assign an engineer as a support engineer or a product engineer.
 * He can delete a engineer from database.
 
* Product Engineer
 * A product Enginner will login into BTMS using his credentials.
 * He can see list of bugs assigned to him.Filter them based on due dates,priority etc.
 * He can update a bug assigned to him i.e mark it resolved,add a comment.
 
* Support Engineer
 * A support Enginner will login into BTMS using his credentials.
 * He can see the lists of bug he has created and their status(resolved or not)
 * He can create a new bug with some details like Bug Name,Description,Due Date,etc.
 * He can assign/reassign his bug to any of the product engineer.
 
* Common:
 * Login
 * Logout
 * Creating/Updating an issue
 * Showing List of Issues - This module allows users to see list of issues created by him or assigned to him. There can be a filter here. Also there can be a carousel here containing two or three items like one having data showing monthwise issue resolved, other having data showing pending issues. Feel free to show  any type of analytics(graphs,tables) here.
 
Task and Implementation:
 * Your task is to create an implementation of the Bug Ticket Management System. You are free to choose the framework of your choice. We would prefer EmberJS, Angular or React
 * You can choose which features you want to include in it according to the time alloted.
 * We would like you to definitiely include relevant test cases
 * We would like you to definitiely include a build task/process which will create production assets — index.html, index.js, index.css, and a versioned `combined.html` which will have embedded production assests and a comment with the version (this should get console logged when open in a browser)
 
Remember we are going to evaluate you on the following parameters:
 * How you think and how creative you are
 * How you code - structure, comments, and efficiency
 * And how quickly can you learn
 * The UI/UX that are you are able to create very quickly.
