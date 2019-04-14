import {
  INCREMENT,
  STATUS
} from './mutation-types'
export default {
  //异步函数
  increment({
    commit
  }, number) {
    setTimeout(() => {
      commit(INCREMENT, number)
      commit(STATUS)
    }, 3000);
  }
}