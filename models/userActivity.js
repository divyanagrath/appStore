const userActivity = {
  body: {
    type: 'object',
    required: [ 'appId', 'userId', 'activity' ],
    properties: {
      appId: {
        type: 'string'
      },
	  userId: {
        type: 'string'
      },
	  activity: {
        type: 'string'
      },
      createdAt: {
        type: 'string'
      },
      updatedAt: {
        type: 'string'
      }
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      required: [ 'userActivityId' ],
      properties: {
        userId: { type: 'string' }
      },
      additionalProperties: false
    }
  }
}


module.exports = {
  userActivity
}