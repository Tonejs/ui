const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-am-synth', () => {

	it('looks the same', () => {
		return snapshotComponent('am-synth', '<tone-am-synth></tone-am-synth>', () => {
			const synth = new Tone.AMSynth()
			document.querySelector('tone-am-synth').bind(synth)
		})
	})
})
