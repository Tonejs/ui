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
		const selectAttribute = this.shadowRoot.querySelector('tone-select-attribute')
		if (selectAttribute){
			selectAttribute.options.forEach(el => {
				const elVal = el.getAttribute('value')
				if (val.includes(elVal)){
					this.shadowRoot.querySelector('tone-select-attribute').value = elVal
				}
			})
		}
	}

	render(){
		return html`
			<tone-select-attribute label=${this.label} attribute=${this.attribute}>
				<option value="sine">sine</option>
				<option value="square">square</option>
				<option value="sawtooth">sawtooth</option>
				<option value="triangle">triangle</option>
				${!this.nocustom ? html`<option value="custom">custom</option>` : html``}
			</tone-select-attribute>
		`
	}

}

customElements.define('tone-oscillator-type', OscillatorTypeSelect)
