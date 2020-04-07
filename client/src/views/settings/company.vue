<template >

<div>
  <v-container>
    <v-col>
      <v-data-table
        :headers="headers"
        :items="rawdata"
        :search="search"
         :loading="loading"
         loading-text="Loading... Please wait"
        sort-by="company_code"
        class="elevation-1"
        
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>บริษัท</v-toolbar-title>
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
                        <v-text-field v-model="editedItem.company_code" label="รหัสบริษัท"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.company_name" label="ชื่อบริษัท"></v-text-field>
                      </v-col>
                   
       
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:item.actives ="{ item }" >
          
             <v-switch  v-model="item.company_status" 
             
             ></v-switch>
        
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
  
  <v-btn
      bottom
      color="pink"
      dark
      fab
      fixed
      right
      @click="dialog = !dialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({

    loading : true,
    search: "",
    dialog: false,
    headers: [
      {
        text: "รหัส",
        align: "start",
        value: "company_code"
      },
      { text: "ชื่อบริษัท", value: "company_name" },
      { text: "ถูกสร้างขึ้นวันที่", value: "company_createon" },
      { text: 'การกระทำ', value: 'actions', sortable: false },
       { text: 'ใช้งาน', value: 'actives', sortable: false },
    ],
    rawdata: [],
    editedIndex: -1,
    editedItem: {
      company_code: "",
      company_name: "",
      company_status: "",
      company_createon: ""
    },
    defaultItem: {
      company_code: null,
      company_name: null,
      company_status: null,
      company_createon: null
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "สร้างบริษัทใหม่" : "แก้ไขบริษัท";
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
          company_code: "0001",
          company_name: "Dell Inc.",
          company_status: true,
          company_createon: 24
        },
        {
          company_code: "0002",
          company_name: "Asus Inc.",
          company_status: true,
          company_createon: 24
        },
        {
          company_code: "0003",
          company_name: "Hewlett Packard Inc.",
          company_status: false,
          company_createon: 25
        },
        {
          company_code: "0004",
          company_name: "Acer Inc.",
          company_status: false,
          company_createon: 25
        }
      ];

      this.loading = false
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
        this.editedItem.company_createon = new Date().getUTCSeconds();
        this.editedItem.company_status = 1;
        this.rawdata.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
