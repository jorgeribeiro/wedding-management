<template>
  <v-app>
    <v-navigation-drawer app>
      <v-sheet color="#00BFA5" dark class="pa-4">
        <div>⛪ Jorge & Sammyra</div>
      </v-sheet>

      <v-divider></v-divider>
      <v-list dense rounded>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.route"
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

    <v-main>
      <v-container class="py-8 px-6" fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      items: [
        {
          title: "Listar convites",
          icon: "mdi-format-list-bulleted-square",
          route: "/",
        },
        {
          title: "Adicionar convites",
          icon: "mdi-account-multiple-plus",
          route: "/add-invitations",
        },
      ],
    };
  },
};
</script>