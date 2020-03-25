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
          sort-by="brand_code"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar>
              <v-toolbar-title>ยี่ห้อ</v-toolbar-title>
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
                            v-model="editedItem.brand_code"
                            label="รหัสยี่ห้อ"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.brand_name"
                            label="ชื่อยี่ห้อ"
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
            <v-switch v-model="item.brand_status"></v-switch>
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
        value: "brand_code"
      },
      { text: "ชื่อยี่ห้อ", value: "brand_name" },
      { text: "ถูกสร้างขึ้นวันที่", value: "brand_createon" },
      { text: "การกระทำ", value: "actions", sortable: false },
      { text: "ใช้งาน", value: "actives", sortable: false }
    ],
    rawdata: [],
    editedIndex: -1,
    editedItem: {
      brand_code: "",
      brand_name: "",
      brand_status: "",
      brand_createon: ""
    },
    defaultItem: {
      brand_code: null,
      brand_name: null,
      brand_status: null,
      brand_createon: null
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "สร้างยี่ห้อใหม่" : "แก้ไขยี่ห้อ";
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
          brand_code: "0001",
          brand_name: "ยี่ห้อ 1",
          brand_status: true,
          brand_createon: 25
        },
        {
          brand_code: "0002",
          brand_name: "ยี่ห้อ 2",
          brand_status: true,
          brand_createon: 25
        },
        {
          brand_code: "0003",
          brand_name: "ยี่ห้อ 3",
          brand_status: false,
          brand_createon: 25
        },
        {
          brand_code: "0004",
          brand_name: "ยี่ห้อ 4",
          brand_status: false,
          brand_createon: 25
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
        this.editedItem.brand_createon = new Date().getUTCSeconds();
        this.editedItem.brand_status = 1;
        this.rawdata.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
