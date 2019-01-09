const { spawn } = require('child_process')
const { resolve } = require('path')

describe('TESTS', () => {

	let serverProcess = null

	before((done) => {
		const serverCommand = resolve(__dirname, '../node_modules/.bin/http-server')
		serverProcess = spawn(serverCommand, ['-p', '9999'])
		//give it a second for the server to start
		setTimeout(() => done(), 1000)
	})

	after(() => {
		serverProcess.kill()
	})
	
	const unitTests = require('path').join(__dirname, 'unit')

	require('fs').readdirSync(unitTests).forEach(function(file){
		require('./unit/' + file)
	})

})

