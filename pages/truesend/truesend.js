var that;
Page({
  data: {
    topics: [
      '#我们官宣啦', '#第一条动态', '#校园无语瞬间', '#失物招领处', '#求助，在线等', '#男生请回答', '#立个脱单flag', '#写给未来的你', '#女生请回答', '#心情树洞', '#真心交友', '#单身原因自查'
    ],
    topicCotent:'',
    showModal: false,
    chooseImgs: [],
    content: ""
  },
  // 外网图片数组
  uploadImgs:[],
  onLoad: function (options) {
    that=this;
  },
  // 用户选择照片，并把照片存入数组chooseImgs中
  handleChooseImg() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        // console.log(result);
        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      }
    });
  },
  // 删除照片操作
  handleRemoveImg(e) {
    const { index } = e.currentTarget.dataset;
    let { chooseImgs } = this.data;
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs
    })
  },
  // 预览照片
  preview(event) {
    let index = event.currentTarget.dataset.index
    wx.previewImage({
      current: this.data.chooseImgs[index], // 当前显示图片的http链接
      urls: this.data.chooseImgs // 需要预览的图片http链接列表
    })
  },
  // 点击选择话题，弹出选择模态框
  submit() {
    this.setData({
      showModal: true
    })
  },
  // 获取用户选择的话题
  handlerTopics(e){
    let index = e.currentTarget.dataset.index;
    let topics = that.data.topics;
    console.log(topics[index]);
    that.setData({
      topicCotent:topics[index],
      showModal:false
    })
    
  },
  // 获取用户输入的文本内容
  bindTextAreaBlur(e) {
    console.log(e.detail.value)
    this.setData({
      content: e.detail.value,
    })
  },
  // 点击提交按钮
  bindtapsubmit() {
    const {content,chooseImgs} = that.data;
    chooseImgs.forEach((v,i)=>{
      wx.uploadFile({
        url: 'https://sm.ms/api/v2/upload', //仅为示例，非真实的接口地址
        method: 'post',
        filePath: v,
        name: 'image',
        formData: {
          
        },
        success (res){
          console.log(res);
          // console.log(JSON.parse(res.data).data.url)
        }
      })
    })
  },
  go() {
    this.setData({
      showModal: false
    })
  }

})