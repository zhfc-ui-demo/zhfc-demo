/**权限指令**/
let menuInfo = null


export default {
  inserted: function (el, binding, vnode) {
    let vuexData = sessionStorage.getItem('vuex')
    let menusJson = null;
    if (vuexData) {
      menusJson = JSON.parse(vuexData).menus || ''
    }
    if (!menusJson || !menusJson.children) return;
    // 获取页面按钮权限
    menuInfo = null
    let btnPermissionsArr = filterRouteBtn(vnode.context.$route.path, menusJson.children)
    // 获取页面按钮code 属性
    let nodeValue = el.attributes.code && el.attributes.code.nodeValue || ''
    if (!nodeValue) return;
    let btnList = (btnPermissionsArr && btnPermissionsArr.nodeLevel || '').split(',')
    if (!btnList.includes(nodeValue)) {
      el.parentNode.removeChild(el)
    }
  }
};

function filterRouteBtn(resPath, resMenuList) {
  for (const element of resMenuList) {
    if (element.url == resPath && location.pathname.includes(element.baseUrl)) {
      menuInfo = element
    } else if (element.children && element.children.length > 0) {
      filterRouteBtn(resPath, element.children);
    }
    if (menuInfo) {
      return menuInfo;
    }
  }
}

/**
 *  自定义指令实现按钮权限控制
 * 
 * 1：子工程中， 将此文件（建议复制一份，系统独立）导入main.js ，
 * 2: 在要实现权限控制的按钮上 加上自定义指令 v-auth 和code属性 ，code属性绑定按钮编码（之前收集过，后面可以在基础平台=》系统配置=》菜单管理  中维护） 
 * 3：按钮上同时有指令 v-auth 和code属性，才会进行按钮的权限控制 ，数据来源与主工程登陆后请求的getUserMenuItems 接口
 */