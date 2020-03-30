<template>
  <div>
    <v-container>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="rawdata"
          :search="search"
          :loading="loading"
          loading-text="Loading... Please wait"
          sort-by="user_code"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>ตั้งค่าผู้ใช้งาน</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field
                class="float-right"
                v-model="search"
                append-icon="mdi-magnify"
                label="ค้นหา"
                single-line
                hide-details
              ></v-text-field>

              <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.user_code"
                            label="รหัสผู้ใช้งาน"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.user_level"
                            label="สิทธิผู้ใช้งาน"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.user_name"
                            label="ชื่อผู้ใช้งาน"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)"
              >mdi-pencil</v-icon
            >
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
          <template v-slot:item.actives="{ item }">
            <v-switch v-model="item.user_status"></v-switch>
          </template>

          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </v-col>
      <v-spacer></v-spacer>
      <br />
      <v-col></v-col>
    </v-container>

    <v-btn bottom color="pink" dark fab fixed right @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: true,
    search: "",
    dialog: false,
    headers: [
      {
        text: "รหัส",
        align: "start",
        value: "user_code"
      },
      { text: "สิทธิผู้ใช้งาน", value: "user_level" },
      { text: "ชื่อผู้ใช้งาน", value: "user_name" },
      { text: "ถูกสร้างขึ้นวันที่", value: "user_createon" },
      { text: "การกระทำ", value: "actions", sortable: false },
      { text: "ใช้งาน", value: "actives", sortable: false }
    ],
    rawdata: [],
    editedIndex: -1,
    editedItem: {
      user_level: "",
      user_code: "",
      user_name: "",
      user_status: "",
      user_createon: ""
    },
    defaultItem: {
      user_level: null,
      user_code: null,
      user_name: null,
      user_status: null,
      user_createon: null
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "สร้างผู้ใช้งานใหม่" : "แก้ไขผู้ใช้งาน";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.rawdata = [
        {
          user_level: "Administrator",
          user_code: "0001",
          user_name: "มงคล เอี่ยมสุข",
          user_status: true,
          user_createon: 25
        },
        {
          user_level: "Administrator",
          user_code: "0002",
          user_name: "ชูเกียรติ ฟูมฟัก",
          user_status: true,
          user_createon: 25
        },
        {
          user_level: "Moderator",
          user_code: "0003",
          user_name: "ยุพิน ชื่นบาน",
          user_status: false,
          user_createon: 25
        },
        {
          user_level: "Normal",
          user_code: "0004",
          user_name: "รัยนะ ครับผม",
          user_status: false,
          user_createon: 25
        }
      ];

      this.loading = false;
    },

    editItem(item) {
      this.editedIndex = this.rawdata.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.rawdata.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.rawdata.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.rawdata[this.editedIndex], this.editedItem);
      } else {
        this.editedItem.user_createon = new Date().getUTCSeconds();
        this.editedItem.user_status = 1;
        this.rawdata.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
