const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-synth', () => {

	it('looks the same', () => {
		return snapshotComponent('synth', '<tone-synth></tone-synth>', () => {
			const synth = new Tone.Synth()
			document.querySelector('tone-synth').bind(synth)
		})
	})
})
