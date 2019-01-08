const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-slider-2d', () => {

	it('looks the same', () => {
		return snapshotComponent('slider-2d', '<tone-slider-2d></tone-slider-2d>')
	})
})
