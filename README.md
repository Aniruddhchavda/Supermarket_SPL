Supermarket_SPL

# How to setup the development environment and how to run the application

-> Dependencies : 
```
 - Front End :  Download NodeJs
 - Back End  :  Download Visual Studio 2019
 - Database  :  DownloadMicrosoft Sql Server and Microsoft Sql Server Management Studio 
```
Once the Dependencies are installed , it's time to setup each of them.

Front End : From the command prompt open the project folder , navigate to Front End folder and type "npm install" , this will install all the required packages and that is it , our front end has been setup.

Back End : For backend , navigate to the back end folder and open the WebApi.sln file in visual studio 2019.

Database : For setting up the database , Create a database named SupermaketDB , after selecting the DB , execute the below Queries to Create and Configure the tables.

////----------Start--------------/////

Query :
```
 CREATE TABLE Cart (
     CartID INT IDENTITY (1, 1) NOT NULL,
     ProductName varchar(50),
     ProductNumber INT,
     ProductPrice INT,
     ProductQuantity INT,
     PRIMARY KEY CLUSTERED (CartID ASC)
 );  

 CREATE TABLE CustomerTable (
     CustomerID INT IDENTITY (1, 1) NOT NULL,
     Total INT,
     PRIMARY KEY CLUSTERED (CustomerID ASC)
 );

 Insert into CustomerTable (Total) Values (0);
 Insert into CustomerTable (Total) Values (0);
 Insert into CustomerTable (Total) Values (0);
```
/// -----------END--------------- //// 

Congratulations, our development environment is setup , now let's see how to run the application. 

To run the back end , open the WebApi.sln in Visual Studio 2019 and click "WebApi" to start the back end. This will start the server and it will start listening for requests on port 53535.

To run the front end , open the FrontEnd folder from command prompt and execute the command "npm start" , that will start the front end on port 3000.

URL for cashier interface : localhost:3000              
URL for customer interface : localhost:3000/customer

That's it , our aplication is now up and running.

# Description of the Implementation

For the server(backend) we are using the MVC architecture i.e Model View Control. 

 - Model will define what variables a class should have. 
 - Controller will handle the requests based on the request type.Controller will be responsible to execute the queries in database.
 - We are not using the View functionality as we are usng component-based front end i.e React Javascript

 For the Client(frontend) we are using the component-based architecture , for which we are using React Javascript.
 - We have two seperate URLs for Cashier and Customer Interface. Cashier Display would be running on localhost:3000 and Customer Display would be running on localhost:3000/customer

 For state management we are using database - For instance : When cashier selects the payment tye , it should automatically get updated on customer display. This is achieved by maintaining a global variable in database which is accessible to every authorized component.

 # Test Data
 Products : 

    Product ID  : '001'           | Product Name : "PS5"           | Product Price : "400"
    Product ID  : '002'           | Product Name : "XBOX Series X" | Product Price : "500"
    Product ID  : '003'           | Product Name : "RTX 3080"      | Product Price : "700"
    Product ID  : '004'           | Product Name : "Mangoes"       | Product Price : "10"
    Product ID  : '0070662404041' | Product Name : "Noodles"       | Product Price : "10"

Card No & Pin :

    Card no : '1001' | Pin no : '1234'
    Card no : '2002' | Pin no : '2345'
    Card no : '505'  | Pin no : '9876'

