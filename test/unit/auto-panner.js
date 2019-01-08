const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-auto-panner', () => {

	it('looks the same', () => {
		return snapshotComponent('auto-panner', '<tone-auto-panner></tone-auto-panner>', () => {
			const autoPanner = new Tone.AutoPanner()
			document.querySelector('tone-auto-panner').bind(autoPanner)
		})
	})
})
