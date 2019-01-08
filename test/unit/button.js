const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-button', () => {

	it('looks the same', () => {
		return snapshotComponent('button', '<tone-button label="Button"></tone-button>')
	})
})
