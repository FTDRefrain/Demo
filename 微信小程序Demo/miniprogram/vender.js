import regeneratorRuntime from 'regenerator-runtime'

global.regeneratorRuntime = regeneratorRuntime;

import util from './util/util'

global.util = util;

import R from 'ramda'

global.R = R;

const asyncWrap = fn => (options = {}) => new Promise((rs, rj) => {
  let conf = {
    success: res => {
      console.log(res);
      rs(res)
    }
  };

  wx[fn](R.merge(conf, options))
});

wx.getUserOpenIdAsync = asyncWrap('getUserOpenId');
wx.loginAsync = asyncWrap('login');
wx.getUserInfoAsync = asyncWrap('getUserInfo');
wx.reqAsync = asyncWrap('request');