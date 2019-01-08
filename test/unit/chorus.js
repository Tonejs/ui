const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-chorus', () => {

	it('looks the same', () => {
		return snapshotComponent('chorus', '<tone-chorus></tone-chorus>', () => {
			const effect = new Tone.Chorus()
			document.querySelector('tone-chorus').bind(effect)
		})
	})
})
