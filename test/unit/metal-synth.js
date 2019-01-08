const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-metal-synth', () => {

	it('looks the same', () => {
		return snapshotComponent('metal-synth', '<tone-metal-synth></tone-metal-synth>', () => {
			const synth = new Tone.MetalSynth()
			document.querySelector('tone-metal-synth').bind(synth)
		})
	})
})
