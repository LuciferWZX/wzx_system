export enum GenderType{
    female,
    male
}
export enum Authority {
    none,
    user,
    vip,
    admin,
}
export enum PlatformType {
    DM = 'dm', //本系统
    Wechat = 'wechat', //微信
    Google = 'google', //谷歌
    DingDing = 'dingDing', //钉钉
    FeiShu = 'feiShu', //飞书
    Github = 'github', //github
}


export interface User {
    id:          number;
    dm:          string;
    gender:      GenderType;
    nickname:    string;
    password:    string;
    firstName:   null|string;
    lastName:    null|string;
    username:    string;
    phonePrefix: null|string;
    phone:       null|string;
    avatar:      null|string;
    email:       null|string;
    createDate:  string;
    updateDate:  string;
    authority:   Authority;
    platform:    PlatformType;
}