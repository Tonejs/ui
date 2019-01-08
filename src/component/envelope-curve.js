import { LitElement, html } from '@polymer/lit-element'
import { ToneSelectAttribute } from '../input/select-attribute'

export class ToneEnvelopeCurve extends LitElement {

	static get properties(){
		return {
			label : { type : String },
			attribute : { type : String },
			basic : { type : Boolean },
		}
	}

	constructor(){
		super()
		this.basic = false
	}

	sync(node){
		const val = node[this.attribute]
		this.shadowRoot.querySelector('tone-select-attribute').value = val
	}

	get value(){
		return this.shadowRoot.querySelector('tone-select-attribute').value
	}

	set value(v){
		this.shadowRoot.querySelector('tone-select-attribute').value = v
	}

	render(){
		let extendedTypes = html``
		if (!this.basic){
			extendedTypes = html`
				<option value="bounce">bounce</option>
				<option value="ripple">ripple</option>
				<option value="step">step</option>
				<option value="cosine">cosine</option>
				<option value="sine">sine</option>
			`
		}
		return html`
			<tone-select-attribute 
				label=${this.label} attribute=${this.attribute}>
				<option value="linear">linear</option>
				<option value="exponential">exponential</option>
				${extendedTypes}
			</div>
		`
	}

}

customElements.define('tone-envelope-curve', ToneEnvelopeCurve)
