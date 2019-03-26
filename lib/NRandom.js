"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NRandom = function () {
  function NRandom() {
    (0, _classCallCheck3.default)(this, NRandom);
    this.NPool = {};
  }

  (0, _createClass3.default)(NRandom, [{
    key: "BoxMuller",
    value: function BoxMuller(miu, sigma) {
      var u1 = Math.random();
      var u2 = Math.random();
      var z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);

      return z0 * sigma + miu;
    }
  }, {
    key: "newRandomPool",
    value: function newRandomPool(pId, mius) {
      var sigmas = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];


      if (this.NPool[pId]) {
        console.log("[Warning] N random pool Id already exists at " + pId + ", it will be rewrite");
      }

      this.NPool[pId] = {
        Miu: [],
        Sigma: [],
        NRandomRet: [],
        NRandomIdx: []
      };

      var tRet = [];
      var tIdx = [];

      for (var i = 0; i < mius.length; i++) {

        this.NPool[pId].Miu.push(mius[i]);
        this.NPool[pId].Sigma.push(sigmas[i] ? sigmas[i] : mius[i] / 3);
        tRet.push(this.BoxMuller(this.NPool[pId].Miu[i], this.NPool[pId].Sigma[i]));
        tIdx.push(i);
      }

      //Set NPull.RandomRet as a [HEAP]
      for (var _i = 0; _i < tRet.length; _i++) {
        this.NPool[pId].NRandomRet[_i] = tRet[_i];
        this.NPool[pId].NRandomIdx[_i] = tIdx[_i];

        var j = _i;
        while (j > 0) {
          var upper = Math.floor((j - 1) / 2);
          if (this.NPool[pId].NRandomRet[j] < this.NPool[pId].NRandomRet[upper]) {
            //swap
            var t = void 0;
            t = this.NPool[pId].NRandomRet[j];
            this.NPool[pId].NRandomRet[j] = this.NPool[pId].NRandomRet[upper];
            this.NPool[pId].NRandomRet[upper] = t;

            t = this.NPool[pId].NRandomIdx[j];
            this.NPool[pId].NRandomIdx[j] = this.NPool[pId].NRandomIdx[upper];
            this.NPool[pId].NRandomIdx[upper] = t;

            j = upper;
          } else {
            break;
          }
        }
      }
    }
  }, {
    key: "NRandomRet",
    value: function NRandomRet(pId) {

      if (!this.NPool[pId]) {
        console.log("[Warning] N Random pool " + pId + " is null. Random result will be 0");
        return 0;
      }

      var poolInfo = this.NPool[pId];
      var ret = poolInfo.NRandomIdx[0];

      //Attention this +=
      poolInfo.NRandomRet[0] += this.BoxMuller(poolInfo.Miu[ret], poolInfo.Sigma[ret]);

      //heap doing
      var j = 0;
      //May while(1) already right.
      while (j < poolInfo.NRandomRet.length) {
        var c1 = j * 2 + 1;
        var c2 = j * 2 + 2;
        var swapIdx = -1;

        var c = c1;
        //决定到底应该换哪一个
        if (c2 < poolInfo.NRandomRet.length && poolInfo.NRandomRet[c2] <= poolInfo.NRandomRet[c1]) {
          c = c2;
        }

        if (c < poolInfo.NRandomRet.length && poolInfo.NRandomRet[j] > poolInfo.NRandomRet[c]) {
          swapIdx = c;
        } else {
          break;
        }

        var t = void 0;
        t = poolInfo.NRandomRet[j];
        poolInfo.NRandomRet[j] = poolInfo.NRandomRet[swapIdx];
        poolInfo.NRandomRet[swapIdx] = t;

        t = poolInfo.NRandomIdx[j];
        poolInfo.NRandomIdx[j] = poolInfo.NRandomIdx[swapIdx];
        poolInfo.NRandomIdx[swapIdx] = t;

        j = swapIdx;
      }

      //console.log(poolInfo.NRandomRet.map(v=>Math.floor(v)).join(','));
      //console.log(poolInfo.NRandomIdx.map(v=>Math.floor(v)).join(','));
      return ret;
    }
  }]);
  return NRandom;
}();

exports.default = NRandom;