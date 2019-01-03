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
      localRequire.cache = {};

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
})({"mainJs/showModule.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ShowModule;

function ShowModule() {
  this.seach = document.querySelector('.seach-block');
  this.cityInput = document.querySelector('.city-input');
  this.weather = document.querySelector('.weather-block');
  this.cityName = document.querySelector('.city-head');
  this.typeOfWeather = document.querySelector(".typeOfWeather");
  this.temperature = document.querySelector('.temperature');
  this.humidity = document.querySelector('.humidity');
  this.pressure = document.querySelector('.pressure');
  this.wind = document.querySelector('.wind');
}

ShowModule.prototype.setData = function (data) {
  this.seach.style.top = '0px';
  this.cityName.innerHTML = 'City Name: ' + data.cityname;
  this.typeOfWeather.innerHTML = 'Weather: ' + data.weather;
  this.temperature.innerHTML = 'Middle Temperature: ' + data.temp + '°C';
  this.humidity.innerHTML = 'Humidity: ' + data.humidity + '%';
  this.pressure.innerHTML = 'Pressure: ' + data.pressure + 'mmHg';
  this.wind.innerHTML = "Wind: Speed: ".concat(data.wind.speed, " m/s, degree: ").concat(data.wind.deg, "\xB0");
};

ShowModule.prototype.setSugList = function (inputValue) {
  var _this = this;

  if (inputValue === '') {
    return;
  }

  var suggestions = [];
  fetch('./countries.json').then(function (json) {
    return json.json();
  }).then(function (res) {
    for (var index in res.arr) {
      if (res.arr[index].toLowerCase().startsWith(inputValue)) {
        if (suggestions.includes(res.arr[index])) {
          continue;
        }

        suggestions.push(res.arr[index]);
      }

      if (suggestions.length === 5) {
        break;
      }
    }

    if (document.querySelector('.suggest')) {
      document.querySelector('.suggest').remove();
    }

    var suglist = document.createElement('div');
    suglist.className = 'suggest';

    for (var i = 0; i < suggestions.length; i++) {
      var option = document.createElement('div');
      option.className = 'sugOption';
      option.innerHTML = suggestions[i];
      suglist.append(option);
    }

    suglist.addEventListener('click', function (event) {
      _this.cityInput.value = event.target.innerHTML;
      document.querySelector('.suggest').remove();
    });

    _this.seach.append(suglist);

    console.log(suggestions);
  });
};
},{}],"mainJs/dataModule.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DataModule;

function DataModule() {
  this.data = {
    cityname: '',
    weather: '',
    temp: '',
    humidity: '',
    pressure: '',
    wind: {
      speed: '',
      deg: ''
    }
  };
}

DataModule.prototype.formData = function (rawData) {
  if (document.querySelector('.suggest')) {
    document.querySelector('.suggest').remove();
  }

  this.data.cityname = rawData.name;
  this.data.weather = rawData.weather[0].main;
  this.data.temp = rawData.main.temp;
  this.data.humidity = rawData.main.humidity;
  this.data.pressure = rawData.main.pressure;
  this.data.wind.speed = rawData.wind.speed;
  this.data.wind.deg = rawData.wind.deg;
  return this.data;
};
},{}],"mainJs/httpDataModule.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HttpDataModule;

var _dataModule = _interopRequireDefault(require("./dataModule"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HttpDataModule() {
  _dataModule.default.call(this);

  this.url = '';
  this.city = document.querySelector('.city-input');
}

HttpDataModule.prototype = Object.create(_dataModule.default.prototype);
HttpDataModule.prototype.constructor = HttpDataModule;

HttpDataModule.prototype.getWeather = function () {
  return new Promise(function (resolve, reject) {
    fetch(this.url).then(function (response) {
      if (response.ok) {
        resolve(response.json());
      }

      throw new Error('Failed to connect, please check you input');
    }).catch(function (error) {
      reject("Failed, error ".concat(error));
    });
  }.bind(this));
};

HttpDataModule.prototype.setGeoUrl = function () {
  return new Promise(function (resolve, reject) {
    var _this = this;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        _this.url = "https://openweathermap.org/data/2.5/weather?lat=".concat(position.coords.latitude, "&lon=").concat(position.coords.longitude, "&appid=b6907d289e10d714a6e88b30761fae22");
        resolve(true);
      }, function () {
        resolve(false);
      });
    } else {
      resolve(false);
    }
  }.bind(this));
};

HttpDataModule.prototype.setInputUrl = function () {
  if (this.city.value !== '') this.url = "https://api.openweathermap.org/data/2.5/weather?q=".concat(this.city.value, "&units=metric&appid=930c1bbbbba989e24dd29e39a50af455");
};
},{"./dataModule":"mainJs/dataModule.js"}],"mainJs/staticDataModule.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = StaticDataModule;

var _dataModule = _interopRequireDefault(require("./dataModule"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function StaticDataModule() {
  _dataModule.default.call(this);
}

StaticDataModule.prototype = Object.create(_dataModule.default.prototype);
StaticDataModule.prototype.constructor = StaticDataModule;

StaticDataModule.prototype.getWeather = function () {
  return new Promise(function (resolve, reject) {
    fetch('../weatherFile.json').then(function (response) {
      if (response.ok) {
        resolve(response.json());
      }

      throw new Error('File does not exist');
    }).catch(function (error) {
      reject("Failed, error ".concat(error));
    });
  }.bind(this));
};
},{"./dataModule":"mainJs/dataModule.js"}],"mainJs/mainApp.js":[function(require,module,exports) {
"use strict";

var _showModule = _interopRequireDefault(require("./showModule"));

var _httpDataModule = _interopRequireDefault(require("./httpDataModule"));

var _staticDataModule = _interopRequireDefault(require("./staticDataModule"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var weatherShow = new _showModule.default();
var weatherGet = navigator.onLine ? new _httpDataModule.default() : new _staticDataModule.default();
var suggestions = debounce(weatherShow.setSugList, 1000, weatherShow);
weatherShow.seach.addEventListener('keydown', function (event) {
  if (event.code === 'Enter') {
    weatherGet.setInputUrl();
    weatherGet.getWeather().then(function (res) {
      return weatherGet.formData(res);
    }).then(function (data) {
      return weatherShow.setData(data);
    }).catch(function (error) {
      throw new Error(error);
    });
  }
});
weatherShow.seach.addEventListener('keyup', function (event) {
  if (!(event.code === 'Enter')) {
    suggestions(weatherShow.cityInput.value.toLowerCase());
  }
});
weatherShow.seach.addEventListener('click', function (event) {
  weatherShow.weather.style.right = '100%';
  weatherShow.weather.style.opacity = '0';
  weatherShow.seach.style.top = '100px';
});
weatherShow.seach.addEventListener('transitionend', function (event) {
  if (event.target.style.top === '0px' && event.propertyName === 'top') {
    weatherShow.weather.style.right = '0%';
    weatherShow.weather.style.opacity = '1';
  }
});

function debounce(func, time, that) {
  var id;
  return function () {
    for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
      arg[_key] = arguments[_key];
    }

    if (id) {
      clearTimeout(id);
    }

    id = setTimeout(function () {
      func.apply(that, arg);
      id = null;
    }, time);
  };
}

weatherGet.setGeoUrl().then(function (bool) {
  if (bool) {
    return weatherGet.getWeather();
  } else {
    throw new Error('Geolocation rejected');
  }
}).then(function (res) {
  return weatherGet.formData(res);
}).then(function (data) {
  return weatherShow.setData(data);
}).catch(function (error) {
  throw new Error(error);
});
},{"./showModule":"mainJs/showModule.js","./httpDataModule":"mainJs/httpDataModule.js","./staticDataModule":"mainJs/staticDataModule.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63652" + '/');

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
  overlay.id = OVERLAY_ID; // html encode message and stack trace

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
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","mainJs/mainApp.js"], null)
//# sourceMappingURL=/mainApp.99e5cb3a.map