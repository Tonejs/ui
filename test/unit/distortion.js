const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-distortion', () => {

	it('looks the same', () => {
		return snapshotComponent('distortion', '<tone-distortion></tone-distortion>', () => {
			const effect = new Tone.Distortion()
			document.querySelector('tone-distortion').bind(effect)
		})
	})
})
