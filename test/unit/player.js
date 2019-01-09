const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-player', () => {

	it('looks the same', () => {
		return snapshotComponent('player', '<tone-player></tone-player>', () => {
			const player = new Tone.Player('./audio/FWDL.mp3')
			document.querySelector('tone-player').bind(player)
		}, undefined, true)
	})

	it('looks the same collapsed', () => {
		return snapshotComponent('player-collapsed', '<tone-player collapsed></tone-player>', () => {
			const player = new Tone.Player('./audio/FWDL.mp3')
			document.querySelector('tone-player').bind(player)
		}, undefined, true)
	})
})
