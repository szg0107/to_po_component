import myTest from './test/index'
import Pagination from './Pagination/index.vue'
import SearchBar from './search-main/index.vue'
import exportAndAdd from './table-btn/index.vue'
import FormTable from './table-main/index.vue'

const components = [myTest, Pagination, SearchBar, exportAndAdd, FormTable]

function install (Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.vue) {
  install(window.vue)
}
export default {
  myTest,
  install
}
export {
  myTest,
  install
}
