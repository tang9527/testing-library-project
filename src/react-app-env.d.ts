/// <reference types="react-scripts" />
type RawLvzuan = {
  code: number;
  isyear: number;
  level: number;
  payway: number;
  place: number;
  score: number;
  subcode: number;
  vendor: number;
  vip: number;
};
type RawQQ = {
  /***
   * 状态码
   */
  code: number;
  /**
   * QQ昵称
   */
  name: string;
  /**
   * QQ头像
   */
  qlogo: string;
  /**
   * 查询的QQ
   */
  qq: string;
  /**
   * 绿钻相关信息
   */
  lvzuan: RawLvzuan;
};
type HttpResponse = {
  status: number;
  data: any;
};
