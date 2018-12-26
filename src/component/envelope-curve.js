import { LitElement, html } from '@polymer/lit-element'
import { ToneSelectAttribute } from '../input/select-attribute'

export class ToneEnvelopeCurve extends ToneSelectAttribute {

	static get properties(){
		return {
			basic : { type : Boolean },
		}
	}

	constructor(){
		super()
		this.basic = false
	}

	render(){
		let extendedTypes = html``
		if (!this.basic){
			extendedTypes = html`
				<tone-option value="bounce">bounce</tone-option>
				<tone-option value="ripple">ripple</tone-option>
				<tone-option value="step">step</tone-option>
				<tone-option value="cosine">cosine</tone-option>
				<tone-option value="sine">sine</tone-option>
			`
		}
		return html`
			<tone-select-attribute label=${this.label} attribute=${this.attribute}>
				<tone-option value="linear">linear</tone-option>
				<tone-option value="exponential">exponential</tone-option>
				${extendedTypes}
			</div>
		`
	}

}

customElements.define('tone-envelope-curve', ToneEnvelopeCurve)
