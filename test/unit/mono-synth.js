const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-mono-synth', () => {

	it('looks the same', () => {
		return snapshotComponent('mono-synth', '<tone-mono-synth></tone-mono-synth>', () => {
			const synth = new Tone.MonoSynth()
			document.querySelector('tone-mono-synth').bind(synth)
		})
	})
})
