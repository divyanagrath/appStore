const aapList = {
  response: {
    200: {
      type: 'object',
      properties: {
		appId: {
			type: 'text'
		},  
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
    }
  }
}


module.exports = {
  aapList
}