// pages/activity/create_activity.js
//获取应用实例
const app = getApp()

Page({
  data:{
    typeArr: ['运动', '健身', '聚餐'],
    typeIndex: 0,
    costArr: ['AA制', '预收', '免费'],
    costIndex: 0,
    is_created:true
  },
  
  onLoad: function () {
    //判断是更新还是创建活动，创建活动
    if (wx.getStorageSync('activity_id')){
      console.log("ss" + wx.getStorageSync('activity_id'))
      this.setData({
        is_created: false
      })
      // 请求获取活动信息
      wx.request({
        url: 'http://10.11.4.78:8000/activity/' + wx.getStorageSync('wechat_id') + '/detail/' + wx.getStorageSync('activity_id'), //获取活动详情接口地址
        method: 'GET',
        data: {
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: (res) => {
          console.log(res.data)
          if (res.data.code == 200) {
            this.setData({
              aname: res.data.activity[0].aname,
              typeIndex: res.data.activity[0].atype.toString(),
              typeName: this.data.typeArr[res.data.activity[0].atype],
              date: res.data.activity[0].date,
              time: res.data.activity[0].time,
              place: res.data.activity[0].place,
              costIndex: res.data.activity[0].cost_type,
              costName: this.data.costArr[res.data.activity[0].cost_type],
              description: res.data.activity[0].description
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
    }
   //表单验证初始化
    this.WxValidate = app.wxValidate(
      {
        aname: {
          required: true,
          minlength: 2,
          maxlength: 10,
        },
        atype: {
          required: true
        },
        date: {
          required: true
        },
        time: {
          required: true
        },
        place: {
          required: true
        },
        cost_value: {
          number: true
        },
        // cost_type: {
        //   required: true
        // },
        description:{
          maxlength:200
        }
      }, {
        aname: {
          required: '请填写活动主题',
        },
        atype: {
          required: '请选择活动类别',
        },
        date: {
          required: '请选择活动日期',
        },
        time: {
          required: '请选择活动时间',
        },
        place: {
          required: '请填写活动地点',
        }
      }
    )
  },
  bindTypeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      typeIndex: e.detail.value.toString(),
      typeName: this.data.typeArr[e.detail.value]
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindCostTypeChange: function (e) {
    this.setData({
      cost_Index: e.detail.value.toString(),
      costName: this.data.costArr[e.detail.value]
    })
    if (e.detail.value == 1){
      this.setData({
        show_cost_value: true
      })
    }
  },
  clearType: function(e) {
    this.setData({
      typeName: ''
    })
  },
  clearDate: function (e) {
    this.setData({
      date: ''
    })
  },
  clearTime: function (e) {
    this.setData({
      time: ''
    })
  },
  clearPlace: function (e) {
    this.setData({
      place: ''
    })
  },
  clearCostType: function (e) {
    this.setData({
      costName: '',
      show_cost_value: false
    })
  },
  goBack: function () {
    wx.navigateBack({ changed: true });
  },
  
  formSubmit: function (e) {
    console.log('提交用户数据', e.detail.value)
    //提交错误描述
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      // `${error.param} : ${error.msg} `
      wx.showToast({
        title: `${error.msg}`,
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo)
      console.log(e.detail.value)
      //创建活动
      if (!wx.getStorageSync('activity_id')) {
        // 将用户数据发送给后台，进行存储
        wx.request({
          url: 'http://10.11.4.78:8000/activity', //添加活动的接口地址
          method: 'POST',
          data: {
            wechat_id: wx.getStorageSync('wechat_id'),
            aname: e.detail.value.aname,
            atype: parseInt(e.detail.value.atype),
            date: e.detail.value.date,
            time: e.detail.value.time,
            place: e.detail.value.place,
            description: e.detail.value.description,
            cost_type: parseInt(e.detail.value.cost_type),
            cost_value: e.detail.value.cost_value,
            activity_status: 0
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            // 创建新活动成功后跳转详情页
            if (res.data.code == 200) {
              wx.showToast({
                title: '保存成功！',
                icon: 'success',
                duration: 1000
              }),
                wx.redirectTo({
                  url: './activity_detail?activity_id=' + res.data.activity_id,
                })
            } else {
              wx.showToast({
                title: '活动创建失败，请重新创建！',
                icon: 'none',
                duration: 2000
              })
            }

          }
        })
      }else{
        console.log("gengxin")
        console.log(e.detail.value.atype)
        // 将用户数据发送给后台，进行存储
        wx.request({
          url: 'http://10.11.4.78:8000/activity/' + wx.getStorageSync('wechat_id') + '/created/' + wx.getStorageSync('activity_id'), //更新活动的接口地址
          method: 'POST',
          data: {
            wechat_id: wx.getStorageSync('wechat_id'),
            aname: e.detail.value.aname,
            atype: parseInt(e.detail.value.atype),
            date: e.detail.value.date,
            time: e.detail.value.time,
            place: e.detail.value.place,
            description: e.detail.value.description,
            cost_type: parseInt(e.detail.value.cost_type),
            cost_value: e.detail.value.cost_value,
            activity_status: 0
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data);
            // 创建新活动成功后跳转详情页
            if (res.data.code == 200) {
              wx.showToast({
                title: '更新成功！',
                icon: 'success',
                duration: 1000
              }),
                wx.redirectTo({
                url: './activity_detail?activity_id=' + wx.getStorageSync('activity_id'),
                })
            } else {
              wx.showToast({
                title: '活动更新失败，请重新更新！',
                icon: 'none',
                duration: 2000
              })
            }

          }
        })
      }
      
      
    }else{
      //显示登陆按钮并弹窗提示
      wx.showToast({
        title: '请先登录！',
        icon: 'none',
        duration: 1000
      }),
      this.setData({
        show_user_login: true
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    if (e.detail.userInfo == null) {
      // 不做操作
    } else {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
        show_user_login: false
      })
    }

  }
})
