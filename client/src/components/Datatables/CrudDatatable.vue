<template>
<div>
  <v-data-table :headers="headers" :items="rawdata" :search="search" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
    

  <v-toolbar-title>บริษัท</v-toolbar-title>
  <v-spacer></v-spacer>
          <v-text-field class="float-right"
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
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.company_status" label="สถานะ"></v-text-field>
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
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>

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
