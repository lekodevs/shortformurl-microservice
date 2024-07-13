# shortformurl-microservice

This project aim to shorten a url provided via an api call on the below apis that are made available:
Please see the shortformurl.postman_collection.json

#Note:
> The service consists of (5 api REST endpoints ) 
> Utilises Postgres Database to store the created urls 
> Express is the server used to run the application


## Start up the project

To start the service, follow these 4 simple steps:

1. Clone this repository locally. 
 
2. Create a new postgres database through the provided db.changeset.sql file 

3. Update the datasource.js file with your database connection details

4. Run the `npm run dev`

That's it!  You now have a working "shortformurl-microservice" project you can use to shorten your urls.
