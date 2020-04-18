const REG = {
  // 电话号码
  phone: /^((0\d{2,3}-\d{6,8})|(1[356789]\d{9}))$/,
  // 邮箱
  email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+$/,
  // 身份证
  identity: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  // 密码 字母数字特殊字符6-10位
  password: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,10}$/
};

/**
 * 校验是否匹配正则
 *
 * @param {*} key 校验的类型
 * @param {*} value 校验的值
 * @returns {Boolean}
 */
const checkCanMatch = (key, value) => {
  return REG[key].test(value);
};
export default checkCanMatch;
