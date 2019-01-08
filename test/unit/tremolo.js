const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-tremolo', () => {

	it('looks the same', () => {
		return snapshotComponent('tremolo', '<tone-tremolo></tone-tremolo>', () => {
			const effect = new Tone.Tremolo()
			document.querySelector('tone-tremolo').bind(effect)
		})
	})
})
