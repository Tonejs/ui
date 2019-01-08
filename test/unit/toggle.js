const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-toggle', () => {

	it('looks the same', () => {
		return snapshotComponent('toggle', '<tone-toggle label="Toggle"></tone-toggle>')
	})
})
