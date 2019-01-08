const { snapshotComponent } = require('../helpers/screenshot')

describe('tone-oscillator', () => {

	it('oscillator looks the same', () => {
		return snapshotComponent('oscillator-osc', `
			<tone-oscillator sourcetype="oscillator"></tone-oscillator>
		`, () => {
			const oscillator = new Tone.Oscillator()
			document.querySelector('tone-oscillator').bind(oscillator)
		})
	})

	it('fm looks the same', () => {
		return snapshotComponent('oscillator-fm', `
			<tone-oscillator sourcetype="fm" label="FMOscillator"></tone-oscillator>
		`, () => {
			const oscillator = new Tone.FMOscillator()
			document.querySelector('tone-oscillator').bind(oscillator)
		})
	})

	it('am looks the same', () => {
		return snapshotComponent('oscillator-am', `
			<tone-oscillator sourcetype="am" label="AMOscillator"></tone-oscillator>
		`, () => {
			const oscillator = new Tone.AMOscillator()
			document.querySelector('tone-oscillator').bind(oscillator)
		})
	})

	it('fat looks the same', () => {
		return snapshotComponent('oscillator-fat', `
			<tone-oscillator sourcetype="fat" label="FatOscillator"></tone-oscillator>
		`, () => {
			const oscillator = new Tone.FatOscillator()
			document.querySelector('tone-oscillator').bind(oscillator)
		})
	})

	it('pulse looks the same', () => {
		return snapshotComponent('oscillator-pulse', `
			<tone-oscillator sourcetype="pulse" label="PulseOscillator"></tone-oscillator>
		`, () => {
			const oscillator = new Tone.PulseOscillator()
			document.querySelector('tone-oscillator').bind(oscillator)
		})
	})

	it('pwm looks the same', () => {
		return snapshotComponent('oscillator-pwm', `
			<tone-oscillator sourcetype="pwm" label="PWMOscillator"></tone-oscillator>
		`, () => {
			const oscillator = new Tone.PWMOscillator()
			document.querySelector('tone-oscillator').bind(oscillator)
		})
	})
})
