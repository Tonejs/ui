const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-slider', () => {

	it('looks the same', () => {
		return snapshotComponent('slider', '<tone-slider label="Slider"></tone-slider>')
	})
})
