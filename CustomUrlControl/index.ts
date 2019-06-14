import {IInputs, IOutputs} from "./generated/ManifestTypes";

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

export class CustomUrlControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _value: string;
	private _placeholder: string;
	
	private _value2: string;
	private _placeholder2: string;
	
	private _value3: string;
	private _placeholder3: string;

	private _urlLink: string;
	private _urlText: string;
	private _urlCSS: string;
	private _icon: string;
	private _iconStyle: string;
	
	private _notifyOutputChanged: () => void;
	private _refreshUI: () => void;
  
	private _spanElement : HTMLSpanElement;
	private _anchorElement: HTMLAnchorElement;

	private _context: ComponentFramework.Context<IInputs>;
	
	private getParameterAsString(parameter: any, returnNullAsEmptyString = false) : any {
		if (parameter !== undefined && parameter.raw !== null && parameter.raw !== "") {
			return String(parameter.raw);
		} else {
			if (returnNullAsEmptyString) { return ""; } else { return null; }
		}		
	}
	
	constructor() { }

	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		
		this._refreshUI = this.refreshUI.bind(this);		
		this._notifyOutputChanged = notifyOutputChanged;
		
		this._spanElement = document.createElement("span");
				
		this._anchorElement = document.createElement("a");
		this._anchorElement.setAttribute("target", "_blank");
		
		var paragraphElement = document.createElement("p");
		paragraphElement.appendChild(this._spanElement);			
		paragraphElement.appendChild(this._anchorElement);
		container.appendChild(paragraphElement);

		this._context = context;				
		this._refreshUI();
	}

	public updateView(context: ComponentFramework.Context<IInputs>): void
	{	
		this._context = context;
		this._refreshUI();
	}
	
	private refreshUI() {
		this._spanElement.innerHTML = '';
		
		this._value = this.getParameterAsString(this._context.parameters.value);
		this._placeholder = this.getParameterAsString(this._context.parameters.placeholder);
		this._urlLink = this.getParameterAsString(this._context.parameters.urlLink);

		if (this._value === null || this._placeholder === null || this._urlLink === null) {	this._spanElement.innerHTML = '<b style="color: red;">Configuration Error</b>'; }
		
		this._urlText = this.getParameterAsString(this._context.parameters.urlText);
		if (this._urlText === null) { this._urlText = this._urlLink; }
		
		var regEx = new RegExp(this._placeholder, 'g');		
		this._urlLink = this._urlLink.replace(regEx, this._value);
		this._urlText = this._urlText.replace(regEx, this._value);
		
		this._value2 = this.getParameterAsString(this._context.parameters.value2);
		this._placeholder2 = this.getParameterAsString(this._context.parameters.placeholder2);
		if (this._value2 !== null && this._placeholder2 !== null) {
			var regEx2 = new RegExp(this._placeholder2, 'g');
			this._urlLink = this._urlLink.replace(regEx2, this._value2);
			this._urlText = this._urlText.replace(regEx2, this._value2);			
		}
		
		this._value3 = this.getParameterAsString(this._context.parameters.value3);
		this._placeholder3 = this.getParameterAsString(this._context.parameters.placeholder3);
		if (this._value3 !== null && this._placeholder3 !== null) {
			var regEx3 = new RegExp(this._placeholder3, 'g');
			this._urlLink = this._urlLink.replace(regEx3, this._value3);
			this._urlText = this._urlText.replace(regEx3, this._value3);			
		}
		
		this._urlCSS = this.getParameterAsString(this._context.parameters.urlCSS, true);
		this._icon = this.getParameterAsString(this._context.parameters.icon, true);
		this._iconStyle = this.getParameterAsString(this._context.parameters.iconStyle, true);
				
		if (this._icon != "") {	this._spanElement.innerHTML = '<i class="' + this._icon + ' fa-2x" style="' + this._iconStyle + '"></i>&nbsp;';	}
		
		this._anchorElement.innerHTML = this._urlText;
		this._anchorElement.setAttribute("title", this._urlLink);
		this._anchorElement.setAttribute("href", this._urlLink);
		this._anchorElement.setAttribute("style", this._urlCSS);		
	}

	public getOutputs(): IOutputs
	{
		return {};
	}

	public destroy(): void
	{

	}
}
