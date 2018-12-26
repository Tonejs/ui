

export class Slider2D extends LitElement {

	static get properties(){
		return {
			label : { type : String }
		}
	}

	render(){
		return html`
			<svg>
				
			</svg>
		`
	}
}

customElements.define('tone-slider-2d', Slider2D)