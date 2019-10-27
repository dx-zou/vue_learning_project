export const chattingList = [
  {
    id: 0,
    img: require("@/assets/images/head1.png"),
    name: "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
    msgNum: 1,
    active: false,
    time: "2018-01-23 12:03"
  },
  {
    id: 1,
    img: require("@/assets/images/head1.png"),
    name: "哈哈哈和",
    msgNum: 35,
    active: false,
    time: "2018-01-23 12:03"
  },
  {
    id: 2,
    img: require("@/assets/images/head1.png"),
    name: "哈哈哈",
    msgNum: 0,
    active: false,
    time: "2018-01-23 12:03"
  },
  {
    id: 3,
    img: require("@/assets/images/head1.png"),
    name: "哈哈哈",
    msgNum: 0,
    active: false,
    time: "2018-01-23 12:03"
  },
  {
    id: 4,
    img: require("@/assets/images/head1.png"),
    name: "哈哈哈",
    msgNum: 0,
    active: false,
    time: "2018-01-23 12:03"
  }
];

function getFaceList() {
  let arr = [];
  for (let i = 0; i < 72; i++) {
    arr.push({ imgSrc: require(`@/assets/face/${i}.gif`) });
  }
  return arr;
}
export const faceList = getFaceList();
