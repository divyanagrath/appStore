const appCreation = {
  body: {
    type: 'object',
    required: [ 'appName', 'appVersion', 'status', 'apkFile', 'createdAt' ],
    properties: {
		appName: {
			type: 'text'
		},
		appDescription: {
			type: 'text'
		},
		appVersion: {
			type: 'text'
		},
		status: {
			type: 'text'
		},
		apkFile: {
			type: 'text'
		},
		createdAt: {
			type: 'text'
		}
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      required: [ 'appId' ],
      properties: {
        appId: { type: 'string' }
      },
      additionalProperties: false
    }
  }
}


module.exports = {
  appCreation
}