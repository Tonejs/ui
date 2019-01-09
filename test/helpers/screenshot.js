const { resolve } = require('path')
const resemble = require('node-resemble-js')
const fs = require('fs-extra')
const { expect } = require('chai')
const { getPage } = require('./page')

const FORCE_RECAPTURE = false

async function screenshotPage(page, name){
	const tmpScreenshotURL = resolve(__dirname, '../screenshots', `${name}-tmp.png`)
	const screenshotURL = resolve(__dirname, '../screenshots', `${name}.png`)

	let recapture = !(await fs.exists(screenshotURL)) || FORCE_RECAPTURE

	if (recapture){
		console.log('generating screenshot')
	}

	await page.screenshot({ path : recapture ? screenshotURL : tmpScreenshotURL })

	if (!recapture){
		const data = await new Promise(done => {
			resemble(screenshotURL).compareTo(tmpScreenshotURL).onComplete(d => done(d))
		})

		expect(parseFloat(data.misMatchPercentage)).to.be.lte(10)

		//delete the screenshot at the end
		await fs.remove(tmpScreenshotURL)
	}
}

module.exports = {

	compareScreenshot : async function(url){
		await getPage(url, async page => {
			await screenshotPage(page, url)
		})
	},

	snapshotComponent : async function(name, htmlString, callback=()=>{}, loading=false){
		await getPage('snapshot_test', async page => {
			await page.evaluate(str => document.body.innerHTML = str, htmlString)
			await page.evaluate(callback)
			if (loading){
				await page.evaluate(async () => await Tone.loaded())
			}
			await screenshotPage(page, name)
		})
	}
}
