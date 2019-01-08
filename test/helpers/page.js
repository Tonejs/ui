const puppeteer = require('puppeteer')
const { resolve } = require('path')

module.exports = {
	getPage : async function(url, callback){
		return new Promise(async (done, error) => {
			const browser = await puppeteer.launch({ args : ['--disable-web-security'] })
			const page = await browser.newPage()
			page.on('pageerror', e => error(e))

			await page.goto(`file://${resolve(__dirname, '../html', `${url}.html`)}`, {
				waitUntil : 'networkidle0'
			})
			
			await callback(page)
			await browser.close()
			done()
		})
	},
	renderPage : async function(htmlString, callback){
		await getPage('basic', async page => {
			await page.evaluate(str => document.body.innerHTML = str, htmlString)
			await callback(page)
		})
	}
}
