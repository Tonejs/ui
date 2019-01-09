const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-select-attribute', () => {

	it('looks the same', () => {
		return snapshotComponent('select-attribute', `
			<tone-select-attribute label="Select Attribute">
				<option value="1">one</option>
				<option value="2">two</option>
				<option value="3">three</option>
				<option value="4">four</option>
			</tone-select-attribute>`, undefined, [0, 0, 800, 100])
	})
})
