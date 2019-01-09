const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-select', () => {

	it('looks the same', () => {
		return snapshotComponent('select', `
			<tone-select>
				<option value="1">one</option>
				<option value="2">two</option>
				<option value="3">three</option>
				<option value="4">four</option>
			</tone-select>
		`, undefined, [0, 0, 300, 100])
	})
})
