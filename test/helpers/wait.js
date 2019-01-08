module.exports = function wait(ms){
	return new Promise(done => setTimeout(done, ms))
}
