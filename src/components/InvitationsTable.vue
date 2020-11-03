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

    <template v-slot:[`item.checkFamily`]>
      <v-icon small class="mr-2" @click.stop="showModal = true">
        mdi-eye
      </v-icon>
    </template>

    <FamilyModal v-model="showModal" />
  </v-data-table>
</template>

<script>
import axios from "axios";

import FamilyModal from "./FamilyModal";

export default {
  name: "InvitationsTable",
  components: {
    FamilyModal,
  },

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
    axios.get("http://localhost:5000/api/v1/invitations").then((response) => {
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
};
</script>