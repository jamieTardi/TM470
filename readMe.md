# Operating System

Requires Windows, Mac OS or a distribution of Linux (currently built on Ubuntu)

# Getting Started

## Initial Setup

Install a version of Node JS to your operating system Follow the link to a LTS version. https://nodejs.org/en. Once installed check with `node --version`

Install NPM package manager to be able to run the packages. This requires node to be installed. This should be included with the current LTS for node. Check in your cli use the command `npm --version`

## Clone or download the repo TM470

Go to this link https://github.com/jamieTardi/TM470

Click the green box that says code

Either clone the file or simply download the zipped Folder.

## Enviormental variables

To allow for higher security API keys and connection strings are only stored locally in .env files. There are 4 keys that need to be used and need to be named apprioatly in the .env folder

### Client Side Env variables

1. Change Directory into client
2. Create a file called .env in the client folder
3. Inside the .env file create two env variables with these exact names: REACT_APP_WEATHER_KEY=[INSERT YOUR KEY HERE!] and REACT_APP_MAPBOX_KEY=[INSERT YOUR KEY HERE!].
4. Replace the [INSERT YOUR KEY HERE!] with your api key (these are free to use apis). Save the file.

   ### Server Env Variables

5. Change to the server directory
6. Create the .env file the same way
7. Add the env variables TOKEN_SECRET=[INSERT YOUR API KEY] MONGO_URI=[INSERT YOUR API KEY]
8. These are very important or the backend application will not run correctly and you will not be able to access the application.
9. The mongo noSQL database string can be accessed free at https://www.mongodb.com/cloud/atlas/lp/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core_prosp-brand_gic-null_emea-gb_ps-all_desktop_eng_lead&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624581&adgroup=115749705343&cq_cmp=12212624581&gad=1&gclid=Cj0KCQjwi46iBhDyARIsAE3nVrZWNJm_ltmKoYPSWbGReO_TK-Vn2VpitnwFNnO7eqRekTwLL-8KnDoaAqGHEALw_wcB you will need to make a account. 10. The token is a randomly generated hash and is used in the middle ware, this can be done using any random hash string generator but is required for the auth flow.

## Client Dependencies

1. In your terminal of choice navigate to the client folder
2. use the command `npm install`
3. This will install the front end dependencies and allow the application to run

## Server Dependencies

1. In your terminal of choice navigate to the server folder
2. use the command `npm install`
3. This will install the front end dependencies and allow the application to run

## Run the Server

1. All above steps must be complete
2. In your terminal of choice navigate to the server folder
3. Use the command `npm start`
4. If everything is installed the library nodemon should run and the server should run locally.

## Run the Client

1. All above steps must be complete and the server MUST be running
2. In your terminal of choice navigate to the client folder
3. Use the command `npm start`
4. The react front end should start and open up your default browser and the application will be fully accessible.
