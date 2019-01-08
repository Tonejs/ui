const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-noise-synth', () => {

	it('looks the same', () => {
		return snapshotComponent('noise-synth', '<tone-noise-synth></tone-noise-synth>', () => {
			const synth = new Tone.NoiseSynth()
			document.querySelector('tone-noise-synth').bind(synth)
		})
	})
})
