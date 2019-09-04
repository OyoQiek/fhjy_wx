// pages/area/area.js
const DEFAULT_PAGE = 0;

Page({
  startPageX: 0,
  currentView: DEFAULT_PAGE,
  data: {
    toView: `card_${DEFAULT_PAGE}`,
    list:5,
    data:[],
    i:0,
    time:[],
    listI:1
  },

  touchStart(e) {
    this.startPageX = e.changedTouches[0].pageX;
  },

  touchEnd(e) {
    const moveX = e.changedTouches[0].pageX - this.startPageX;
    const maxPage = this.data.list - 1;
    if (Math.abs(moveX) >= 150) {
      if (moveX > 0) {
        this.currentView = this.currentView !== 0 ? this.currentView - 1 : 0;
      } else {
        this.currentView = this.currentView !== maxPage ? this.currentView + 1 : maxPage;
      }
    }
    this.setData({
      toView: `card_${this.currentView}`
    });
  },
  load(){
    wx.showLoading({
      title: '正在加载中...',
    })
    wx.cloud.callFunction({
      name:"movielist",
      data:{
        start:0,
        count:20
      }
    }).then(res=>{
      console.log(JSON.parse(res.result).subjects)
      var time=new Date();
      var now=time.toLocaleDateString();
      now = (time.getMonth() < 9 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1) + "-" + (time.getDate() < 10 ? "0" + time.getDate() : time.getDate())
      var next=new Date(Date.parse(now)+1000*60*60*24);
      next =( next.getMonth() < 9 ? "0" + (next.getMonth()+1) : next.getMonth()+1) + "-" + (next.getDate() < 10 ? "0" + next.getDate() : next.getDate())
      this.setData({
        data: JSON.parse(res.result).subjects,
        time:[now,next]
      })
      wx.hideLoading()
    }).catch(err=>{
      console.log(err)
    })
  },
  listtab(e){
    this.setData({listI:e.target.dataset.list})
  },
  todetail(e){
    console.log(e.target.dataset.i)
    this.setData({ i: e.target.dataset.i})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.load()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})