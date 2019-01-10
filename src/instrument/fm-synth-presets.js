export const presets = [
	{ 
		harmonicity : 1, 
		modulationIndex : 20.848, 
		portamento : 0.024, 
		oscillator : { 
			type : 'sawtooth9', 
			frequency : 440, 
			detune : 0, 
			phase : 0, 
			partialCount : 9, 
		}, 
		envelope : { 
			attack : 0.012926470588235294, 
			decay : 0.05975, 
			sustain : 0.16, 
			release : 0.18211764705882355, 
			attackCurve : 'exponential', 
			decayCurve : 'exponential', 
			releaseCurve : 'exponential' 
		}, 
		modulation : { 
			type : 'custom', 
			frequency : 440, 
			detune : 0, 
			phase : 0, 
			partials : [0.8105694691387023, 0, 0.0900632743487447, 0, 0.03242277876554809, 0, 0.016542234064055146, 0, 0.010007030483193857, 0, 0.00669892123255126, 0, 0.004796269048158, 0, 0.6, 0, 0.0028047386475387615, 0.4727272727272728, 0.002245344789857901, 0, 0.0018380260071172384, 0, 0.0015322674274833694, 0, 0.0012969111506219236, 0.8727272727272728, 0.0011118922759104286, 0, 0.0009638162534348421, 0, 0.0008434645880735718, 0], 
			partialCount : 32, 
		}, 
		modulationEnvelope : { 
			attack : 0.012926470588235294, 
			decay : 0.08784411764705882, 
			sustain : 0, 
			release : 0.08627941176470588, 
			attackCurve : 'exponential', 
			decayCurve : 'exponential', 
			releaseCurve : 'cosine' 
		}, 
		
	},
	{
		harmonicity : 1.515,
		modulationIndex : 6.483999999999999,
		detune : 0,
		oscillator : {
			type : 'sawtooth3',
			frequency : 440,
			detune : 0,
			phase : 0,
			partialCount : 3,
			volume : 0,
			mute : false
		},
		envelope : {
			attack : 0.010585294117647059,
			decay : 0.27689411764705885,
			sustain : 0,
			release : 0.7328941176470589,
			attackCurve : 'linear',
			decayCurve : 'exponential',
			releaseCurve : 'exponential'
		},
		modulation : {
			type : 'square',
			frequency : 440,
			detune : 0,
			phase : 0,
			partialCount : 0,
			volume : 0,
			mute : false
		},
		modulationEnvelope : {
			attack : 0.01,
			decay : 0.05975,
			sustain : 0,
			release : 0.13635,
			attackCurve : 'exponential',
			decayCurve : 'exponential',
			releaseCurve : 'exponential'
		},
		portamento : 0,
	},
	{
		harmonicity : 1.655,
		modulationIndex : 40,
		detune : 0,
		oscillator : {
			type : 'square',
			frequency : 440,
			detune : 0,
			phase : 0,
			partialCount : 0,
			volume : 0,
			mute : false
		},
		envelope : {
			attack : 0.09584313725490196,
			decay : 0.13174117647058822,
			sustain : 0.25,
			release : 0.5,
			attackCurve : 'exponential',
			decayCurve : 'exponential',
			releaseCurve : 'exponential'
		},
		modulation : {
			type : 'triangle',
			frequency : 440,
			detune : 0,
			phase : 0,
			partialCount : 0,
			volume : 0,
			mute : false
		},
		modulationEnvelope : {
			attack : 0.0427764705882353,
			decay : 0.8596519607843138,
			sustain : 0.08,
			release : 3.392894117647059,
			attackCurve : 'linear',
			decayCurve : 'exponential',
			releaseCurve : 'exponential'
		},
		portamento : 0.15899999999999997,
	}
]
