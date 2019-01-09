const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-sampler', () => {

	it('looks the same', () => {
		return snapshotComponent('sampler', '<tone-sampler></tone-sampler>', () => {
			const sampler = new Tone.Sampler({
				C2 : 'C2.mp3'
			}, {
				baseUrl : './audio/casio/'
			})
			document.querySelector('tone-sampler').bind(sampler)
		}, undefined, true)
	})
})
