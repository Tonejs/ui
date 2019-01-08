const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-auto-filter', () => {

	it('looks the same', () => {
		return snapshotComponent('auto-filter', '<tone-auto-filter></tone-auto-filter>', () => {
			const autoFilter = new Tone.AutoFilter()
			document.querySelector('tone-auto-filter').bind(autoFilter)
		})
	})
})
