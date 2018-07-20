// pages/activity/activity_detail.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity:{ "activity_id": 13, "aname": "\u9999\u5c71\u6e38\u8247\u4f1a", "is_need_password": 0, "password": null, "place": "\u53a6\u95e8\u601d\u660e\u533a", "capture": "\u7b80\u5355\u4ecb\u7ecd", "description": "\u8be6\u7ec6\u63cf\u8ff01", "picture": null, "date": "2019-08-08", "time": "08:08:00", "cost_type": null, "cost_value": null, "activity_status": 1, "activity_type": null, "atype": 0 },
    count:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorageSync('activity_id', options.activity_id) 
    wx.request({
      url: 'http://10.11.4.78:8000/activity/' + wx.getStorageSync('wechat_id') + '/detail/' + options.activity_id, //获取活动详情接口地址
      method:'GET',
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:  (res) => {
        console.log(res.data)
        if (res.data.code == 200) {
          this.setData({
            activity: res.data.activity[0],
            user_list: res.data.user_list,
            count: res.data.count,
            is_participate: res.data.is_participate,
            is_sponsor: res.data.is_sponsor

          });
        } else {
          wx.showToast({
            title: '活动信息请求失败！',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  bindJoinActivity:function(e) {
    // // 将用户数据发送给后台，进行存储
    wx.request({
      url: 'http://10.11.4.78:8000/activity/detail', //判断活动参加接口地址
      method:'POST',
      data: {
        wechat_id: wx.getStorageSync('wechat_id') ,
        activity_id: wx.getStorageSync('activity_id')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if(res.data.code == 200){
            wx.showToast({
              title: '报名成功！',
              icon: 'success',
              duration: 2000
            })
            wx.redirectTo({
              url: './activity_detail?activity_id=' + wx.getStorageSync('activity_id'),
            })
        } else if (res.data.code == 600){
            wx.showToast({
              title: '您已报名，请勿重复报名！',
              icon: 'none',
              duration: 2000
            })
        }
      }
    })
  },
  bindOutActivity: function (e) {
    wx.showModal({
      title: '提醒',
      content: '确认退出该活动吗？',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          // 此处请求后台删除该活动的参与人
          wx.request({
            url: 'http://10.11.4.78:8000/activity/' + wx.getStorageSync('wechat_id') + '/detail/' + wx.getStorageSync('activity_id'), //是否退出活动接口地址
            method:'DELETE',
            data: {
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res.data)
              if (res.data.code == 200) {
                wx.showToast({
                  title: '退出成功！',
                  icon: 'success',
                  duration: 2000
                })
                wx.redirectTo({
                  url: './activity_detail?activity_id=' + wx.getStorageSync('activity_id'),
                })
              } else {
                wx.showToast({
                  title: '退出出错！',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
          console.log('用户点击确认')
        } else {
          console.log('用户点击取消')
        }
      }
    });
    
  },
  bindDeleteActivity: function (e) {
    wx.showModal({
      title: '提醒',
      content: '确认删除该活动吗？',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          // 此处请求
          wx.request({
            url: 'http://10.11.4.78:8000/activity/' + wx.getStorageSync('wechat_id') + '/created/' + wx.getStorageSync('activity_id'), //删除该活动接口地址
            method: 'DELETE',
            data: {

            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log("shanchu"+res.data)
              console.log(res.data.affected)
              if (res.data.code ==200 && res.data.affected == '1') {
                flag = true
                wx.showToast({
                  title: '删除成功！',
                  icon: 'success',
                  duration: 2000
                })
                wx.redirectTo({
                  url: './activity_detail?activity_id=' + wx.getStorageSync('activity_id'),
                })
              } else{
                wx.showToast({
                  title: '删除出错！',
                  icon: 'none',
                  duration: 2000
                })
              }
              
            }
          })
          console.log('用户点击确认')
          
        } else {
          console.log('用户点击取消')
        }
       
      }
    });
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log(res.from)
    if (res.from == 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '小伙伴们，一起趣活动吧～～',
      // path:'/pages/index/index' //默认当前页面
    }
  }
})