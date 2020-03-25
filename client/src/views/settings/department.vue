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
          sort-by="department_code"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>แผนก</v-toolbar-title>
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
                            v-model="editedItem.department_code"
                            label="รหัสแผนก"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.department_name"
                            label="ชื่อแผนก"
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
            <v-switch v-model="item.department_status"></v-switch>
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
        value: "department_code"
      },
      { text: "ชื่อแผนก", value: "department_name" },
      { text: "ถูกสร้างขึ้นวันที่", value: "department_createon" },
      { text: "การกระทำ", value: "actions", sortable: false },
      { text: "ใช้งาน", value: "actives", sortable: false }
    ],
    rawdata: [],
    editedIndex: -1,
    editedItem: {
      department_code: "",
      department_name: "",
      department_status: "",
      department_createon: ""
    },
    defaultItem: {
      department_code: null,
      department_name: null,
      department_status: null,
      department_createon: null
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "สร้างแผนกใหม่" : "แก้ไขแผนก";
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
          department_code: "0001",
          department_name: "จัดซื้อ",
          department_status: true,
          department_createon: 25
        },
        {
          department_code: "0002",
          department_name: "ประชาสัมพันธ์",
          department_status: true,
          department_createon: 25
        },
        {
          department_code: "0003",
          department_name: "บริหาร",
          department_status: false,
          department_createon: 25
        },
        {
          department_code: "0004",
          department_name: "ซ่อมบำรุง",
          department_status: false,
          department_createon: 25
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
        this.editedItem.department_createon = new Date().getUTCSeconds();
        this.editedItem.department_status = 1;
        this.rawdata.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
