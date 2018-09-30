import Vue from 'vue';
import LoadingWidget from './components/Loading.vue';
import { merge } from './assets/js/util';

const LoadingConstructor = Vue.extend(LoadingWidget);

const defaults = {
  text: null,
  type: 'three-dots',
  background: null,
  visible: false,
  delay: 0
};

LoadingConstructor.prototype.showLoading = true;

LoadingConstructor.prototype.close = function () {
  this.showLoading = false;
  this.visible = false;
};

const show = (options = {}) => {
  let target;
  options = merge({}, defaults, options);

  if (typeof options.target === 'string') {
    target = document.querySelector(options.target);
  }
  if (target) {
    target.style.position = 'relative';
  } else {
    target = document.body;
  }

  let instance = new LoadingConstructor({
    el: document.createElement('div'),
    data: options
  });
  instance.showLoading = true;

  setTimeout(() => {
    if (!instance.showLoading) return false;
    target.appendChild(instance.$el);
    Vue.nextTick(() => {
      instance.visible = true;
    });
  }, options.delay);
  return instance;
};

export default {
  install(Vue) {
    Vue.prototype.$loading = show;
  }
};