<template>
  <v-data-table
    :headers="headers"
    :items="invitations"
    item-key="invitationCode"
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
      <v-icon small class="mr-2">
        mdi-eye
      </v-icon>
    </template>
  </v-data-table>
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
      invitations: [],
      expanded: [],
      showModal: false,
    };
  },

  created() {
    axios.get(process.env.VUE_APP_API_URL + "/invitations").then((response) => {
      this.invitations = response.data;
    });
  },

  methods: {
    getFamilySize(family) {
      return family.length;
    },

    getFamilyName(family) {
      return family[0].name;
    },
  },

  filters: {
    formatNull: function (value) {
      if (!value) return '-';
      return value;
    }
  }
};
</script>