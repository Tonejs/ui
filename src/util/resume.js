const silentAudio = 'data:audio/mp3;base64,//MkxAAHiAICWABElBeKPL/RANb2w+yiT1g/gTok//lP/W/l3h8QO/OCdCqCW2Cw//MkxAQHkAIWUAhEmAQXWUOFW2dxPu//9mr60ElY5sseQ+xxesmHKtZr7bsqqX2L//MkxAgFwAYiQAhEAC2hq22d3///9FTV6tA36JdgBJoOGgc+7qvqej5Zu7/7uI9l//MkxBQHAAYi8AhEAO193vt9KGOq+6qcT7hhfN5FTInmwk8RkqKImTM55pRQHQSq//MkxBsGkgoIAABHhTACIJLf99nVI///yuW1uBqWfEu7CgNPWGpUadBmZ////4sL//MkxCMHMAH9iABEmAsKioqKigsLCwtVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVV//MkxCkECAUYCAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'

/**
 * Start hte audio context if it's not already
 * must be called from a click event
 */
export async function resume(e){
	if (Tone.context.state === 'suspended'){
		const contextPromise = Tone.context.resume()

		//also play a silent audio file which unmutes iOS
		const audioElement = document.createElement('audio')
		audioElement.controls = false
		audioElement.preload = 'auto'
		audioElement.loop = false
		audioElement.src = silentAudio
		audioElement.title = 'Tone.js Examples'
		let elementPromise = Promise.resolve()
		try {
			elementPromise = await audioElement.play()
		} catch (e){
			elementPromise = Promise.resolve()
			console.log('did not start audio')
		}
		await Promise.all([elementPromise, contextPromise])
	}
}
