import { createVNode, render, createApp } from 'vue'
import Toast from './Toast'

var toast = {}

toast.install = function (Vue, options) {
  // Vue 2.x 写法
  // // 创建组件构造器
  // const toastConstructor = Vue.extend(Toast)
  // // 创建组件实例对象
  // const toast = new toastConstructor()
  // // 将组件挂载到div元素中
  // toast.$mount(document.createElement('div'))
  // // 将组件添加到body中
  // document.body.appendChild(toast.$el)
  // // 将组件挂载到 Vue 原型上
  // Vue.prototype.$toast = toast

  // Vue 3.x 写法
  // 创建要挂载的元素
  // const mountNode = document.createElement('div')
  // // 创建虚拟DOM
  // const toastInstance = createVNode(Toast, {
  //   ...options
  // })
  // // render将虚拟DOM转为真实DOM并挂载到新创建的元素上
  // render(toastInstance, mountNode)
  // // 真实DOM挂载到body之中
  // document.body.appendChild(mountNode)
  // // 将组件挂载到 Vue 原型上
  // Vue.config.globalProperties.$toast = toastInstance
}

export default toast