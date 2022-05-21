const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },
  getUserProfile() {
    //获取临时登录凭证code
    wx.login({
      success(res) {
        app.globalData.code=res.code;
        if (res.code) {
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        wx.setStorageSync("nickName", res.userInfo.nickName);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        var userInfo = this.data.userInfo;
        wx.request({
          url: 'http://localhost:8080/weChatLogin',
          method: "POST",
          dataType: "json",
          //把用户基本信息传给后端
          data: JSON.stringify({
            nickName:userInfo.nickName,
            city:userInfo.city,
            country:userInfo.country,
            gender:userInfo.gender,
            province:userInfo.province,
            code:app.globalData.code
          }),
          success(res) {
            console.log(res);
            wx.setStorageSync("token", res.data.data);
            // wx.setStorageSync("remainCoin", res.data.data.remainCoin);
            // wx.setStorageSync("isAuth", res.data.data.isAuth);
          }
        })
        //获取的数据存入本地缓存
        wx.setStorageSync("userInfo", userInfo);
      }
    })
  },
})