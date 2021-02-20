<template>
  <div>
    <span>Número total de convidados: {{ totalInvited }}</span
    ><br /><br />

    <v-data-table
      :headers="headers"
      :items="invitations"
      item-key="invitationCode"
      :loading="isLoading"
      loading-text="Carregando convites..."
      class="elevation-1"
    >
      <template v-slot:[`item.name`]="{ item }">
        {{ getFamilyName(item.family) }}
      </template>

      <template v-slot:[`item.family`]="{ item }">
        {{ getFamilySize(item.family) }}
      </template>

      <template v-slot:[`item.presenceConfirmedOn`]="{ item }">
        {{ getPresenceConfirmedOnFormatted(item.presenceConfirmedOn) }}
      </template>

      <template v-slot:[`item.presenceConfirmedMessage`]="{ item }">
        {{ item.presenceConfirmedMessage | formatNull }}
      </template>

      <template v-slot:[`item.checkInvitedList`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click.stop="dialog = true"
          @click="getInvitedList(item.family)"
        >
          mdi-eye
        </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span>Convidados</span>
        </v-card-title>

        <v-card-text>
          <v-simple-table dense>
            <thead>
              <tr>
                <th class="text-left">Nomes</th>
                <th class="text-left">Presença confirmada</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in invitedList" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.presenceConfirmed }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close"> Fechar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        { text: "Convidados", value: "checkInvitedList" },
      ],
      totalInvited: null,
      invitations: [],
      invitedList: [],
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
    getFamilyName(family) {
      return family[0].name;
    },

    getFamilySize(family) {
      return family.length;
    },

    getPresenceConfirmedOnFormatted(presenceConfirmedOn) {
      if (presenceConfirmedOn === null) {
        return '-';
      } else {
        return new Date(presenceConfirmedOn._seconds * 1000).toDateString();
      }
    },

    getInvitedList(family) {
      this.invitedList = [];

      family.forEach((element) => {
        this.invitedList.push({
          name: element.name,
          presenceConfirmed: element.presenceConfirmed ? 'Sim' : 'Não',
        });
      });
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