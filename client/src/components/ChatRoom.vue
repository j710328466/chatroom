<template>
  <transition name="fade">
    <mu-paper class="chatroom" :zDepth="2">
      <mu-drawer :open="barIsOpen" :docked=true @close="toggleBar">
        <mu-list v-for="(menber, index) of menbers.users" :key="index">
          <mu-list-item :title="menber.name">
            <mu-avatar :src="menber.avatar" slot="leftAvatar"/>
          </mu-list-item>
        </mu-list>
      </mu-drawer>
      <mu-appbar title="我就是个聊天室">
        <mu-avatar slot="left" :src="avatar"/>
        <mu-flat-button @click="toggleBar" slot="right" >
          人数：{{menbers.count || 1}}
        </mu-flat-button>
      </mu-appbar>
      <div id="main" class="main" >
        <div v-for="(msg, index) of msgs" :key="index">
          <mu-content-block v-if="!msg.self">
            <p class="date">{{msg.date}}</p>
            <div class="chatCont">
              <mu-avatar :src="msg.avatar" />
              <div class="cont">
                <p class="tl ml-10">{{msg.name}}</p>
                <mu-paper class="msg mr-40 ml-10" :zDepth="1">
                  {{msg.mess}}
                </mu-paper>
              </div>
            </div>
          </mu-content-block>
          <mu-content-block v-else>
            <p class="date">{{msg.date}}</p>
            <div class="chatCont">
              <div class="cont">
                <p class="tr mr-10">{{msg.name}}</p>
                <mu-paper class="msg ml-40 mr-10" :zDepth="1">
                  {{msg.mess}}
                </mu-paper>
              </div>
              <mu-avatar :src="msg.avatar" />
            </div>
          </mu-content-block>
        </div>
      </div>
      <div class="mess">
        <mu-text-field class="mess-input" v-model="inputMess" hintText="请输入" />
        <mu-icon-button icon="M"/>
        <mu-raised-button class="mess-send" @click="sendMess" label="发送"  primary />
      </div>
    </mu-paper>
  </transition>
</template>

<script>
export default {
  name: 'chatroom',
  data () {
    return {
      avatar: '',
      name: '未知用户',
      menbers: '',
      barIsOpen: false,
      msgs: (localStorage.msgs && JSON.parse(localStorage.msgs)) || [],
      inputMess: '',
      emojis: ['😂', '🙏', '😄', '😏', '😇', '😅', '😌', '😘', '😍', '🤓', '😜', '😎', '😊', '😳', '🙄', '😱', '😒', '😔', '😷', '👿', '🤗', '😩', '😤', '😣', '😰', '😴', '😬', '😭', '👻', '👍', '✌️', '👉', '👀', '🐶', '🐷', '😹', '⚡️', '🔥', '🌈', '🍏', '⚽️', '❤️', '🇨🇳'],
    }
  },
  beforeRouteEnter (to, from, next) {
    if (!localStorage.avatar) {
      next('/notfind')
    } else {
      next()
    }
  },
  created: function () {
    let that = this
    that.avatar = that._getLocal('avatar')
    that.name = that._getLocal('name')
    if (that._getLocal('name')) {
      socket.emit('login', {
        name: that.name,
        avatar: that._getLocal('avatar')
      })
    }
  },
  mounted: function () {
    const that = this
    this.oContent = document.querySelector('#main')
    this.oContent.scrollTop = this.oContent.scrollHeight
    socket.on('message', function (data) {
      that.msgs.push(data)
    })
    socket.on('sys', function (data) {
      let oOnline = document.createElement('div')
      oOnline.className = 'online'
      oOnline.innerText = data.text
      oOnline.style.textAlign = 'center'
      that.oContent.appendChild(oOnline)
      setTimeout(() => {
        that.oContent.scrollTop = that.oContent.scrollHeight
      }, 0)
      that.menbers = data
    })
  },
  updated: function () {
    console.log(document.body.scrollHeight)
  },
  methods: {
    _getLocal: function (item) {
      if (localStorage.getItem(item)) {
        return localStorage.getItem(item)
      }
    },
    toggleBar: function () {
      this.barIsOpen = !this.barIsOpen
    },
    sendMess: function () {
      if (!this.inputMess) {
        return
      }
      socket.emit('message',
        {
          name: localStorage.getItem('name'),
          date: this.moment().format('YYYY-MM-DD HH:mm:ss'),
          mess: this.inputMess,
          avatar: this.avatar
        },
      )
      this.msgs.push({
        name: localStorage.getItem('name'),
        date: this.moment().format('YYYY-MM-DD HH:mm:ss'),
        self: true,
        mess: this.inputMess,
        avatar: this.avatar
      })
      setTimeout(() => {
        this.oContent.scrollTop = this.oContent.scrollHeight
      }, 0)
      this.inputMess = ''
    }
  },
  watch: {
    msgs (val) {
      console.log(val)
      localStorage.msgs = JSON.stringify(val)
      setTimeout(() => {
        this.oContent.scrollTop = this.oContent.scrollHeight
      }, 0)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  p
    margin-bottom 0
  .tl
    text-align left
  .tr
    text-align right
  .fade-enter-active, .fade-leave-active
    transition opacity 1s
  .fade-enter,.fade-leave-to
    opacity 0
  .chatroom
    display flex
    position relative
    flex-direction column
    height 100vh
    .main
      flex 1
      height 100%
      overflow scroll
      .online
        text-align center
      .date
        text-align center
      .chatCont
        display flex
        .cont
          flex 1
          word-wrap break-word
          word-break break-all
          .msg
            padding 6px
    .mess
      padding 0 10px
      display flex
      width 100%
      .mess-input
        flex 1
        margin-bottom 0
      .mess-emoji
        width 50px
</style>
