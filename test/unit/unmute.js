const { snapshotComponent } = require('../helpers/screenshot')
const { getPage } = require('../helpers/page')
const { expect } = require('chai')

describe('tone-unmute', () => {

	it('looks the same', () => {
		return snapshotComponent('unmute', '<tone-unmute></tone-unmute>', undefined, [700, 0, 100, 100])
	})

	/*it('is initially muted', () => {
		return getPage('unmute', async page => {

			const initiallySuspended = await page.evaluate(async () => {
				return document.querySelector('tone-unmute').suspended
			})
			expect(initiallySuspended).to.be.true

		})
	})*/

	/*it('is the same state as the context', () => {
		return getPage('unmute', async page => {
			
			await page.waitFor(200)
			
			const contextState = await page.evaluate(async () => {
				return Tone.context.state
			})
			const suspended = await page.evaluate(async () => {
				return document.querySelector('tone-unmute').suspended
			})
			const buttonState = suspended ? 'suspended' : 'running'

			expect(contextState).to.equal(buttonState)

		})
		
	})*/
})
