import { MessageBox } from "element-ui";
import { CONFIRM_DELETE_DATA } from "../mutation-types"
import $api from "@/http/api";
import $http from "@/http/request";
const state = {

};

const mutations = {
  [CONFIRM_DELETE_DATA]: (state, {url,ids}) => {
    MessageBox.confirm('此操作将永久删除选择的数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $http({
            url: $api[url],
            method: "get",
            // data: {ids}
          }).then(res => {})
        }).catch(() => { });
  }
};

const actions = {
  deleteRow({commit}) {

  }
};

export default {
  namespaced: false,
  state,
  mutations,
  actions
};
