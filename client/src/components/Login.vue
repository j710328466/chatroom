<template>
  <div class="login">
    <mu-popup position="top" :overlay="false" popupClass="popup-top" :open="topPopup">
      {{attentionText}}
    </mu-popup>
    <div class="content">
      <mu-text-field @change="inputName" :errorText="inputErrorText" @textOverflow="handleInputOverflow" :maxLength="12" label="取个名字吧" labelFloat/><br/>
      <mu-raised-button class="enter" @click='login' label="进入聊天室"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      name: '',
      inputErrorText: '',
      attentionText: '',
      topPopup: false,
    }
  },
  created: function () {
    console.log(this)
  },
  mounted: function () {
  },
  methods: {
    // 登录验证
    login: function () {
      let that = this
      if (!that.name) {
        that.attentionText = '别调皮'
        that.topPopup = true
        return
      }
      socket.emit('login', {
        name: that.name,
        avatar: that.$store.state.avatarUrl
      })
      socket.once('login', function (data) {
        if (data.status === 'ok') {
          that.attentionText = '登录成功'
          localStorage.setItem('avatar', that.$store.state.avatarUrl)
          localStorage.setItem('name', that.name)
          setTimeout(() => {
            that.$router.push('chatroom')
          }, 1500)
        } else {
          that.attentionText = data.text
        }
        that.topPopup = true
      })
    },
    inputName: function (val) {
      this.name = val.target.value
    },
    handleInputOverflow (isOverflow) {
      this.inputErrorText = isOverflow ? '名字取那么长干嘛？' : ''
    },
  },
  watch: {
    topPopup (val) {
      if (val) {
        setTimeout(() => {
          this.topPopup = false
        }, 1500)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    position: relative;
    height: 100vh;
    text-align: center;
    background: rgba(0, 0, 0, .1);
  }
  .content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 80%;
    height: 40%;
  }
  .enter {
    margin: 20px 0;
  }
</style>
