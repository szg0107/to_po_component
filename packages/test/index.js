import myTest from './test.vue'

myTest.install = function (Vue) {
  Vue.component(myTest.name, myTest)
}
export default myTest
