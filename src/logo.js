function Logo( _el ) {
	this._el = _el;
	this.move = function() {
		let _e = this._el;
		_e.style.top = "0px";
		_e.style.width = "70px"; 
		setTimeout( function() {
			_e.style.opacity = "0";
		}, 1000);
		setTimeout( function() {
			_e.parentElement.parentElement.style.justifyContent = "flex-start";
			_e.style.position = "relative";
			//document.getElementById("info-btn").style.display = "block";
			_e.style.opacity = "1";
		}, 2000);
	}
}

export default Logo;
