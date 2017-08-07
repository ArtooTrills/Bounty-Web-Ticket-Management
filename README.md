# Node-Angular-Mongo Bounty-Web-Ticket-Management

A Node app built with MongoDB and Angular.

## Requirements

- [Node and npm](http://nodejs.org)
- MongoDB: Make sure you have your own local or remote MongoDB database URI configured in `config/database.js`

## Installation

1. Clone the repository: `git clone https://github.com/shikha/Bounty-Web-Ticket-Management.git`
2. Install the application: `npm install`
3. Install mongoDB
4. Place your own MongoDB URI in `config/database.js`
5. Start the server: `node app.js`
6. View in browser at `http://localhost:8118/login`

## FUNCTIONALITY

Bounty: Web Ticket Management System

The Bug Ticket Management System (BTMS) objectives are to provide engineers to see, create and track software issues.
The bugs can be created by a support engineer and resolved by a product engineer.

The project covers the following features :

SUMMARY (Detailed flow is mentioned below)
---------
There are 3 roles:

-Support Engineer
-Product Engineer
-Admin

Functionality:

Admin

An admin will login into BTMS using default admin/admin username/password
He can create username and password(along with other details) for a new engineer.
He can assign an engineer as a support engineer or a product engineer.

Product Engineer

A product Enginner will login into BTMS using his credentials.
He can see list of bugs assigned to him.Filter them based on due dates,priority etc.
He can update a bug assigned to him i.e mark it resolved,add a comment.

Support Engineer

A support Enginner will login into BTMS using his credentials.
He can see the lists of bug he has created and their status(resolved or not)
He can create a new bug with some details like Bug Name,Description,Due Date,etc.

Note
------------
He can assign/reassign his bug to any of engineer who belongs to role 'Product'

---------------------------------------------------------------------------------------------------------------------------------------------------
DETAILED FLOW : Common Features 

Login Flow:
----------

1. Authetication/Authrization Handling

	-session management : Authorization header 
		Apis : verifySession / restoreSession
		
	-Based on role authentication happens.
		-Support Engineer
		-Product Engineer
		-Admin
		
	-userName/Password/role combination verifcation
	-examples :
		-'User Not Found with username '
		-'Authencation failed: Invalid Password'
		-'Registration failed'
		-'User already exists with username: ' 

2. Client side validation:

	-userName/Password/role fields
	-Login type is available

Apis :

	-verifyCredentials
	-getUserRoles
	
3. Admin Login Flow :

	-An admin will login into BTMS using default admin/admin username/password
	-On success : Admin Registration Flow 
	
4. Engineer Login Flow :
	
	Product/Support Engineer
	
	-A product Enginner will login into BTMS using his credentials.
	-On success : Ticket Management Flow

	
Admin Registration Flow :
------------------------	

	-He can create username and password(along with other details) for a new engineer.
	-He can assign an engineer as a support engineer or a product engineer.

Apis :

	-validateRegistration
	-getUserRoles	


Ticket Management Flow :
-----------------------	


	-Creating/Updating an issue :
	-Showing List of Issues :

	Product Engineer
	
		-He can see list of bugs assigned to him.Filter them based on due dates,priority etc.
		-He can update a bug assigned to him i.e mark it resolved,add a comment.	
	
	Support Engineer
	
		-He can see the lists of bug he has created and their status(resolved or not)	
		-He can create a new bug with some details like Bug Name,Description,Due Date,etc.
		-He delete a resolved ticket.

Apis :

	-getTickets
	-createTickets
	-delete resolved tickets
	-updateTicket: status to resolve
	
	
Logout Flow
------------

Task and Implementation:
--------------------------
	-Angular, Node Js and Mongo DB.
	-Exception handling/errorHandler of angular
	-Session management : Authorization header

