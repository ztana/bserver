const graphql = require("graphql");

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

const BookType = new  GraphQLObjectType({
	name: 'Book',
	fields : () => ({
		id : { type:  GraphQLString},
		name:{type: GraphQLString),
		description: {type:  GraphQLString},
		link:{type: GraphQLString}
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields:{
		bookWithId:{
			type: BookType,
			args:{id:{type: GraphQLString}}
			resolve(parent, args) {
				
			}
		}
	}
});

module.exports = new GraphqQLSchema({
	query : RootQuery
});
