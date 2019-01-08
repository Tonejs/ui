const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-play-toggle', () => {

	it('looks the same', () => {
		return snapshotComponent('play-toggle', '<tone-play-toggle></tone-play-toggle>')
	})
})
