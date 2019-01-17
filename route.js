
const registration = require('./models/users')
const login = require('./models/getUser')
const createUser = require('./controllers/users.controller')
const elasticsearch = require('elasticsearch');

  var esClient = new elasticsearch.Client({
    host: '127.0.0.1:9200',
    log: 'error'
  });
	async function routes (fastify, options) {
		fastify.get('/', async (request, reply) => {
			return { hello: 'world' }
		})
  
		fastify.post('/register', { schema: registration },
		registerHandler);
   
		async function registerHandler (req, reply) {
			esClient.index({index: 'users',
						type: 'document',
						body: req.body }, 
				function(err, resp, status) {
					console.log(resp);
					reply.status(200).send({userId: resp._id});
				});
		}
		
		
		fastify.get('/user/:id', function (req, reply) {
			esClient.get({
				index: 'users',
				type: 'document',
				id: req.params.id
			}, function (err, response) {
				if (err) return reply.send(err)

				reply.send(response._source)
			})
		})
		
		
		fastify.post('/login', { schema: login }, loginHandler);
		
		async function loginHandler (req, reply) {
			const { contactNumber, password } = req.body
			esClient.search({
				index: 'users',
				type: 'document',
				body: {
					_source : ["firstName","lastName","email","role","contactNumber"],
					query: {

						bool : {
							must:[
							{match : { 'contactNumber': contactNumber }},
							{match : { 'password': password }}
							]
						}
								
					}
				}
			},function (error, response, status) {
				if (error){
					console.log('search error: '+error)
				}
				else {
					console.log(response.hits.hits[0]);
					reply.status(200).send({user: response.hits.hits[0]._source});
				}
			});
		}
		
	}


module.exports = routes