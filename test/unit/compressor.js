const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-compressor', () => {

	it('looks the same', () => {
		return snapshotComponent('compressor', '<tone-compressor></tone-compressor>', () => {
			const compressor = new Tone.Compressor()
			document.querySelector('tone-compressor').bind(compressor)
		})
	})
})
