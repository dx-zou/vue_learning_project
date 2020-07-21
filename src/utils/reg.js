const reg = {
  // 电话号码
  phone: /^((0\d{2,3}-\d{6,8})|(1[356789]\d{9}))$/,
  // 邮箱
  email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+$/,
  // 身份证
  identity: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  // 密码 字母数字特殊字符6-10位
  password: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,10}$/,
  // 数字，大小写字母，至少包含两种字符 6-12位
  password1: /((?=.*[0-9])(?=.*[a-z])|(?=.*[0-9])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z]))^[0-9A-Za-z]{6,12}$/,
  // 不能全部都是数字或全部都是小写字母或全部都是大写字母
  password2: /(?!^[0-9]{6-12}$)(?!^[a-z]{6-12}$)(?!^[A-Z]{6-12}$)^[0-9A-Za-z]{6-12}$/,
  // 货币千分位分隔
  currencySplit: /\B(?=(\d{3})+\b)/g,
  // 匹配成对html标签
  htmlTag: /<([^>]+)>[\d\D]*<\/\1>/
};

/**
 * 单词首字母大写
 */
export const titleize = (str) => { return str.toLowerCase().replace(/(?:^|\s)\w/g, (c) => { return c.toUpperCase() }) }


/**
 * 校验是否匹配正则
 *
 * @param {*} key 校验的类型
 * @param {*} value 校验的值
 * @returns {Boolean}
 */
const checkCanMatch = (key, value) => {
  return reg[key].test(value);
};
export default checkCanMatch;
