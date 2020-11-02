<template>
  <v-data-table
    :headers="headers"
    :items="invitations"
    :expanded.sync="expanded"
    item-key="invitationCode"
    show-expand
    class="elevation-1"
  >
    <template v-slot:[`item.family`]="{ item }">
      {{ getFamilySize(item.family) }}
    </template>

    <template v-slot:[`expanded-item`]="{ headers, item }">
      <td></td>
      <td :colspan="headers.length">
        {{ getFamily(item.family) }}
      </td>
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
          text: "Codigo",
          value: "invitationCode",
        },
        {
          text: "Numero de convidados",
          value: "family",
        },
        {
          text: "Data confirmacao",
          value: "presenceConfirmedOn",
        },
        {
          text: "Data atualizacao confirmacao",
          value: "presenceConfirmationUpdatedOn",
        },
        {
          text: "Mensagem",
          value: "presenceConfirmedMessage",
        },
      ],
      invitations: [],
      expanded: [],
    };
  },

  created() {
    axios.get("http://localhost:5000/api/v1/invitations").then((response) => {
      this.invitations = response.data;
    });
  },

  methods: {
    getFamilySize(family) {
      return family.length;
    },

    getFamily(family) {
      let formattedFamily = "";

      family.forEach((element) => {
        formattedFamily += element.name + " " + element.presenceConfirmed + " / ";
      });

      return formattedFamily;
    },
  },
};
</script>