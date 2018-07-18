// pages/activity/create_activity.js
// import wxValidate from 'utils/wxValidate'
//获取应用实例
const app = getApp()

Page({
  data:{
    typeArr: ['运动', '健身', '聚餐'],
    typeIndex: 0,
    costArr: ['AA制', '预收', '免费'],
    costIndex: 0,
  },
  //表单验证初始化
  onLoad: function () {
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
          digits: true
        }
      }
      , {
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
        },
        cost_value:{
          required:'请'
        }
      }
    )
  },
  bindTypeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      typeIndex: e.detail.value,
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
      costIndex: e.detail.value,
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
        title: `${error.msg} `,
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (app.globalData.userInfo) {
      //将用户数据发送给后台，进行存储
      // wx.request({
      //   url: '/activity.php', //添加活动的接口地址
      //   data: {
      //     nickname: e.detail.value.username,
      //     gender: e.detail.value.gender,
      //     age: e.detail.value.age,
      //     career: e.detail.value.career,
      //     area: e.detail.value.area
      //   },
      //   header: {
      //     'content-type': 'application/json' // 默认值
      //   },
      //   success: function (res) {
      //     wx.switchTab({
      //       url: './activity',
      //     })
      //   }
      // })
      wx.showToast({
        title: '保存成功！',
        icon: 'success',
        duration: 2000
      })
    }else{
      //显示登陆按钮并弹窗提示
      this.setData({
        show_user_login: true
      })
    }
  }
})
