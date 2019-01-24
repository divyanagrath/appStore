
const registration = require('./models/users')
const login = require('./models/getUser')
const app = require('./models/app')
const aapList = require('./models/getApps')
const userActivity = require('./models/userActivity')

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
  
		//user registration
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
		
		//get user by id
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
		
		
		//user login
		fastify.post('/login',  { schema: login } , loginHandler);
		
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
					var user = response.hits.hits[0]._source
					user = {...user,id : response.hits.hits[0]._id}
					reply.status(200).send(user);
				}
			});
		}
		
		
		//app creation
		fastify.post('/create-app', { schema: app } ,
		appCreationHandler);
   
		async function appCreationHandler (req, reply) {
			esClient.index({index: 'app',
						type: 'document',
						body: req.body }, 
				function(err, resp, status) {
					console.log(resp);
					reply.status(200).send({appId: resp._id});
				});
		}
		
		//fetch list of apps
		fastify.get('/fetch-app-list', appListHandler);
		
		async function appListHandler (req, reply) {
			esClient.search({
				index: 'app',
				type: 'document'
			}, function (err, response) {
				if (err) return reply.send(err)
				var apps = [];
				response.hits.hits.forEach(function(hit){
					var app = hit._source
					app = {...app,appId : hit._id}
					apps.push(app);
					console.log(hit);
				})
				reply.status(200).send(apps);
			})
		}
		
		
		//persist user activity
		fastify.post('/persist-user-activity', { schema: userActivity } ,
		userActivityHandler);
   
		async function userActivityHandler (req, reply) {
			esClient.index({index: 'user_activity',
						type: 'document',
						body: req.body }, 
				function(err, resp, status) {
					console.log(resp);
					reply.status(200).send({userActivityId: resp._id});
				});
		}
		
		
		//fetch user activity
		fastify.get('/fetch-user-activity/:id', fetchActivityHandler);
		
		async function fetchActivityHandler (req, reply) {
			esClient.search({
				index: 'user_activity',
				type: 'document',
				body: {
					_source : ["userId","appId","activity","createdAt","updatedAt"],
					query: {

						bool : {
							must:[
							{match : { 'userId': req.params.id }}
							]
						}
								
					}
				}
			},async function (error, response, status) {
				if (error){
					console.log('search error: '+error)
				}
				else {
					var activities = [];
						//await Promise.all(response.hits.hits.map(async function(hit){
						for (const hit of response.hits.hits) {
							var activity = hit._source
							var app = await fetchAppDetails(activity.appId);
							
							console.log(app);
							activity = {...activity,app : app}
							activities.push(activity);
							console.log(activity);
					}
					reply.status(200).send(activities);
				}
			});
		}
		
		async function fetchAppDetails (appId) {
			return new Promise((resolve,reject)=>{
				esClient.get({
					index: 'app',
					type: 'document',
					id: appId
				}, function (err, response) {
					if(err){
						reject(err);
					}
					else{
						resolve(response._source)
					}

				});
			});   
		}
		
	}


module.exports = routes