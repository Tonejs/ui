const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-envelope', () => {

	it('looks the same', () => {
		return snapshotComponent('envelope', '<tone-envelope></tone-envelope>', () => {
			const envelope = new Tone.Envelope()
			document.querySelector('tone-envelope').bind(envelope)
		})
	})

	it('looks the same collapsed', () => {
		return snapshotComponent('envelope-collapsed', '<tone-envelope collapsed></tone-envelope>', () => {
			const envelope = new Tone.Envelope({
				attack : 0.4,
				decay : 0.2,
				sustain : 0.5,
				release : 1,
				releaseCurve : 'linear'
			})
			document.querySelector('tone-envelope').bind(envelope)
		})
	})
})
