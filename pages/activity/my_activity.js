// pages/activity/my_activity.js
//获取应用实例
const app = getApp()
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["我发起的", "我参与的"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    // //测试数据
    // created_list: [{ "aname": "活动名称", "wechatId": "活动发起人Id", "atype": "运动", "description": "胡里山炮台街头健身局", ",date": "2018/07/13", "time": "12:00" }],
    // participate_list: [{ "aname": "活动名称", "wechatId": "活动发起人Id", "atype": "运动", "place": "胡里山炮台", "date": "2018/07/13", "time": "12:00","description": "胡里山炮台街头健身局", }],
    // is_participate: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('wechat_id')) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
        console.log("ok")
        var that = this;
        wx.getSystemInfo({
          success: function (res) {
            that.setData({
              sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
              sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
            });
          }
        });
        
        //发请求获取全部活动
        wx.request({
          url: app.globalData.serverUrl +'activity/list/' + wx.getStorageSync('wechat_id'), //判断活动是否已参加接口地址
          method: 'GET',
          data: {
            // wechat_id: app.globalData.wechat_id
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success:  (res)=> {
            console.log(res.data)
            if(res.data.code ==200){
              this.setData({
                created_list: res.data.created_list,
                participate_list: res.data.participate_list
              })
            }
            
          }
        })
      }else{
        console.log("err")
        wx.showToast({
          title: '请先登录！',
          icon: 'none',
          duration: 2000
        })
        setTimeout(function () {
          wx.switchTab({
            url: '/pages/index/index',
            fail: (err) => { console.log(err) }
          })
        }, 2000)
        
      }
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  
  }
})