import { LitElement, html } from '@polymer/lit-element'

class ToneToggle extends LitElement {

	static get properties(){
		return {
			label : { type : String },
			checked : { type : Boolean },
			attribute : { type : String },
		}
	}

	constructor(){
		super()
		this.label = ''
		this.checked = false
	}

	updated(changed){
		if (changed.has('checked')){
			this.dispatchEvent(new CustomEvent('change', { detail : this.checked, composed : true, bubbles : true }))

			if (this.attribute){
				this.dispatchEvent(new CustomEvent(this.attribute, { detail : this.checked, composed : true, bubbles : true }))
			}
		}
	}

	sync(tone){
		const attr = this.attribute
		this.checked = tone[attr]
	}

	set(tone){
		const attr = this.attribute
		tone[attr] = this.checked
	}

	_clicked(e){
		e.stopPropagation()
		this.checked = !this.checked
		this.shadowRoot.querySelector('button').focus()
	}
	
	render(){
		return html`
			<style>
				:host {
					display: block;
				}

				#container {
					display: block;
				}

				label {
					font-family: var(--label-font-family);
					font-size: var(--label-font-size);
					min-width: 80px;
					display: inline-block;
					margin-right: 20px;
				}

				#check-container {
					width: 30px;
					height: 10px;
					display: inline-block;
					position: relative;
				}

				#check-container #background {
					position: absolute;
					width: 100%;
					height: 100%;
					background-color: var(--color-gray);
					border-radius: 5px;
				}

				#check-container button {
					-webkit-appearance: none;
					width: 20px;
					height: 20px;
					left: 0px;
					margin: 0;
					padding: 0;
					border: none;
					background-color: var(--color-light-gray);
					border-radius: 50%;
					top: 50%;
					position: absolute;
					transform: translate(0, -50%);
					outline-color: var(--outline-color);
					transition: left 0.1s;
					// box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
					box-shadow: var(--shadow-low);
				}

				#check-container button[checked] {
					left: 10px;
					background-color: black;
				}

			</style>
			<div id="container">
				<label for="checkbox">${this.label}</label>
				<div id="check-container"
					@click=${this._clicked.bind(this)}>
					<div id="background"></div>
					<button name="checkbox" 
						?checked=${this.checked}
						@click=${this._clicked.bind(this)}
						aria-checked=${this.checked} 
						aria-role="checkbox"
						id="thumb"></button>
				<div>
			</div>
		`
	}

}

customElements.define('tone-toggle', ToneToggle)
