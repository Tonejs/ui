const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-grain-player', () => {

	it('looks the same', () => {
		return snapshotComponent('grain-player', '<tone-grain-player></tone-grain-player>', () => {
			const player = new Tone.GrainPlayer('./audio/FWDL.mp3')
			document.querySelector('tone-grain-player').bind(player)
		}, undefined, true)
	})
})
