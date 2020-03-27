<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row
            v-if="item.heading"
            :key="item.heading"
            align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              cols="6"
              class="text-center"
            >
              <a
                href="#!"
                class="body-2 black--text"
              >EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""   
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              :to="child.link"
              link
           
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.text"
            :to="item.link"
            link
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">ระบบจัดการทรัพย์สิน</span>
    
      </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
          <SearchBar/>
        
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn> 
     

      <MenuProfile/>
      


    </v-app-bar>
    
    <v-content>

       <Navigator/>
 
      <router-view />
          
  
    </v-content>
   
  </v-app>
</template>

<script>
  import MenuProfile from '../components/Menus/LogoutMenu'
  import Navigator from '../components/Breadcrumbs/Navigator'
  import SearchBar from '../components/Forms/SearchBar'
 
  export default {
    components:{
      MenuProfile,Navigator,SearchBar

    },
    name : 'MainLayout',
    props: {
      source: String,
    },
    data: () => ({
      dialog: false,
      drawer: null,
       items: [
        { icon: 'mdi-contacts', text: 'หน้าหลัก', link:'/dashboard/'},
        {
          icon: 'mdi-chevron-up',
          'icon-alt': 'mdi-cogs',
          text: 'ตั้งค่า',
          model: false,
          children: [
          { text: "บริษัท", link: "/settings/company" },
          { text: "สาขา", link: "/settings/branch" },
          { text: "แผนก", link: "/settings/department" },
          { text: "กลุ่มครุภัณฑ์", link: "/settings/articles" },
          { text: "อาคาร", link: "/settings/building" },
          { text: "ชั้น", link: "/settings/floor" },
          { text: "ห้อง", link: "/settings/room" },
          { text: "สถานที่", link: "/settings/venue" },
          { text: "ยี่ห้อ", link: "/settings/brand" },
          { text: "โมเดลรุ่น/แบบ/สี", link: "/settings/model" },
          { text: "ผู้จัดจำหน่าย", link: "/settings/dealer" },
          { text: "สถานะ", link: "/settings/status" }
           
          ],
        },

        { icon: 'mdi-account-cog', text: 'ตั้งค่าผู้ใช้งาน' ,link:'/users/permission' },
        { icon: 'mdi-database-import', text: 'นำเข้าทรัพท์สิน' ,link:'/import/assets' },
        { icon: 'mdi-text-box-search-outline', text: 'ออกรายงาน' ,link:'/import/assets' },
      ],
    }),
  }
</script>