const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-step-sequencer', () => {

	it('looks the same', () => {
		return snapshotComponent('step-sequencer', '<tone-step-sequencer></tone-step-sequencer>')
	})
})
