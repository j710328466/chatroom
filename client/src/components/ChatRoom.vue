<template>
  <mu-paper class="chatroom" :zDepth="2">
    <mu-drawer :open="barIsOpen" :docked=true @close="toggleBar">
      <mu-list>
        <mu-list-item title="Menu Item 1"/>
        <mu-list-item title="Menu Item 2"/>
        <mu-list-item title="Menu Item 3"/>
      </mu-list>
    </mu-drawer>
    <mu-appbar title="chatroom">
      <mu-avatar slot="left" :src="avatar"/>
      <mu-flat-button @click="toggleBar" slot="right" >
        人数：{{menber}}
      </mu-flat-button>
    </mu-appbar>
    <div class="main">
      <div v-for="(item, index) of items" :key="index">
        <mu-content-block>
          <div class="chatCont">
            <mu-avatar :src="item.avatar" />
            <mu-paper class="cont" :zDepth="1">
              {{item.mess}}
            </mu-paper>
          </div>
        </mu-content-block>
      </div>
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
      menber: 1,
      barIsOpen: false,
      items: [],
      mess: '',
      emojis: ['😂', '🙏', '😄', '😏', '😇', '😅', '😌', '😘', '😍', '🤓', '😜', '😎', '😊', '😳', '🙄', '😱', '😒', '😔', '😷', '👿', '🤗', '😩', '😤', '😣', '😰', '😴', '😬', '😭', '👻', '👍', '✌️', '👉', '👀', '🐶', '🐷', '😹', '⚡️', '🔥', '🌈', '🍏', '⚽️', '❤️', '🇨🇳'],
    }
  },
  created: function () {
    if (localStorage.getItem('avatar')) {
      this.avatar = localStorage.getItem('avatar')
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
          margin 10px
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
