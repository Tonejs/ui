import { LitElement, html } from '@polymer/lit-element'
import Nexus from 'nexusui'
window.Nexus = Nexus

export class ToneStepSequencer extends LitElement {

	firstUpdated(){
		super.firstUpdated()
		const container = this.shadowRoot.querySelector('#container')
		const slider = this.shadowRoot.querySelector('#slider')
		this._slider = new Nexus.Position(slider, {
			size : [container.clientWidth, container.clientHeight],
			mode : 'absolute',
		})
		this._slider.colorize('accent', '#22DBC0')
		this._slider.colorize('mediumLight', '#000')
		window.addEventListener('resize', this._resize.bind(this))
		setTimeout(() => this._resize(), 10)

		this._slider.on('change', e => {
			this.dispatchEvent(new CustomEvent('change', { detail : e, composed : true }))
		})

		this._slider.on('click', () => {
			this.dispatchEvent(new CustomEvent('mousedown', { composed : true }))
		})

		this._slider.on('release', () => {
			this.dispatchEvent(new CustomEvent('mouseup', { composed : true }))
		})
	}

	_resize(){
		const container = this.shadowRoot.querySelector('#container')
		this._slider.resize(container.clientWidth, container.clientHeight)
	}

	get currentColumn(){
		return this._slider.matrix.pattern.map(row => row[this.highlight])
	}

	render(){
		return html`
			<style>
				:host {
					display: inline-block;
					width: 100%;
					height: 120px;
				}
				#container {
					width: 100%;
					height: 100%;
				}
			</style>
			<div id="container">
				<div id="slider">
				</div>
			</div>
		`
	}
}

customElements.define('tone-slider-2d', ToneStepSequencer)
