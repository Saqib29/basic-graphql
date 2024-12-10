# Apollo + Express + GraphQL


### To run the project:
First clone the project by this command:
>`$ git clone git@github.com:Saqib29/basic-graphql.git`

Got to the `nodejs_graphql` directory by this command:
>`$ cd nodejs_graphql/`

To run the db in docker container, run this command:
`$ docker compose up --build --detach`

Install the packages with this command:
>`$ yarn install`

To start the project:
>`$ node index.js`

Not visit the this __http://localhost:3000/graphql__.
<span style="color:white">Now play!</span>


#### To generate model through sequelize:
>`$ yarn sequelize model:generate --name <model_name> --attributes <field_name>:<field_type>,<field_name>:<field_type>,....`

#### to migrate the db run the commands:
>`$ yarn sequelize db:migrate`