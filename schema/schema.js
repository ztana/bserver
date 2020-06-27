const graphql = require("graphql");
const _ = require("lodash");

const Book = require('../model/book');

const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList} = graphql;

const BookType = new  GraphQLObjectType({
	name: 'Book',
	fields : () => ({
		id : { type:  GraphQLID},
		name:{type: GraphQLString},
		description: {type:  GraphQLString},
		link:{type: GraphQLString},
		imageCount: {type: GraphQLInt}
	})
});

const TagType = new GraphQLObjectType({
	name: 'Tag',
	fields: () => ({
		id: {type: GraphQLID},
		name: {type: GraphQLString}

	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields:{
		bookWithId:{
			type: BookType,
			args:{id:{type: GraphQLString}},
			resolve(parent, args) {
				return _find(books, {id: args.id});
			}
		},
		bookWithName: {
			type:BookType,
			args:{name: {type: GraphQLString}},
			resolve(parent, args) {
				return _find(books, {name: {$regex: '*'+args.name+'*'}});
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addBook: {
			type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    description: args.description
                });
                return book.save();
            }
		},
		mapBookLink: {
			type: BookType,
			args: {
					id: { type: new GraphQLNonNull(GraphQLID) },
					link: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, args){
					let book = _find(books, {id: args.id});
					book.link = args.link;
					return book.save();
			}
		}
	}
});

module.exports = new GraphqQLSchema({
	query : RootQuery,
  mutation: Mutation

});
