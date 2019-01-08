const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-duo-synth', () => {

	it('looks the same', () => {
		return snapshotComponent('duo-synth', '<tone-duo-synth></tone-duo-synth>', () => {
			const synth = new Tone.DuoSynth()
			document.querySelector('tone-duo-synth').bind(synth)
		})
	})
})
