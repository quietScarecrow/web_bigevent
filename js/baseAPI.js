$(function () {
  /* 
    每次发送 ajax 请求前，都会调用此函数
    作用：获取发送 ajax 请求的配置信息
  */
  $.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
  });
});