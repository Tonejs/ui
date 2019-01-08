const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-reverb', () => {

	it('looks the same', () => {
		return snapshotComponent('reverb', '<tone-reverb></tone-reverb>', () => {
			const effect = new Tone.Reverb()
			document.querySelector('tone-reverb').bind(effect)
		})
	})
})
