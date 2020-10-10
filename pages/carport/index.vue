<template>
  <div>
    <p>{{ $store.getters.user.uid }}　様</p>
    <p>駐車場</p>
    <p>配列の中身：{{ myCarports }}</p>
    <ul v-if="myCarports.length">
      <li v-for="carport in myCarports" :key="carport.id">
        <form @submit.prevent="carportEdit(carport)">
          <tr>
            <th>駐車場名</th>
            <td><input v-model="carport.name"></td>
          </tr>
          <tr>
            <th>住所</th>
            <td><input v-model="carport.address"></td>
          </tr>
          <tr>
            <th>TEL</th>
            <td><input v-model="carport.tel"></td>
          </tr>
          <tr>
            <th>経度</th>
            <td><input v-model="carport.lat"></td>
          </tr>
          <tr>
            <th>緯度</th>
            <td><input v-model="carport.lng"></td>
          </tr>
          <button>保存</button>
        </form>
        <button v-on:click="carportRemove(carport)">削除</button>
      </li>
    </ul>
    <ul v-else>
      <li>駐車場はありません</li>
    </ul>
    <div>
      <nuxt-link to="/carports">駐車場一覧へ</nuxt-link>
    </div>
    <div>
      <nuxt-link to="/">トップページへ</nuxt-link>
    </div>
    <div>
      <button @click="signOut">ログアウト</button>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  data: function() {
    return {
      messages: {
        removeConfirm: 'を本当に削除してもいいですか？',
        removeMsg: '削除完了しました',
        removeCancel: 'を削除しませんでした'
      }
    }
  },
  methods: {
    signOut: function(err) {
      this.$store
        .dispatch('signOut')
        .then(() => {
          this.$router.push({
            name: 'index'
          })
        })
        .catch((err) => {
          alert(err.message)
        })
    },
    carportEdit: function(carport) {
      this.$store.dispatch('carports/carportEdit', carport)
    },
    carportRemove: function(carport) {
      if(confirm(carport.name + this.messages.removeConfirm)) {
        this.$store.dispatch('carports/carportRemove', carport.id)
        alert(this.messages.removeMsg)
      } else {
        alert(carport.name + this.messages.removeCancel)
      }
    }
  },
  created: function() {
    this.$store.dispatch('carports/myCarportsInit')
  },
  computed: {
    myCarports() {
      return this.$store.getters['carports/myCarports']
    }
  }
}
</script>