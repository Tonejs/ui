const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-freeverb', () => {

	it('looks the same', () => {
		return snapshotComponent('freeverb', '<tone-freeverb></tone-freeverb>', () => {
			const effect = new Tone.Freeverb()
			document.querySelector('tone-freeverb').bind(effect)
		})
	})
})
