const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-noise', () => {

	it('looks the same', () => {
		return snapshotComponent('noise', '<tone-noise></tone-noise>', () => {
			const noise = new Tone.Noise()
			document.querySelector('tone-noise').bind(noise)
		})
	})
})
