<template>
  <v-container>
    <v-row wrap justify="center" align="center">
      <v-col :sm="12" :md="8">
        <p class="text-center">TOPページ</p>
        <ul>
            <li v-for="user in users" :key="user.id">
              {{ user.name }}
            </li>
        </ul>
        <div class="pa-5">
          <v-btn
            block
            color="indigo darken-1"
            nuxt
            to="/sample"
            class="white--text"
          >
            サンプルページへ
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: function() {
    return {
      address: '',
      capacity: '',
      gmap_url: '',
      lat: 0,
      lng: 0,
      name: '',
      price: '',
      status: '',
      tel: ''
    }
  },
  created: function() {
    this.$store.dispatch('users/init')
  },
  methods: {
    add() {
      this.$store.dispatch('users/add', this.name)
    }
  },
  computed: {
    users() {
      return this.$store.getters['users/users']
    }
  }
}
</script>