import Vue from 'vue';

const isServer = Vue.prototype.$isServer;
/**
 * 判断是否有样式类
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * 增加一个样式类
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * 移除一个样式类
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        ele.className = ele.className.replace(reg, ' ')
    }
}

/**
 * 规范化padding，margin等样式值
 * @param {*} st 
 */
export function normalizeStyle(st) {
    let val = st
    if (st.length === 1) {
        val = [st[0], st[0], st[0], st[0]]
    }
    else if (st.length === 2) {
        val = [st[0], st[1], st[0], st[1]]
    }
    else if (st.length === 3) {
        val = [st[0], st[1], st[3], st[1]]
    }
    else {
        val = st.slice(0, 4)
    }
    return val
}

/* istanbul ignore next */
export const on = (function() {
    if (!isServer && document.addEventListener) {
      return function(element, event, handler) {
        if (element && event && handler) {
          element.addEventListener(event, handler, false);
        }
      };
    } else {
      return function(element, event, handler) {
        if (element && event && handler) {
          element.attachEvent('on' + event, handler);
        }
      };
    }
  })();
  
  /* istanbul ignore next */
  export const off = (function() {
    if (!isServer && document.removeEventListener) {
      return function(element, event, handler) {
        if (element && event) {
          element.removeEventListener(event, handler, false);
        }
      };
    } else {
      return function(element, event, handler) {
        if (element && event) {
          element.detachEvent('on' + event, handler);
        }
      };
    }
  })();