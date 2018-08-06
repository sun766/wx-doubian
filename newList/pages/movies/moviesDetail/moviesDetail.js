
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      startPosition: 0,
      movieList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var id = options.id;
      var that = this;
      var movieUrl = app.globalData.g_movieUrl;
      for (var obj in movieUrl){
         if(obj==id){
           //获取数据
           this.getData(movieUrl[obj],that,this.data.startPosition);
         }
      }
      this.setData({
        currentUrl:movieUrl[obj]
      })
      wx.setNavigationBarTitle({
        title:id
      })
  },
  getData:function(url,that,start){
    wx.request({
      url: url+'?start='+start+'&&count=20',
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        //如果先前已经有数据，在原有数据上追加；如果没有则记录
        if(that.data.movieList.length>0){
          that.setData({
            movieList: that.data.movieList.concat(res.data.subjects)
          })
        }else{
          that.setData({
            movieList: res.data.subjects
          })
        }
        //关闭加载中状态
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    })
    
  },
  onReachBottom:function(event){
    //上拉加载数据
      this.setData({
        startPosition:this.data.startPosition+20
      })
      //启动加载中状态
      wx.showNavigationBarLoading();
      this.getData(this.data.currentUrl,this,this.data.startPosition); 
  },
  onPullDownRefresh:function(event){
    //下拉刷新数据
    this.setData({
      startPosition: 0,
      movieList:[]
    })
    wx.showNavigationBarLoading();
    this.getData(this.data.currentUrl,this,this.data.startPosition); 
  },
  onDetailTap:function(event){
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../moviesInfo/moviesInfo?id=' + id
    })
  }
 
})