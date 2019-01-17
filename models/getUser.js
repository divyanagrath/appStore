const login = {
  body: {
    type: 'object',
    required: [ 'contactNumber', 'password' ],
    properties: {
      contactNumber: {
        type: 'string'
      },
      password: {
        type: 'string'
      }
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      required: [ 'userId' ],
      properties: {
        firstName: {
        type: 'string'
      },
	  lastName: {
        type: 'string'
      },
	  email: {
        type: 'string'
      },
      contactNumber: {
        type: 'string'
      },
	  role: {
        type: 'string'
      }
      },
      additionalProperties: false
    }
  }
}


module.exports = {
  login
}