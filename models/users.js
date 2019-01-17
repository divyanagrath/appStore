const registration = {
  body: {
    type: 'object',
    required: [ 'firstName', 'contactNumber', 'password' ],
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
      password: {
        type: 'string'
      },
	  role: {
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
        userId: { type: 'string' }
      },
      additionalProperties: false
    }
  }
}


module.exports = {
  registration
}