const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-ping-pong-delay', () => {

	it('looks the same', () => {
		return snapshotComponent('ping-pong-delay', '<tone-ping-pong-delay></tone-ping-pong-delay>', () => {
			const effect = new Tone.PingPongDelay()
			document.querySelector('tone-ping-pong-delay').bind(effect)
		})
	})
})
