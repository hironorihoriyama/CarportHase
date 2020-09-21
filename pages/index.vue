<template>
  <div>
    <p>TOPページ</p>
    <ul>
        <li v-for="carport in carports" :key="carport.id">
          {{ carport.name }}
        </li>
    </ul>
    <div>
      <nuxt-link to="/carports">ログイン</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {}
  },
  created: function() {
    this.$store.dispatch('carports/carportsInit')
  },
  computed: {
    carports() {
      return this.$store.getters['carports/carports']
    }
  }
}
</script>