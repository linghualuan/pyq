var that;
Page({
  data: {
    circleList: [], // 朋友圈内容列表
    images:[]
  },

  onLoad: function (options) {
    that = this;
    that.getList()
  },

  onReady: function () {

  },

  onShow: function () {

  },
  // 获取朋友圈内容信息
  getList() {
    wx.request({
      url: 'http://localhost:8080/trend/getTrendList',
      method:'POST',
      // header: {
      //   'context-type': 'application/json',
      //   'authorization': wx.getStorageSync('token')
      // },
      data:{

      },
      success(res) {
        console.log(res)
        that.setData({
          circleList:res.data.data,
        })
      }
    })
  },
  // 点击朋友圈进入详情页面
  clickFriendList(e){
    console.log(e);
    //获取该条朋友圈的唯一 trendId
    const trendId = e.currentTarget.dataset.index
    // 发送请求 获得该条trendId的内容

  },
  // 点击查看图片
  previewImage(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    wx.previewImage({
      // 当前显示图片的http链接
      // current: that.data.images[index],
      current: that.data.circleList[0].imgUrl[index],
      // urls: that.data.images, // 需要预览的图片http链接列表
      urls:that.data.circleList[0].imgUrl
    })
  },
  // 点赞
  clickLove(e){
    console.log(e);
    //获取该条朋友圈的唯一 trendId
    const trendId = e.currentTarget.dataset.index
    wx.request({
      url: 'http://localhost:8080/trendSupport/addSupport',
      method:'POST',
      header: {
        'context-type': 'application/json',
        'authorization': wx.getStorageSync('token')
      },
      data:{
        trendId
      },
      success(res) {
        console.log(res)
      }
    })
  },
})