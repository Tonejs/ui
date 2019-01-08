import { LitElement, html } from '@polymer/lit-element'

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
		this.values = []
		this.adding = false
	}

	get currentColumn(){
		return this.values[Math.clamp(this.highlight, 0, this.columns-1)]
	}

	_mousedown(e, x, y){
		if (e.cancelable){
			e.preventDefault()
		}
		this.adding = !this.values[x][y]		
		this.values[x][y] = this.adding
		this.requestUpdate()
	}

	_mousemove(e, x, y){
		if (e.cancelable){
			e.preventDefault()
		}
		if (e.buttons){
			this.values[x][y] = this.adding
			this.requestUpdate()	
		} else if (e.changedTouches){
			const { clientWidth, clientHeight } = this.shadowRoot.querySelector('#container')
			const { top, left } = this.getBoundingClientRect()
			//just use the first touch
			Array.from(e.changedTouches).forEach(touch => {
				const offsetX = (touch.clientX - left) / clientWidth
				const offsetY = (touch.clientY - top) / clientHeight
				x = Math.floor(offsetX * this.columns)
				y = Math.floor(offsetY * this.rows)
				this.values[x][y] = this.adding
			})
			this.requestUpdate()
		}
	}

	updated(changed){
		if (changed.has('columns') || changed.has('rows')){
			this.values = []
			for (let x = 0; x < this.columns; x++){
				const column = []
				for (let y = 0; y < this.rows; y++){
					column[y] = false
				}
				this.values.push(column)
			}
			this.requestUpdate()
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
					display: flex;
				}
				.column {
					flex: 1;
					display: flex;
					flex-direction: column;
				}

				.column.highlight {
					background-color: var(--color-gray);
				}

				.column.highlight .row {
					transition-duration: 0.4s;
				}

				.column.highlight .row.filled {
					transition: background-color 0.1s;
				}

				.column.highlight .row.filled{
					background-color: white;
				}

				.row {
					flex: 1;
					margin: 1px;
					background-color: var(--color-light-gray);
					transition: background-color 0s;
				}

				.row.filled {
					background-color: var(--color-teal);
				}
			</style>
			<div id="container">
				${this.values.map((column, x) => html`
					<div class="column ${x === this.highlight ? 'highlight' : ''}">
						${column.map((row, y) => html`
							<div
								@mousemove=${e => this._mousemove(e, x, y)} 
								@touchmove=${e => this._mousemove(e, x, y)} 
								@mousedown=${e => this._mousedown(e, x, y)} 
								@touchstart=${e => this._mousedown(e, x, y)} 
								@touchend=${() => this.adding = false} 
								@mouseup=${() => this.adding = false} 
								class="row ${row ? 'filled' : ''}"></div>
						`)}
					</div>
				`)}
			</div>
		`
	}
}

customElements.define('tone-step-sequencer', ToneStepSequencer)
