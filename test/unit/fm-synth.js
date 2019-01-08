const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-fm-synth', () => {

	it('looks the same', () => {
		return snapshotComponent('fm-synth', '<tone-fm-synth></tone-fm-synth>', () => {
			const synth = new Tone.FMSynth()
			document.querySelector('tone-fm-synth').bind(synth)
		})
	})
})
