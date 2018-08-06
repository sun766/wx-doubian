var app = getApp();
var util = require('../../utils/util.js');

Page({
  data:{
    movies:{
      in_theaters: {},
      coming_soon: {},
      top250: {},
      searchResult:{} 
    }, 
    listStatus: true,
    resultStatus: false,
    tip:''
  },
  onLoad:function(event){
    var movies = this.data.movies;
    var in_theatersUrl = app.globalData.g_movieBase+'/v2/movie/in_theaters';
    var coming_soonUrl = app.globalData.g_movieBase + '/v2/movie/coming_soon';
    var top250Url = app.globalData.g_movieBase + '/v2/movie/top250';
    this.getData(in_theatersUrl, 'in_theaters', '正在热播中');
    this.getData(coming_soonUrl, 'coming_soon','即将上映');
    this.getData(top250Url, 'top250','名列前茅');
    //将各分类地址对应记录下来
    app.globalData.g_movieUrl = {
      '正在热播中':in_theatersUrl,
      '即将上映':coming_soonUrl,
      '名列前茅': top250Url
    }
  },
  getData: function (url, index,title) {
    var that = this;
    var movies = this.data.movies;
    wx.request({
      url: url,
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        if (index =="searchResult"){
          if (res.data.subjects.length == 0) {
            that.setData({
              listStatus: true,
              resultStatus: false
            })
            wx.showToast({
              title: "无结果",
              icon: 'none'
            })
          }
        }
        for (var obj in movies) {
          if (obj == index ) {
            if (index =="searchResult"){
              movies[index] = {
                subjects: res.data.subjects,
                title: title
              }
            }else{
              movies[index] = {
                subjects: res.data.subjects.slice(0, 3),
                title: title
              };
            }  
          }
        }
        that.setData({
          movies: movies
        })
      }
    })
  },
  onMoreTap:function(event){
    var id = event.currentTarget.dataset.id;
      wx.navigateTo({
        url:'moviesDetail/moviesDetail?id='+id
      })
  },
  onTap:function(event){
    this.setData({
      listStatus: true,
      resultStatus: false
    })
    
  },
  onFocus:function(event){
    //获取焦点后，搜索内容出现
    
  },
  onChange:function(event){
     var content = event.detail.value;
     var queryUrl = app.globalData.g_movieBase + '/v2/movie/search?q='+content;
     this.getData(queryUrl,"searchResult","");
     //显示结果
     this.setData({
       listStatus: false,
       resultStatus: true
     })
  },
  onDetailTap:function(event){
     var id = event.currentTarget.dataset.id;
     wx.navigateTo({
       url:'./moviesInfo/moviesInfo?id='+id
     })
  }

})