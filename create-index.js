 const elasticsearch = require('elasticsearch');
  var esClient = new elasticsearch.Client({
    host: '127.0.0.1:9200',
    log: 'error'
  });

/*esClient.indices.create({  
  index: 'users'
});*/

esClient.indices.putMapping({
        index: "users",
        type: "document",
        body: {
            properties: {
                firstName: {
        type: 'text'
      },
	  lastName: {
        type: 'text'
      },
	  email: {
        type: 'text'
      },
      contactNumber: {
        type: 'text'
      },
      password: {
        type: 'text'
      },
	  role: {
        type: 'text'
      }
            }
        }
    });