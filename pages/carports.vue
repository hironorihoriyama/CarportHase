<template>
  <div>
    <p>{{ $store.getters.user.uid }}　様</p>
    <p>駐車場一覧</p>
    <p>配列の中身：{{ myCarports }}</p>
    <ul v-if="myCarports.length">
      <li v-for="carport in myCarports" :key="carport.id">
        <nuxt-link to="/carport">
          駐車場ID：{{ carport.id }}<br>
          駐車場：{{ carport.name }}
        </nuxt-link>
      </li>
    </ul>
    <ul v-else>
      <li>駐車場はありません</li>
    </ul>
    <form v-on:submit.prevent="carportAdd">
      <input v-model="carportInfo.name">
      <button>駐車場追加</button>
    </form>
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
      carportInfo: {
        name: '',
        address: '',
        tel: '',
        lng: 0,
        lat: 0
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
    carportAdd: function() {
      this.$store.dispatch('carports/carportAdd', this.carportInfo)
      this.carportInfo.name = ''
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