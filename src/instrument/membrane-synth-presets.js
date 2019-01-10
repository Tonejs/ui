export const presets = [{
	pitchDecay : 0.0033411764705882354,
	octaves : 0.8300000000000001,
	oscillator : {
		frequency : 440,
		detune : 0,
		phase : 0,
		type : 'fmsine',
		modulationIndex : 0.1,
		modulationType : 'sawtooth',
		harmonicity : 0.44,
		volume : 0,
		mute : false
	},
	envelope : {
		attack : 0.0006,
		decay : 0.25,
		sustain : 0,
		release : 1.4,
		attackCurve : 'exponential',
		decayCurve : 'exponential',
		releaseCurve : 'exponential'
	}
},
{
	pitchDecay : 0.008,
	octaves : 2,
	oscillator : {
		type : 'sine',
		frequency : 440,
		detune : 0,
		phase : 0,
		partialCount : 0,
		volume : 0,
		mute : false
	},
	envelope : {
		attack : 0.0006,
		decay : 0.5,
		sustain : 0,
		release : 1.4,
		attackCurve : 'exponential',
		decayCurve : 'exponential',
		releaseCurve : 'exponential'
	},
},
{
	pitchDecay : 0.019729411764705884,
	octaves : 4.845,
	oscillator : {
		frequency : 440,
		detune : 0,
		phase : 0,
		spread : 80.4,
		count : 3,
		type : 'fatsine',
		partialCount : 0,
		volume : 0,
		mute : false
	},
	envelope : {
		attack : 0.011560784313725491,
		decay : 0.22226666666666667,
		sustain : 0,
		release : 1.4,
		attackCurve : 'sine',
		decayCurve : 'exponential',
		releaseCurve : 'exponential'
	},
}]
