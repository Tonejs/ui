import { LitElement, html } from '@polymer/lit-element'

export class ToneBinded extends LitElement {

	static get properties(){
		return {
			collapsed : { type : Boolean },
		}
	}

	constructor(){
		super()
		this.collapsed = false
		this._syncTimeout = -1
	}

	setAttribute(attr, source, tone){
		source.set(tone)
	}

	/**
	 * Bind any interface changes with the Tone.js object
	 */
	bind(tone){

		Array.from(this.shadowRoot.querySelectorAll('[attribute]')).forEach(el => {
			const attr = el.getAttribute('attribute')
			this.addEventListener(attr, e => {
				if (global.Tone.isDefined(tone[attr])){
					if (global.Tone.isDefined(tone[attr].value)){
						tone[attr].value = e.detail
					} else {
						tone[attr] = e.detail
					}
				}
				this.sync(tone)
			})
		})
		
		Array.from(this.shadowRoot.querySelectorAll('[component]')).forEach(el => {
			const component = el.getAttribute('component')
			if (el){
				el.bind(tone[component])
			}
		})

		this.sync(tone)

		this.addEventListener('collapse', () => this.sync(tone))
		this.addEventListener('sync', () => this.sync(tone))
	}

	/**
	 * Synchronize all of the interface with the Tone.js object
	 */
	sync(tone){
		Array.from(this.shadowRoot.querySelectorAll('[attribute]')).forEach(el => {
			const attr = el.getAttribute('attribute')
			if (typeof tone[attr] !== 'undefined'){
				el.sync(tone)
			}
		})
		Array.from(this.shadowRoot.querySelectorAll('[component]')).forEach(el => {
			const comp = el.getAttribute('component')
			if (typeof tone[comp] !== 'undefined'){
				el.sync(tone[comp])
			}
		})
		//group/throttle sync changes
		clearTimeout(this._syncTimeout)
		this._syncTimeout = setTimeout(() => {
			const visualizations = Array.from(this.shadowRoot.querySelectorAll('.viz'))
			if (visualizations.length){
				visualizations.forEach(v => v.visualize(tone))
			}
		}, 10)
	}
}
