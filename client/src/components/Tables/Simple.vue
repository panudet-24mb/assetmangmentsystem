<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">ชื่อผู้ใช้งาน</th>
          <th class="text-left">สถานะ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
  export default {
    data () {
      return {
        desserts: [
          {
             name: 'Panudet P.',
            calories: 'admin',
          },
          {
            name: 'test user',
            calories: 'Manager',
          },
         
        ],
      }
    },
  }
</script>