<template>
    <div v-if="myCarport">
        <p>{{ $store.getters.user.uid }}　様</p>
        <p>駐車場</p>
        <p>配列の中身：{{ myCarport }}</p>
        <form @submit.prevent="carportEdit(myCarport)">
        <tr>
            <th>駐車場名</th>
            <td><input v-model="myCarport.name"></td>
        </tr>
        <tr>
            <th>住所</th>
            <td><input v-model="myCarport.address"></td>
        </tr>
        <tr>
            <th>TEL</th>
            <td><input v-model="myCarport.tel"></td>
        </tr>
        <tr>
            <th>経度</th>
            <td><input v-model="myCarport.lat"></td>
        </tr>
        <tr>
            <th>緯度</th>
            <td><input v-model="myCarport.lng"></td>
        </tr>
        <button>保存</button>
        </form>
        <button v-on:click="carportRemove(myCarport)">削除</button>
    </div>
</template>

<script>
export default {
    props: {
        myCarport: Object
    },
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
        carportEdit(myCarport) {
          this.$store.dispatch('carports/carportEdit', myCarport)
        },
        carportRemove(myCarport) {
          if(confirm(myCarport.name + this.messages.removeConfirm)) {
            this.$store.dispatch('carports/carportRemove', myCarport.id)
            alert(this.messages.removeMsg)
          } else {
            alert(myCarport.name + this.messages.removeCancel)
          }
        }
    }
    
}
</script>