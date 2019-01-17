
	 var esClient = require('./connection.js');  

 const createUser = function createUser(userData) {
    esClient.index(userData,function(err,resp,status) {
    console.log(resp);
});
};
module.exports = createUser