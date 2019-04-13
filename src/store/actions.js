import {
  INCREMENT
} from './mutation-types'
export default {
  increment: ({
    commit,
  }, number) => commit(INCREMENT, number)
}