// pages/activity/activity.js
//获取应用实例
const app = getApp()

Page({
  data: {
    ac_image: '/images/logo.png',
    welcome_text:'趣生活，动起来～',
    inputShowed: false,
    inputVal: "",
    // activity_list: [{ "activity_id": 13, "aname": "\u9999\u5c71\u6e38\u8247\u4f1a", "is_need_password": 0, "password": null, "place": "\u53a6\u95e8\u601d\u660e\u533a", "capture": "\u7b80\u5355\u4ecb\u7ecd", "description": "\u8be6\u7ec6\u63cf\u8ff01", "picture": null, "date": "2019-08-08", "time": "08:08:00", "cost_type": null, "cost_value": null, "activity_status": 1, "activity_type": null, "atype": 0 }]
    
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    console.log(e)
    this.setData({
      inputVal: e.detail.value,
      activity_list: null

    });
    //发请求获取全部活动
    wx.request({
      url: 'http://10.11.4.78:8000/activity/search/' + e.detail.value, //判断活动是否已参加接口地址
      method: 'GET',
      data: {
        // content: e.detail.value
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:  (res) => {
        console.log(res.data)
        if(res.data.code == 200){
          this.setData({
            activity_list: res.data.activity_list
          });
        }
        
      }
    })
    
  },
  createActivity:function(e){
    //删除本地缓存
    wx.removeStorageSync('activity_id')
    wx.navigateTo({
      url: './create_activity',
    })
  }
})