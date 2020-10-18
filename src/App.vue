<template>
  <v-app>
    <v-app-bar
      color="#00BFA5"
      dark
      flat
    >
      <v-toolbar-title>Jorge & Sammyra ⛪</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
        permanent
    >
      <v-list
        dense
        rounded
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { title: 'Listar convites', icon: 'mdi-format-list-bulleted-square' },
          { title: 'Adicionar convites', icon: 'mdi-account-multiple-plus' },
        ],
      }
    },
  }
</script>