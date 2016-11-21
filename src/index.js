/**
 * Created by pc on 2016/9/8.
 */

var VueResource = require('vue-resource');
var Common = require('./js/rock');
var VueRouter = require('vue-router');
var Vue = require('vue');
var App = require('./views/App.vue');

Common.autoSize();//自适应

//注册两个插件
Vue.use(VueResource);
Vue.use(VueRouter);
const router = new VueRouter();
require('./routers')(router);
router.start(App, '#app');
