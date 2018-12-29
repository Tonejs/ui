import { LitElement, html } from '@polymer/lit-element'
import Nexus from 'nexusui'
window.Nexus = Nexus

export class ToneStepSequencer extends LitElement {

	static get properties(){
		return {
			label : { type : String },
			rows : { type : Number },
			columns : { type : Number },
			highlight : { type : Number },

		}
	}

	constructor(){
		super()
		this.rows = 4
		this.columns = 16
		this.highlight = -1
	}

	firstUpdated(){
		super.firstUpdated()

		window.addEventListener('resize', this._resize.bind(this))
		setTimeout(() => this._resize(), 10)
	}

	_resize(){
		const container = this.shadowRoot.querySelector('#container')
		const sequencer = this.shadowRoot.querySelector('#sequencer')
		if (this._sequencer){
			this._sequencer.destroy()
		}
		this._sequencer = new Nexus.Sequencer(sequencer, {
			size : [container.clientWidth, container.clientHeight],
			mode : 'toggle',
			rows : this.rows,
			columns : this.columns
		})
		this._sequencer.colorize('accent', '#22DBC0')
		// this._sequencer.colorize('fill', '#aaa')
		this._sequencer.colorize('mediumLight', '#000')
	}

	get currentColumn(){
		return this._sequencer.matrix.pattern.map(row => row[this.highlight])
	}

	updated(changed){
		if (changed.has('highlight') && this._sequencer){
			this._sequencer.stepper.value = this.highlight - 1
			this._sequencer.next()
			// this._sequencer.counter.value = this.highlight
			// console.log(this.highlight)
		}
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
				<div id="sequencer">
				</div>
			</div>
		`
	}
}

customElements.define('tone-step-sequencer', ToneStepSequencer)
