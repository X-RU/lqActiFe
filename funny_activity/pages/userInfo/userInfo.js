// pages/userInfo/userInfo.js
//获取应用实例
const app = getApp()

Page({
  data: {
    items: [
    { name: '男', value: '1'},
    { name: '女', value: '2'}
    ],
    careerArr:['老师','学生','律师','自由职业'],
    careerIndex:0,
    ageArr: ['10岁以下', '10-20岁', '20-30岁', '30-40岁','40-50岁','50岁以上'],
    ageIndex: 0,
    user_info:{}
  },
  //表单验证初始化
  onLoad: function () {
    this.WxValidate = app.wxValidate(
      {
        name: {
          required: true,
          minlength: 2,
          maxlength: 10,
        },
        age: {
          number:true
        }
      }
      , {
        name: {
          required: '请填写用户名',
        }
      }
    ),
      console.log("wechat_id:" + wx.getStorageSync('wechat_id'))
      //获取用户信息
      wx.request({
        url: 'http://118.25.180.46/me/' + wx.getStorageSync('wechat_id'), //获取用户信息接口地址
        method: 'GET',
        data: {
          // wechat_id: app.globalData.wechat_id
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: (res) => {
          if (res.data.code == 200) {
            console.log(res.data.code)
            this.setData({
              user_info: res.data.user_info[0]
            })

          }
        },
        fail:function(e){
          console.log(e)
        }
      })
  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  bindCareerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      careerIndex: e.detail.value,
      careerName: this.data.careerArr[e.detail.value]
    })
  },
  bindAgeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      ageIndex: e.detail.value,
      ageName: this.data.ageArr[e.detail.value]
    })
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
    console.log("qingqiu")
    //将用户数据发送给后台，进行存储
    wx.request({
      url: 'http://118.25.180.46/me/' + wx.getStorageSync('wechat_id'), //更新用户信息接口地址
      method: 'POST',
      data: {
        name: e.detail.value.name,
        gender: parseInt(e.detail.value.gender),
        career: e.detail.value.career,
        age: parseInt(e.detail.value.age),
        place: e.detail.value.place,
        specialty: e.detail.value.specialty
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.code == 200) {
          // app.globalData.userInfo = e.detail.userInfo
          wx.showToast({
            title: '更新成功!',
            icon: 'succee',
            duration: 2000
          })
          // wx.switchTab({
          //   url: '/pages/index/index'
          // })
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/index/index'
            })
          }, 3000);

        }
      }
    })
  }
})
