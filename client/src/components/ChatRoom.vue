<template>
  <mu-paper class="chatroom" :zDepth="2">
    <mu-drawer :open="barIsOpen" :docked=true @close="toggleBar">
      <mu-list v-for="(menber, index) of menbers" :key="index">
        <mu-list-item :title="menber.name">
          <mu-avatar :src="menber.avatar" slot="leftAvatar"/>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
    <mu-appbar :title="name">
      <mu-avatar slot="left" :src="avatar"/>
      <mu-flat-button @click="toggleBar" slot="right" >
        人数：{{menberNum}}
      </mu-flat-button>
    </mu-appbar>
    <div class="main">
      <div v-for="(item, index) of items" :key="index">
        <mu-content-block>
          <div class="chatCont">
            <mu-avatar :src="item.avatar" />
            <mu-paper class="cont mr-40 ml-10" :zDepth="1">
              {{item.mess}}
            </mu-paper>
          </div>
        </mu-content-block>
      </div>
      <mu-content-block>
          <div class="chatCont">
            <mu-paper class="cont ml-40 mr-10" :zDepth="1">
              {{name}}
            </mu-paper>
            <mu-avatar :src="avatar" />
          </div>
        </mu-content-block>
    </div>
    <div class="mess">
      <mu-text-field class="mess-input" v-model="mess" hintText="请输入" />
      <mu-icon-button icon="M"/>
      <mu-raised-button class="mess-send" @click="sendMess" label="发送"  primary />
    </div>
  </mu-paper>
</template>

<script>
export default {
  name: 'chatroom',
  data () {
    return {
      avatar: '',
      name: '未知用户',
      menberNum: 1,
      menbers: [
        {name: '12', avatar: ''},
        {name: '122', avatar: ''}
      ],
      barIsOpen: false,
      items: [
        {name: '', data: '', joy: '', mess: '', avatar: ''}
      ],
      mess: '',
      emojis: ['😂', '🙏', '😄', '😏', '😇', '😅', '😌', '😘', '😍', '🤓', '😜', '😎', '😊', '😳', '🙄', '😱', '😒', '😔', '😷', '👿', '🤗', '😩', '😤', '😣', '😰', '😴', '😬', '😭', '👻', '👍', '✌️', '👉', '👀', '🐶', '🐷', '😹', '⚡️', '🔥', '🌈', '🍏', '⚽️', '❤️', '🇨🇳'],
    }
  },
  created: function () {
    let that = this
    if (that._getLocal('name')) {
      that.avatar = that._getLocal('avatar')
      that.name = that._getLocal('name')
      socket.emit('login', {name: that.name})
    }
  },
  mounted: function () {
    const that = this
    socket.on('message', function (data) {
      console.log(that)
      that.items.push(data)
    })
  },
  updated: function () {
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
      if (!this.mess) {
        return
      }
      socket.emit('message',
        {
          name: localStorage.getItem('name'),
          data: this.moment().format('YYYY-MM-DD HH:mm:ss'),
          joy: true,
          mess: this.mess,
          avatar: this.avatar
        },
      )
      this.mess = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  .chatroom
    display flex
    position relative
    flex-direction column
    height 100vh
    .main
      flex 1
      height 100%
      overflow scroll
      .chatCont
        display flex
        .cont
          padding 10px
          flex 1
          word-wrap break-word
          word-break break-all
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
