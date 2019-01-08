const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-membrane-synth', () => {

	it('looks the same', () => {
		return snapshotComponent('membrane-synth', '<tone-membrane-synth></tone-membrane-synth>', () => {
			const synth = new Tone.MembraneSynth()
			document.querySelector('tone-membrane-synth').bind(synth)
		})
	})
})
