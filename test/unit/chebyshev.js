const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-chebyshev', () => {

	it('looks the same', () => {
		return snapshotComponent('chebyshev', '<tone-chebyshev></tone-chebyshev>', () => {
			const effect = new Tone.Chebyshev()
			document.querySelector('tone-chebyshev').bind(effect)
		})
	})
})
