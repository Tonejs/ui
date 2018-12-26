import { LitElement, html } from '@polymer/lit-element'
import { ToneSelectAttribute } from '../input/select-attribute'

export class OscillatorTypeSelect extends LitElement {

	static get properties(){
		return {
			attribute : { type : String },
			nocustom : { type : Boolean },
			label : { type : String }
		}
	}

	constructor(){
		super()
		this.nocustom = false
	}

	sync(node){
		const val = node[this.attribute]
		Array.from(this.shadowRoot.querySelectorAll('tone-option')).forEach(el => {
			const elVal = el.getAttribute('value')
			if (val.includes(elVal)){
				this.shadowRoot.querySelector('tone-select-attribute').value = elVal
			}
		})
	}

	render(){
		return html`
			<tone-select-attribute label=${this.label} attribute=${this.attribute}>
				<tone-option value="sine">sine</tone-option>
				<tone-option value="square">square</tone-option>
				<tone-option value="sawtooth">sawtooth</tone-option>
				<tone-option value="triangle">triangle</tone-option>
				${!this.nocustom ? html`<tone-option value="custom">custom</tone-option>` : html``}
			</tone-select-attribute>
		`
	}

}

customElements.define('tone-oscillator-type', OscillatorTypeSelect)
