const { resolve } = require('path')
const resemble = require('node-resemble-js')
const fs = require('fs-extra')
const { expect } = require('chai')
const { getPage } = require('./page')

const FORCE_RECAPTURE = false

async function screenshotPage(page, name, crop=[0, 0, 800, 600]){
	const tmpScreenshotURL = resolve(__dirname, '../screenshots', `${name}-tmp.png`)
	const screenshotURL = resolve(__dirname, '../screenshots', `${name}.png`)

	let recapture = !(await fs.exists(screenshotURL)) || FORCE_RECAPTURE

	if (recapture){
		console.log('generating screenshot')
	}

	await page.screenshot({ 
		path : recapture ? screenshotURL : tmpScreenshotURL,
		clip : {
			x : crop[0],
			y : crop[1],
			width : crop[2],
			height : crop[3]
		}
	})

	if (!recapture){
		const data = await new Promise(done => {
			resemble(screenshotURL).compareTo(tmpScreenshotURL).onComplete(d => done(d))
		})
		//delete the screenshot at the end
		await fs.remove(tmpScreenshotURL)
		
		expect(parseFloat(data.misMatchPercentage)).to.be.lte(5)
	}
}

module.exports = {

	compareScreenshot : async function(url){
		await getPage(url, async page => {
			await screenshotPage(page, url)
		})
	},

	snapshotComponent : async function(name, htmlString, callback=()=>{}, crop=[0, 0, 800, 600], loading=false){
		await getPage('snapshot_test', async page => {
			await page.setViewport({
				width : 800,
				height : 600
			})
			await page.evaluate(str => document.body.innerHTML = str, htmlString)
			await page.evaluate(callback)
			if (loading){
				await page.evaluate(async () => await Tone.loaded())
			}
			await screenshotPage(page, name, crop)
		})
	}
}
