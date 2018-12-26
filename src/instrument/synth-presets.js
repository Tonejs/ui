export const presets = [
	{
		portamento : 0.0,
		oscillator : {
			type : 'fatsine4',
			spread : 60,
			count : 10
		},
		envelope : {
			attack : 0.4,
			decay : 0.01,
			sustain : 1,
			attackCurve : 'sine',
			releaseCurve : 'sine',
			release : 0.4
		}
	},
	{
		portamento : 0.0,
		oscillator : {
			type : 'square4'
		},
		envelope : {
			attack : 2,
			decay : 1,
			sustain : 0.2,
			release : 2
		}
	},
	{
		portamento : 0.0,
		oscillator : {
			type : 'pulse',
			width : 0.8
		},
		envelope : {
			attack : 0.01,
			decay : 0.05,
			sustain : 0.2,
			releaseCurve : 'bounce',
			release : 0.4
		}
	},
	{
		portamento : 0.2,
		oscillator : {
			type : 'sawtooth'
		},
		envelope : {
			attack : 0.03,
			decay : 0.1,
			sustain : 0.2,
			release : 0.02
		}
	},
	{
		portamento : 0.2,
		oscillator : {
			partials : [
				1,
				0,
				2,
				0,
				3
			]
		},
		envelope : {
			attack : 0.001,
			decay : 1.2,
			sustain : 0,
			release : 1.2
		}
	},
	{
		portamento : 0.2,
		oscillator : {
			type : 'fatcustom',
			partials : [0.2, 1, 0, 0.5, 0.1],
			spread : 40,
			count : 3
		},
		envelope : {
			attack : 0.001,
			decay : 1.6,
			sustain : 0,
			release : 1.6
		}
	},
	{
		portamento : 0,
		oscillator : {
			type : 'fatsawtooth',
			count : 3,
			spread : 30
		},
		envelope : {
			attack : 0.01,
			decay : 0.1,
			sustain : 0.5,
			release : 0.4,
			attackCurve : 'exponential'
		}
	},
	{
		portamento : 0,
		oscillator : {
			type : 'sine'
		},
		envelope : {
			attack : 0.001,
			decay : 0.1,
			sustain : 0.1,
			release : 1.2
		}
	}
]
