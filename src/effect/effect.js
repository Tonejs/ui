import { LitElement, html } from '@polymer/lit-element'
import '../rack/rack'
import '../viz/meter'
import { ToneInstrument } from '../instrument/instrument'

export class ToneEffect extends ToneInstrument {

	constructor(){
		super()
		this.effect = true
	}
	
}

customElements.define('tone-effect', ToneEffect)
