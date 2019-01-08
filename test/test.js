const unitTests = require('path').join(__dirname, 'unit')

require('fs').readdirSync(unitTests).forEach(function(file){
	require('./unit/' + file)
})

