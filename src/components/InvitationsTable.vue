<template>
  <div>
    <span>Número de convidados: {{ totalInvited }}</span
    ><br />
    <span>Número de confirmados: {{ totalConfirmed }}</span
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

      <template v-slot:[`item.invitationMessage`]="{ item }">
        <v-icon small class="mr-2" @click="generateInvitationMessage(item)">
          mdi-clipboard-outline
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
        { text: "Mensagem para convite", value: "invitationMessage" },
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
      this.totalConfirmed = response.data.totalConfirmed;
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
        return "-";
      } else {
        return new Date(presenceConfirmedOn._seconds * 1000).toDateString();
      }
    },

    getInvitedList(family) {
      this.invitedList = [];

      family.forEach((element) => {
        this.invitedList.push({
          name: element.name,
          presenceConfirmed: element.presenceConfirmed ? "Sim" : "Não",
        });
      });
    },

    generateInvitationMessage(item) {
      let familyCopy = "você";
      if (item.family.length > 1) {
        for (let i = 1; i < item.family.length; i++) {
          if (i === item.family.length - 1) {
            familyCopy += " e " + item.family[i].name;
          } else {
            familyCopy += ", " + item.family[i].name;
          }
        }
      }

      let message = "Olá " + item.family[0].name + "!\n";
      message +=
        "É com imensa alegria que estamos aqui para convidar " +
        familyCopy +
        " para o momento mais especial de nossas vidas: a celebração do nosso matrimônio.";
      message +=
        "Acontecerá dia *5 de Junho de 2021*, às 18hr 30min na Igreja de São José Operário no Ipase, e logo após, recepcionaremos na Casa Vanni Eventos.\n";
      message +=
        "O código do seu convite é *" +
        item.invitationCode +
        "*, pedimos que confirme em nosso site até 30 de Abril.\n";
      message +=
        "Aguardamos a sua presença para celebrar conosco o primeiro dia de nossas vidas!";

      this.$copyText(message);
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