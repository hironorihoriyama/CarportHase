<template>
  <div>
    <CarportDetail
      v-bind:myCarport="myCarport"
    >
    </CarportDetail>
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
    import CarportDetail from '~/components/CarportDetail.vue'

    export default {
      middleware: 'authenticated',
      components: { CarportDetail },
      created: function() {
          this.$store.dispatch('carports/myCarportInit', this.$route.params.id)
      },
      methods: {
        signOut(err) {
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
        }
      },
      computed: {
          myCarport() {
            return this.$store.getters['carports/myCarport']
          },
      }
    }
</script>