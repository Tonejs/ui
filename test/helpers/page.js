const puppeteer = require('puppeteer')
const { resolve } = require('path')

module.exports = {
	getPage : async function(url, callback){
		return new Promise(async (done, error) => {
			const browser = await puppeteer.launch({ args : ['--disable-web-security', '--no-sandbox'] })
			const page = await browser.newPage()
			page.on('pageerror', e => error(e))

			await page.goto(`http://localhost:9999/test/html/${url}.html`, {
				waitUntil : 'networkidle0'
			})
			try {
				await callback(page)
				done()
				await browser.close()
			} catch (e){
				await browser.close()
				error(e)
			}
		})
	},
	renderPage : async function(htmlString, callback){
		await getPage('basic', async page => {
			await page.evaluate(str => document.body.innerHTML = str, htmlString)
			await callback(page)
		})
	}
}
