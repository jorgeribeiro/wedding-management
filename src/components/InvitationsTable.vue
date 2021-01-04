<template>
  <div>
    <span>Número total de convidados: {{ totalInvited }}</span><br><br>

    <v-data-table
      :headers="headers"
      :items="invitations"
      item-key="invitationCode"
      :loading="isLoading"
      loading-text="Carregando convites..."
      class="elevation-1"
    >
      <template v-slot:[`item.family`]="{ item }">
        {{ getFamilySize(item.family) }}
      </template>

      <template v-slot:[`item.name`]="{ item }">
        {{ getFamilyName(item.family) }}
      </template>

      <template v-slot:[`item.presenceConfirmedOn`]="{ item }">
        {{ item.presenceConfirmedOn | formatNull }}
      </template>

      <template v-slot:[`item.presenceConfirmedMessage`]="{ item }">
        {{ item.presenceConfirmedMessage | formatNull }}
      </template>

      <template v-slot:[`item.checkFamily`]>
        <v-icon small class="mr-2" @click="viewFamily"> mdi-eye </v-icon>
      </template>

      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Convidados</span>
          </v-card-title>

          <v-card-text>
            <v-container> </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Fechar </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "InvitationsTable",

  data() {
    return {
      headers: [
        {
          text: "Código",
          value: "invitationCode",
        },
        {
          text: "Nome",
          value: "name",
        },
        {
          text: "Número de convidados",
          value: "family",
        },
        {
          text: "Data confirmação",
          value: "presenceConfirmedOn",
        },
        {
          text: "Mensagem",
          value: "presenceConfirmedMessage",
        },
        { text: "Convidados", value: "checkFamily" },
      ],
      totalInvited: null,
      invitations: [],
      dialog: false,
      isLoading: true,
    };
  },

  created() {
    axios.get(process.env.VUE_APP_API_URL + "/invitations").then((response) => {
      this.totalInvited = response.data.totalInvited;
      this.invitations = response.data.invitations;
      this.isLoading = false;
    });
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  methods: {
    getFamilySize(family) {
      return family.length;
    },

    getFamilyName(family) {
      return family[0].name;
    },

    viewFamily() {
      this.dialog = true;
    },

    close() {
      this.dialog = false;
    },
  },

  filters: {
    formatNull: function (value) {
      if (!value) return "-";
      return value;
    },
  },
};
</script>