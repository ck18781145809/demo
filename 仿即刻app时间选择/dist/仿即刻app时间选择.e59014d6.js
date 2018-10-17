// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"index.js":[function(require,module,exports) {
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * 仿 即刻APP 时间选择组件
 * 引用layDate组件
 * Created by Chenkuo on 2018\4\19
 */
var datePicker = function () {
	function datePicker() {
		_classCallCheck(this, datePicker);

		this.year; //  时间状态
		this.month; //  月份状态
		this.day; //  日期状态
	}

	/*
  * 点击header的年份
  * */


	_createClass(datePicker, [{
		key: 'yearValueClick',
		value: function yearValueClick() {
			var _this = this;
			this.yearValue.onclick = function (e) {
				_this.showYearSelectBox();
			};
		}

		/*
   * 切换到年份选择面板
   * */

	}, {
		key: 'showYearSelectBox',
		value: function showYearSelectBox() {
			//  隐藏日期选择框
			this.daySelectBox.classList.add('hide');

			//  显示年份选择框
			this.yearSelectBox.classList.remove('hide');
			this.yearSelectBox.classList.add('show');
		}

		/*
   * 点击header的日期
   * */

	}, {
		key: 'dayValueClick',
		value: function dayValueClick() {
			var _this = this;
			this.dayValue.onclick = function (e) {
				_this.showDaySelecyBox();
			};
		}

		/*
   * 切换到日期选择面板
   * */

	}, {
		key: 'showDaySelecyBox',
		value: function showDaySelecyBox() {
			//  隐藏年份选择框
			this.yearSelectBox.classList.add('hide');

			//  显示日期选择框
			this.daySelectBox.classList.remove('hide');
			this.daySelectBox.classList.add('show');
		}

		/*
   * 年份显示框赋值
   * */

	}, {
		key: 'yearValueWrite',
		value: function yearValueWrite(year) {
			this.yearValue.innerText = year;
		}

		/*
   * 月份显示框赋值
   * */

	}, {
		key: 'dayValueWrite',
		value: function dayValueWrite(year, month, day) {
			this.yearValueWrite(year);
			this.dayValue.innerText = month + "月" + day + '日';
		}

		/*
   * 渲染年份选择面板
   * */

	}, {
		key: 'renderYearSelect',
		value: function renderYearSelect() {
			var _this = this;
			/*
    * 年份选择初始化
    * */
			laydate.render({
				elem: '.datePicker-content-year-select',
				type: 'year',
				position: 'static',
				showBottom: false,
				change: function change(value, date, endDate) {
					_this.year = date.year;
					_this.yearValueWrite(value);
					_this.createNewDaySelectBox();
					_this.renderDaySelect(value, _this.month, _this.day);
					_this.showDaySelecyBox();

					/* 当前时间 */
					// console.log( _this.year, _this.month, _this.day )
				}
			});
		}

		/*
   * 渲染日期选择面板
   * */

	}, {
		key: 'renderDaySelect',
		value: function renderDaySelect(year, month, day) {
			var _this = this;
			laydate.render({
				elem: '.datePicker-content-day-select',
				position: 'static',
				showBottom: false,
				value: year + '-' + month + '-' + day,
				change: function change(value, date, endDate) {
					_this.dayValueWrite(date.year, date.month, date.date);
					_this.year = date.year;
					_this.month = date.month;
					_this.day = date.date;

					/* 当前时间 */
					// console.log( _this.year, _this.month, _this.day )
				}
			});
		}

		/*
   * 重新创建日期选择面板
   * */

	}, {
		key: 'createNewDaySelectBox',
		value: function createNewDaySelectBox() {
			this.datePickerContent.removeChild(this.daySelectBox);

			var newDaySelectBox = document.createElement('div');
			newDaySelectBox.className = 'datePicker-content-select datePicker-content-day-select hide';

			this.daySelectBox = newDaySelectBox;

			this.datePickerContent.appendChild(newDaySelectBox);
		}

		/*
   * 渲染组件HTML
   * */

	}, {
		key: 'renderHTML',
		value: function renderHTML() {

			var that = this;

			var _datePickerHeader = document.createElement('div');
			_datePickerHeader.className = 'datePicker-header';
			var _datePickerShowYear = document.createElement('p');
			_datePickerShowYear.className = 'datePicker-show-year';
			var _datePickerShowDay = document.createElement('p');
			_datePickerShowDay.className = 'datePicker-show-day';

			this.dayValue = _datePickerShowDay;
			this.yearValue = _datePickerShowYear;

			_datePickerHeader.appendChild(_datePickerShowYear);
			_datePickerHeader.appendChild(_datePickerShowDay);

			var _datePickerContent = document.createElement('div');
			_datePickerContent.className = 'datePicker-content';
			var _datePickerContentDaySelect = document.createElement('div');
			_datePickerContentDaySelect.className = 'datePicker-content-select datePicker-content-day-select';
			var _datePickerContentYearSelect = document.createElement('div');
			_datePickerContentYearSelect.className = 'datePicker-content-select datePicker-content-year-select hide';

			this.datePickerContent = _datePickerContent;
			this.daySelectBox = _datePickerContentDaySelect;
			this.yearSelectBox = _datePickerContentYearSelect;

			_datePickerContent.appendChild(_datePickerContentDaySelect);
			_datePickerContent.appendChild(_datePickerContentYearSelect);

			var _datePickerFooter = document.createElement('div');
			_datePickerFooter.className = 'datePicker-footer';
			var _datePickerFooterCancel = document.createElement('a');
			_datePickerFooterCancel.innerText = '取消';
			_datePickerFooterCancel.onclick = function () {
				that.cancelHandler();
			};
			var _datePickerFooterConfirm = document.createElement('a');
			_datePickerFooterConfirm.innerText = '确定';
			_datePickerFooterConfirm.onclick = function () {
				that.confirmHandler();
			};

			_datePickerFooter.append(_datePickerFooterCancel);
			_datePickerFooter.append(_datePickerFooterConfirm);

			var _datePicker = document.createElement('div');
			_datePicker.className = 'datePicker';

			this.datePicker = _datePicker;

			_datePicker.appendChild(_datePickerHeader);
			_datePicker.appendChild(_datePickerContent);
			_datePicker.appendChild(_datePickerFooter);

			document.body.appendChild(_datePicker);
		}

		/*
   * 组件确定点击事件
   * */

	}, {
		key: 'confirmHandler',
		value: function confirmHandler() {

			this.targetElement.value = this.year + '-' + this.month + '-' + this.day;
			this.datePicker.classList.add('hide');
		}

		/*
   * 组件确定点击事件
   * */

	}, {
		key: 'cancelHandler',
		value: function cancelHandler() {

			this.datePicker.classList.add('hide');
		}

		/*
   * 初始化
   * */

	}, {
		key: 'init',
		value: function init(ele) {

			var that = this;

			this.targetElement = document.querySelector(ele);
			this.targetElement.addEventListener('click', function () {
				if (that.datePicker) {

					that.datePicker.classList.remove('hide');
				} else {

					that.renderHTML();

					/*
      * 显示内容初始赋值
      * */
					var initDate = new Date();

					that.renderYearSelect();
					that.renderDaySelect(initDate.getFullYear(), initDate.getMonth() + 1, initDate.getDate());

					/*
      * 初始赋值
      * */
					that.year = initDate.getFullYear();
					that.month = initDate.getMonth() + 1;
					that.day = initDate.getDate();

					that.dayValueWrite(that.year, that.month, that.day);

					/*
      * 初始化点击事件
      * */
					that.yearValueClick();
					that.dayValueClick();
				}
			});
		}
	}]);

	return datePicker;
}();
},{}],"C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\parcel\\src\\builtins\\hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '58128' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\parcel\\src\\builtins\\hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/仿即刻app时间选择.e59014d6.map