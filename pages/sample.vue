<template>
    <div>
        <p class="text-center">{{ $store.getters.user.uid }}　様</p>
        <p class="text-center">サンプルページ</p>
        <p>配列の中身：{{ users }}</p>
        <ul>
            <li v-for="user in users" :key="user.id">
              {{ user.name }}
            </li>
        </ul>
        <div class="form">
            <form v-on:submit.prevent="addUser">
                <input v-model="name">
                <button>オーナー登録</button>
            </form>
        </div>
        <!-- <div class="form">
            <form v-on:submit.prevent="add">
                <input v-model="carports.address">
                <input v-model="carports.capacity">
                <input v-model="carports.gmap_url">
                <input v-model="carports.lat">
                <input v-model="carports.lng">
                <input v-model="carports.name">
                <input v-model="carports.price">
                <input v-model="carports.status">
                <input v-model="carports.tel">
                <button>Add</button>
            </form>
        </div> -->
        <div class="pa-5">
          <v-btn
            block
            color="indigo darken-1"
            nuxt
            to="/"
            class="white--text"
          >
            トップページへ
          </v-btn>
        </div>
        <div class="pa-5">
          <v-btn
            block
            outlined
            color="grey darken-3"
            @click="signOut"
          >
            ログアウト
          </v-btn>
        </div>
    </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  data: function() {
    return {
      name: '',
      carports: {
        address: '',
        capacity: '',
        gmap_url: '',
        lat: 0,
        lng: 0,
        name: '',
        price: '',
        status: '',
        tel: '',
        uid: this.$store.getters.user.uid
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
    addUser: function() {
      this.$store.dispatch('users/addUser', this.name)
      this.name = ''
    },
    add() {
      this.$store.dispatch('users/add', this.carports)
    }
  },
  created: function() {
    this.$store.dispatch('users/loginedInit')
  },
  computed: {
    users() {
      return this.$store.getters['users/loginedUsers']
    }
  }
}
</script>