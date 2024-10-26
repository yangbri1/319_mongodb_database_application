# Project Name
### Skill Based Assessment #7 --- <em> MongoDB Database Application </em>

- - - 

## $\color{green}{Project \: Description}$
### Create a Node, Express, and MongoDB server application. Topic and content for the web application is totally up for grasp. Creative freedom is a go and main objective follows ...

#### 1. Create a server application with Node.js, Express.js, and MongoDB (Document-oriented NoSQL).
#### 2. Create a CRUD API using Express and MongoDB.
#### 3. Create MongoDB indexes.
#### 4. Use MongoDB indexing (improve read performance while slow write performance) to make efficient queries.
#### 5. Create MongoDB validation rules.
#### 6/ Use MongoDB validation to ensure data consistency.

- - -

## $\color{lightblue}{Technologies \: Used}$
### JavaScript runtime environment:
#### Thunder-Client extension on VSCode

### NPM package manager on CLI to install dependencies:
#### Express (Node.js library): 'npm i express'
#### Zero-dependency module: 'npm i dotenv' -- for use of .env (environmental variables)
#### Mongoose (JS library): 'npm i mongoose'

### MongoDB queries
#### logcal operators: $and
#### comparison operators: $gt, $ne, $eq,

### Requirements in building a CRUD API
#### Setting up:'git init', 'npm init -y', 'npm i nodemon --save-dev' (global install once ever), 'npm - express mongodb dotenv'
#### '.env' file: PORT=3000 (standard), mongoURI = (connection string from personal cluster in MongoDB Compass)
#### 'db' directory > 'conn.mjs' -- creates a Mongoose connection to MongoDB database
#### 'routes' directory > 3 separate routes .mjs file each with GET, POST, PATCH/PUT, DELETE HTTP routes enclosed to access database

### Modular JavaScript file type
#### .mjs extension tells Node there will be some modular files to be import aka "await" which requires "async" functions

### MongoDB Compass
#### To receive a connection string to our personal cluster for the .env "mongoURI"
#### See our custom database being created and populated on the side under the cluster section

### Mongoose
#### mongoose.Schema(), schema fields, schema properties, mongoose.model()

### Mongoose schema validation rules/properties/validators
#### type, required, default, unique, lowercase, uppercase, min, message, enum (value, message)

### Schema indexing 
### Schema.index({Schema: 1 (or -1)}) -- sort database by either ascending (1) or descending (-1) order -- fast read, slow write

### Schema methods
#### static methods: Schema.statics.attribute -- every document now has that particular "attribute"

### Mongoose (Object Data Modeling) Model 
#### mongoose.model() -- create and read documents (instance of model) from MongoDB database

### Express Router():
#### methods: POST (router.post), GET (router.get), PATCH (router.patch), PUT (router.put), DELETE (router.delete), express.router()

### Express request parameters:
#### req.params & req.params.id (for :id)

### Body-Parser (no need to install separate dependencies as it's built-in Node.js Express)
#### import JavaScript middleware to parse out data
#### bodyParser.urlenencoded(), bodyParser.json()

### HTTP request / response object properties
#### req.params, res.send(), res.status(), res.json()

### JavaScript containers
#### arrays [], objects {}

### Git Bash: Linux commands on command line

### Git version control

* Others: Github add, commits; JS package, Express.js, MongoDB, Mongoose librares,  VSCode IDE, Thunder-Client extension, NPM JavaScript package manager, nodemon, dotenv

- - - 
## $\color{lightgreen}{How \: To \: Get \: Started}$
### **IMPORTANT**: 
### Meet the base minimum requirements (MVP) first before any creativity is involved. Although here in order to retrieve data from a mock database we need to think of a topic and gather from some in construction of our data datasets. Wireframe a little and refresh on some of the concepts from the lecture beneficial in fulfilling the the requirements. In addition test constantly using Thunder-Client, console log out errors to check, and commit early and frequently.

- - - 
## $\color{orange}{Acknowledgements}$
### All used source materals are stored in the "reference" folder of this repo.

### Mongoose concepts
#### https://mongoosejs.com/docs/schematypes.html
#### https://mongoosejs.com/docs/models.html
#### https://mongoosejs.com/docs/validation.html#the-unique-option-is-not-a-validator

### MongoDB $regex operator
#### https://www.mongodb.com/docs/manual/reference/operator/query/regex/?msockid=0196e6e3201a6f5504d5f2d421086e50

### MongoDB db.collection.find() method
#### https://www.mongodb.com/docs/manual/reference/method/db.collection.find/?msockid=0196e6e3201a6f5504d5f2d421086e50

### MongoDB unique index
#### https://www.mongodb.com/docs/manual/core/index-unique/

### Express() function
#### https://expressjs.com/en/api.html

### Regex (attempt to use in "devilFruitSchema.mjs" schema type validation for all "ZOAN" fruits)
#### https://stackoverflow.com/questions/4999064/regex-for-string-contains

### Query parameter valdation (thought about querying for limit or skip -- later)
#### https://apidog.com/blog/nodejs-express-get-query-params/#advanced-query-parameter-handling-with-middleware

### Pagination  (thought about pagination to show only certain # of documents (in JSON) at a time on browser -- later)
#### https://stackoverflow.com/questions/47169227/conditionally-using-request-parameters-for-skip-and-limit

### One Piece Wiki
#### https://www.animecharactersdatabase.com/allchars.php?id=1447
#### https://onepiece.fandom.com/wiki/Devil_Fruit
#### https://onepiece.fandom.com/wiki/Category:Kingdoms

### Lecture Notes
#### https://www.canva.com/design/DAFris9rfJ4/view
#### https://www.canva.com/design/DAFriu37FW4/view
#### https://www.canva.com/design/DAFriv14g-4/view
#### https://www.canva.com/design/DAFrigYKLP4/view
#### https://www.canva.com/design/DAFriluIZFQ/view

### LATEX code on Markdown styling
#### https://stackoverflow.com/questions/11509830/how-to-add-color-to-githubs-readme-md-file
#### https://tex.stackexchange.com/questions/74353/what-commands-are-there-for-horizontal-spacing

### Markdown Table Github Template from Dylan 
#### https://github.com/comeaudc/AnniesHardRockLife
- - -

## $\color{purple}{Setup}$


### API Reference
   VERB 		 | 		  PATH 		 |  	 DESCRIPTION
------------ | ------------- | -------------------
`GET` | `/characters` | Show all "One Piece" characters |
`POST` | `/characters` | Create a new character to be added to the characters database |
`GET` | `/characters/character/:id` | Retrieve a specific character by their unique "_id" |
`GET` | `/characters/bounties` | Display only characters with bounties on their head |
`GET` | `/characters/status` | Showcase all characters with either a "DEAD" or "ALIVE" status  |
`GET` | `/characters/status/dead` | Present only characters with a "DEAD" status |
`GET` | `/characters/status/alive` | Present only characters with an "ALIVE" status |
`PATCH` | `/characters/:id` | Access an existing character by their "_id" and update their bio |
`DELETE` | `/characters/:id` | Access a character by their "_id" and delete their info |
`GET` | `/devil_fruits` | Lay out all of the devil fruits listed in the database |
`GET` | `/devil_fruits/devil_fruit/:id` | Pick out one devil fruit by their unique "_id" |
`POST` | `/devil_fruits` | Make a new devil fruit to be saved into the devil fruits database (only if it passes the set validation rules) |
`GET` | `/devil_fruits/category/logia` | Set forth the "LOGIA" type devil fruits |
`GET` | `/devil_fruits/category/paramecia` | Portray the "PARAMECIA" type devil fruits |
`GET` | `/devil_fruits/category/zoan` | Accumulate ALL of the "ZOAN" type devil fruits (including "MYTHICAL ZOAN" and "ANCIENT ZOAN" into the equation) |
`GET` | `/devil_fruits/awakened` | Expose all awakened (boosted) devil fruits |
`GET` | `/devil_fruits/unawakened` | Reveal all unawakened (dormant) devil fruits |
`PATCH` | `/devil_fruits/:id` | Access an existing devil fruit by its request parameter ":id" and update its info |
`DELETE` | `/devil_fruits/:id` | Select a devil fruit by its ":id" to be expelled from the database |
`GET` | `/kingdoms` | Give away all "One Piece" kingdoms in the database |
`GET` | `/kingdoms/kingdom/:id` | Filter out one kingdom by its unique "_id" |
`POST` | `/kingdoms` | Add a kingdom to to the kingdoms database |
`GET` | `/kingdoms/gov_affilliated/yes` | Show all kingdoms under the World Government's control |
`GET` | `/kingdoms/gov_affiliated/no` | Display all kingdoms not under the World Government's banner |
`PUT` | `/kingdoms/:id` | Revise a kingdom's info |
`DELETE` | `/kingdoms/:id` | Erase a kingdom using the Ancient Weapon |
