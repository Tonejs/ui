const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-keyboard', () => {

	it('looks the same', () => {
		return snapshotComponent('keyboard', '<tone-keyboard></tone-keyboard>')
	})
})
