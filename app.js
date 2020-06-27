const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema =  require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

mongoose.connect('mongodb://ztanap:ztana00@ds151070.mlab.com:51070/bdb_free')
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql:true

}));

app.listen(80, ()=>{
	console.log("start listening");
});
