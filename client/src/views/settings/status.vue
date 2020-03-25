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
          sort-by="status_code"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>สถานะ</v-toolbar-title>
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
                            v-model="editedItem.status_code"
                            label="รหัสสถานะ"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.status_name"
                            label="ชื่อสถานะ"
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
            <v-switch v-model="item.status_status"></v-switch>
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
        value: "status_code"
      },
      { text: "ชื่อสถานะ", value: "status_name" },
      { text: "ถูกสร้างขึ้นวันที่", value: "status_createon" },
      { text: "การกระทำ", value: "actions", sortable: false },
      { text: "ใช้งาน", value: "actives", sortable: false }
    ],
    rawdata: [],
    editedIndex: -1,
    editedItem: {
      status_code: "",
      status_name: "",
      status_status: "",
      status_createon: ""
    },
    defaultItem: {
      status_code: null,
      status_name: null,
      status_status: null,
      status_createon: null
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "สร้างสถานะใหม่" : "แก้ไขสถานะ";
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
          status_code: "0001",
          status_name: "สถานะ 1",
          status_status: true,
          status_createon: 25
        },
        {
          status_code: "0002",
          status_name: "สถานะ 2",
          status_status: true,
          status_createon: 25
        },
        {
          status_code: "0003",
          status_name: "สถานะ 3",
          status_status: false,
          status_createon: 25
        },
        {
          status_code: "0004",
          status_name: "สถานะ 4",
          status_status: false,
          status_createon: 25
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
        this.editedItem.status_createon = new Date().getUTCSeconds();
        this.editedItem.status_status = 1;
        this.rawdata.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
