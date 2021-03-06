<<<<<<< HEAD
/*csd*/
/*
 * move
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */
(function (c) {
	var a = window.getComputedStyle || window.currentStyle;
	var d = {
		"top": "px",
		"bottom": "px",
		"left": "px",
		"right": "px",
		"width": "px",
		"height": "px",
		"font-size": "px",
		"margin": "px",
		"margin-top": "px",
		"margin-bottom": "px",
		"margin-left": "px",
		"margin-right": "px",
		"padding": "px",
		"padding-top": "px",
		"padding-bottom": "px",
		"padding-left": "px",
		"padding-right": "px"
	};
	c.move = function (e) {
		return new Move(move.select(e));
	};
	c.move.version = "0.0.3";
	move.defaults = {
		duration: 500
	};
	move.ease = {
		"in": "ease-in",
		"out": "ease-out",
		"in-out": "ease-in-out",
		"snap": "cubic-bezier(0,1,.5,1)",
		"linear": "cubic-bezier(0.250, 0.250, 0.750, 0.750)",
		"ease-in-quad": "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
		"ease-in-cubic": "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
		"ease-in-quart": "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
		"ease-in-quint": "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
		"ease-in-sine": "cubic-bezier(0.470, 0.000, 0.745, 0.715)",
		"ease-in-expo": "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
		"ease-in-circ": "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
		"ease-in-back": "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
		"ease-out-quad": "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
		"ease-out-cubic": "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
		"ease-out-quart": "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
		"ease-out-quint": "cubic-bezier(0.230, 1.000, 0.320, 1.000)",
		"ease-out-sine": "cubic-bezier(0.390, 0.575, 0.565, 1.000)",
		"ease-out-expo": "cubic-bezier(0.190, 1.000, 0.220, 1.000)",
		"ease-out-circ": "cubic-bezier(0.075, 0.820, 0.165, 1.000)",
		"ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
		"ease-out-quad": "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
		"ease-out-cubic": "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
		"ease-in-out-quart": "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
		"ease-in-out-quint": "cubic-bezier(0.860, 0.000, 0.070, 1.000)",
		"ease-in-out-sine": "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
		"ease-in-out-expo": "cubic-bezier(1.000, 0.000, 0.000, 1.000)",
		"ease-in-out-circ": "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
		"ease-in-out-back": "cubic-bezier(0.680, -0.550, 0.265, 1.550)"
	};
	move.select = function (e) {
		if ("string" != typeof e) {
			return e;
		}
		return document.getElementById(e) || document.querySelectorAll(e)[0];
	};
	function b() {
		this.callbacks = {};
	}
	b.prototype.on = function (e, f) {
		(this.callbacks[e] = this.callbacks[e] || []).push(f);
		return this;
	};
	b.prototype.emit = function (g) {
		var e = Array.prototype.slice.call(arguments, 1),
		f = this.callbacks[g],
		j;
		if (f) {
			j = f.length;
			for (var h = 0; h < j; ++h) {
				f[h].apply(this, e);
			}
		}
		return this;
	};
	c.Move = function Move(e) {
		if (!(this instanceof Move)) {
			return new Move(e);
		}
		b.call(this);
		this.el = e;
		this._props = {};
		this._rotate = 0;
		this._transitionProps = [];
		this._transforms = [];
		this.duration(move.defaults.duration);
	};
	Move.prototype = new b;
	Move.prototype.constructor = Move;
	Move.prototype.transform = function (e) {
		this._transforms.push(e);
		return this;
	};
	Move.prototype.skew = function (e, f) {
		f = f || 0;
		return this.transform("skew(" + e + "deg, " + f + "deg)");
	};
	Move.prototype.skewX = function (e) {
		return this.transform("skewX(" + e + "deg)");
	};
	Move.prototype.skewY = function (e) {
		return this.transform("skewY(" + e + "deg)");
	};
	Move.prototype.translate = Move.prototype.to = function (e, f) {
		f = f || 0;
		return this.transform("translate(" + e + "px, " + f + "px)");
	};
	Move.prototype.translateX = Move.prototype.x = function (e) {
		return this.transform("translateX(" + e + "px)");
	};
	Move.prototype.translateY = Move.prototype.y = function (e) {
		return this.transform("translateY(" + e + "px)");
	};
	Move.prototype.scale = function (e, f) {
		f = null == f ? e : f;
		return this.transform("scale(" + e + ", " + f + ")");
	};
	Move.prototype.scaleX = function (e) {
		return this.transform("scaleX(" + e + ")");
	};
	Move.prototype.scaleY = function (e) {
		return this.transform("scaleY(" + e + ")");
	};
	Move.prototype.rotate = function (e) {
		return this.transform("rotate(" + e + "deg)");
	};
	Move.prototype.ease = function (e) {
		e = move.ease[e] || e || "ease";
		return this.setVendorProperty("transition-timing-function", e);
	};
	Move.prototype.animate = function (f, g) {
		for (var e in g) {
			if (g.hasOwnProperty(e)) {
				this.setVendorProperty("animation-" + e, g[e]);
			}
		}
		return this.setVendorProperty("animation-name", f);
	};
	Move.prototype.duration = function (e) {
		e = this._duration = "string" == typeof e ? parseFloat(e) * 1000 : e;
		return this.setVendorProperty("transition-duration", e + "ms");
	};
	Move.prototype.delay = function (e) {
		e = "string" == typeof e ? parseFloat(e) * 1000 : e;
		return this.setVendorProperty("transition-delay", e + "ms");
	};
	Move.prototype.setProperty = function (e, f) {
		this._props[e] = f;
		return this;
	};
	Move.prototype.setVendorProperty = function (e, f) {
		this.setProperty("-webkit-" + e, f);
		this.setProperty("-moz-" + e, f);
		this.setProperty("-ms-" + e, f);
		this.setProperty("-o-" + e, f);
		return this;
	};
	Move.prototype.set = function (e, f) {
		this.transition(e);
		if ("number" == typeof f && d[e]) {
			f += d[e];
		}
		this._props[e] = f;
		return this;
	};
	Move.prototype.add = function (e, g) {
		if (!a) {
			return;
		}
		var f = this;
		return this.on("start",
		function () {
			var h = parseInt(f.current(e), 10);
			f.set(e, h + g + "px");
		});
	};
	Move.prototype.sub = function (e, g) {
		if (!a) {
			return;
		}
		var f = this;
		return this.on("start",
		function () {
			var h = parseInt(f.current(e), 10);
			f.set(e, h - g + "px");
		});
	};
	Move.prototype.current = function (e) {
		return a(this.el).getPropertyValue(e);
	};
	Move.prototype.transition = function (e) {
		if (!this._transitionProps.indexOf(e)) {
			return this;
		}
		this._transitionProps.push(e);
		return this;
	};
	Move.prototype.applyProperties = function () {
		var g = this._props,
		e = this.el;
		for (var f in g) {
			if (g.hasOwnProperty(f)) {
				e.style.setProperty(f, g[f], "");
			}
		}
		return this;
	};
	Move.prototype.move = Move.prototype.select = function (e) {
		this.el = move.select(e);
		return this;
	};
	Move.prototype.then = function (f) {
		if (f instanceof Move) {
			this.on("end",
			function () {
				f.end();
			});
		} else {
			if ("function" == typeof f) {
				this.on("end", f);
			} else {
				var e = new Move(this.el);
				e._transforms = this._transforms.slice(0);
				this.then(e);
				e.parent = this;
				return e;
			}
		}
		return this;
	};
	Move.prototype.pop = function () {
		return this.parent;
	};
	Move.prototype.end = function (e) {
		var f = this;
		this.emit("start");
		if (this._transforms.length) {
			this.setVendorProperty("transform", this._transforms.join(" "));
		}
		this.setVendorProperty("transition-properties", this._transitionProps.join(", "));
		this.applyProperties();
		if (e) {
			this.then(e);
		}
		setTimeout(function () {
			f.emit("end");
		},
		this._duration);
		return this;
	};


	if (typeof define === "function" && (define.amd||define.cmd) ) {
		define(function (require,exports,module) {
			module.exports = c.move;
		});
	}
=======
/*csd*/
/*
 * move
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */
(function (c) {
	var a = window.getComputedStyle || window.currentStyle;
	var d = {
		"top": "px",
		"bottom": "px",
		"left": "px",
		"right": "px",
		"width": "px",
		"height": "px",
		"font-size": "px",
		"margin": "px",
		"margin-top": "px",
		"margin-bottom": "px",
		"margin-left": "px",
		"margin-right": "px",
		"padding": "px",
		"padding-top": "px",
		"padding-bottom": "px",
		"padding-left": "px",
		"padding-right": "px"
	};
	c.move = function (e) {
		return new Move(move.select(e));
	};
	c.move.version = "0.0.3";
	move.defaults = {
		duration: 500
	};
	move.ease = {
		"in": "ease-in",
		"out": "ease-out",
		"in-out": "ease-in-out",
		"snap": "cubic-bezier(0,1,.5,1)",
		"linear": "cubic-bezier(0.250, 0.250, 0.750, 0.750)",
		"ease-in-quad": "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
		"ease-in-cubic": "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
		"ease-in-quart": "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
		"ease-in-quint": "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
		"ease-in-sine": "cubic-bezier(0.470, 0.000, 0.745, 0.715)",
		"ease-in-expo": "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
		"ease-in-circ": "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
		"ease-in-back": "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
		"ease-out-quad": "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
		"ease-out-cubic": "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
		"ease-out-quart": "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
		"ease-out-quint": "cubic-bezier(0.230, 1.000, 0.320, 1.000)",
		"ease-out-sine": "cubic-bezier(0.390, 0.575, 0.565, 1.000)",
		"ease-out-expo": "cubic-bezier(0.190, 1.000, 0.220, 1.000)",
		"ease-out-circ": "cubic-bezier(0.075, 0.820, 0.165, 1.000)",
		"ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
		"ease-out-quad": "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
		"ease-out-cubic": "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
		"ease-in-out-quart": "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
		"ease-in-out-quint": "cubic-bezier(0.860, 0.000, 0.070, 1.000)",
		"ease-in-out-sine": "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
		"ease-in-out-expo": "cubic-bezier(1.000, 0.000, 0.000, 1.000)",
		"ease-in-out-circ": "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
		"ease-in-out-back": "cubic-bezier(0.680, -0.550, 0.265, 1.550)"
	};
	move.select = function (e) {
		if ("string" != typeof e) {
			return e;
		}
		return document.getElementById(e) || document.querySelectorAll(e)[0];
	};
	function b() {
		this.callbacks = {};
	}
	b.prototype.on = function (e, f) {
		(this.callbacks[e] = this.callbacks[e] || []).push(f);
		return this;
	};
	b.prototype.emit = function (g) {
		var e = Array.prototype.slice.call(arguments, 1),
		f = this.callbacks[g],
		j;
		if (f) {
			j = f.length;
			for (var h = 0; h < j; ++h) {
				f[h].apply(this, e);
			}
		}
		return this;
	};
	c.Move = function Move(e) {
		if (!(this instanceof Move)) {
			return new Move(e);
		}
		b.call(this);
		this.el = e;
		this._props = {};
		this._rotate = 0;
		this._transitionProps = [];
		this._transforms = [];
		this.duration(move.defaults.duration);
	};
	Move.prototype = new b;
	Move.prototype.constructor = Move;
	Move.prototype.transform = function (e) {
		this._transforms.push(e);
		return this;
	};
	Move.prototype.skew = function (e, f) {
		f = f || 0;
		return this.transform("skew(" + e + "deg, " + f + "deg)");
	};
	Move.prototype.skewX = function (e) {
		return this.transform("skewX(" + e + "deg)");
	};
	Move.prototype.skewY = function (e) {
		return this.transform("skewY(" + e + "deg)");
	};
	Move.prototype.translate = Move.prototype.to = function (e, f) {
		f = f || 0;
		return this.transform("translate(" + e + "px, " + f + "px)");
	};
	Move.prototype.translateX = Move.prototype.x = function (e) {
		return this.transform("translateX(" + e + "px)");
	};
	Move.prototype.translateY = Move.prototype.y = function (e) {
		return this.transform("translateY(" + e + "px)");
	};
	Move.prototype.scale = function (e, f) {
		f = null == f ? e : f;
		return this.transform("scale(" + e + ", " + f + ")");
	};
	Move.prototype.scaleX = function (e) {
		return this.transform("scaleX(" + e + ")");
	};
	Move.prototype.scaleY = function (e) {
		return this.transform("scaleY(" + e + ")");
	};
	Move.prototype.rotate = function (e) {
		return this.transform("rotate(" + e + "deg)");
	};
	Move.prototype.ease = function (e) {
		e = move.ease[e] || e || "ease";
		return this.setVendorProperty("transition-timing-function", e);
	};
	Move.prototype.animate = function (f, g) {
		for (var e in g) {
			if (g.hasOwnProperty(e)) {
				this.setVendorProperty("animation-" + e, g[e]);
			}
		}
		return this.setVendorProperty("animation-name", f);
	};
	Move.prototype.duration = function (e) {
		e = this._duration = "string" == typeof e ? parseFloat(e) * 1000 : e;
		return this.setVendorProperty("transition-duration", e + "ms");
	};
	Move.prototype.delay = function (e) {
		e = "string" == typeof e ? parseFloat(e) * 1000 : e;
		return this.setVendorProperty("transition-delay", e + "ms");
	};
	Move.prototype.setProperty = function (e, f) {
		this._props[e] = f;
		return this;
	};
	Move.prototype.setVendorProperty = function (e, f) {
		this.setProperty("-webkit-" + e, f);
		this.setProperty("-moz-" + e, f);
		this.setProperty("-ms-" + e, f);
		this.setProperty("-o-" + e, f);
		return this;
	};
	Move.prototype.set = function (e, f) {
		this.transition(e);
		if ("number" == typeof f && d[e]) {
			f += d[e];
		}
		this._props[e] = f;
		return this;
	};
	Move.prototype.add = function (e, g) {
		if (!a) {
			return;
		}
		var f = this;
		return this.on("start",
		function () {
			var h = parseInt(f.current(e), 10);
			f.set(e, h + g + "px");
		});
	};
	Move.prototype.sub = function (e, g) {
		if (!a) {
			return;
		}
		var f = this;
		return this.on("start",
		function () {
			var h = parseInt(f.current(e), 10);
			f.set(e, h - g + "px");
		});
	};
	Move.prototype.current = function (e) {
		return a(this.el).getPropertyValue(e);
	};
	Move.prototype.transition = function (e) {
		if (!this._transitionProps.indexOf(e)) {
			return this;
		}
		this._transitionProps.push(e);
		return this;
	};
	Move.prototype.applyProperties = function () {
		var g = this._props,
		e = this.el;
		for (var f in g) {
			if (g.hasOwnProperty(f)) {
				e.style.setProperty(f, g[f], "");
			}
		}
		return this;
	};
	Move.prototype.move = Move.prototype.select = function (e) {
		this.el = move.select(e);
		return this;
	};
	Move.prototype.then = function (f) {
		if (f instanceof Move) {
			this.on("end",
			function () {
				f.end();
			});
		} else {
			if ("function" == typeof f) {
				this.on("end", f);
			} else {
				var e = new Move(this.el);
				e._transforms = this._transforms.slice(0);
				this.then(e);
				e.parent = this;
				return e;
			}
		}
		return this;
	};
	Move.prototype.pop = function () {
		return this.parent;
	};
	Move.prototype.end = function (e) {
		var f = this;
		this.emit("start");
		if (this._transforms.length) {
			this.setVendorProperty("transform", this._transforms.join(" "));
		}
		this.setVendorProperty("transition-properties", this._transitionProps.join(", "));
		this.applyProperties();
		if (e) {
			this.then(e);
		}
		setTimeout(function () {
			f.emit("end");
		},
		this._duration);
		return this;
	};


	if (typeof define === "function" && (define.amd||define.cmd) ) {
		define(function (require,exports,module) {
			module.exports = c.move;
		});
	}
>>>>>>> 6382325fea1fe1d8e6bef0179fd4fe255bd1d004
})(this);