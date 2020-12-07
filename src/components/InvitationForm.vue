<template>
  <v-form ref="form" lazy-validation :disabled="disabledState">
    <v-card
      :loading="processingState"
      elevation="1"
      max-width="500"
      class="mx-auto"
    >
      <v-card-title>
        <span class="headline">Nomes dos convidados</span>
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-for="textField in textFields"
          v-model="textField.value"
          :key="textField.id"
          :label="textField.label"
          :rules="nameRules"
          required
        ></v-text-field>
      </v-card-text>

      <v-card-actions class="pa-5">
        <v-btn @click="addNameTextField" :disabled="disabledState">
          + nome
        </v-btn>
        <v-btn
          v-show="showRemoveButton"
          @click="removeNameTextField"
          :disabled="disabledState"
        >
          - nome
        </v-btn>
        <v-btn color="primary" @click="save" :disabled="disabledState">
          Salvar
        </v-btn>
      </v-card-actions>

      <v-alert type="success" v-show="showSuccessAlert">
        Convite adicionado!
      </v-alert>
      <v-alert type="warning" v-show="showWarningAlert">
        Não é permitido adicionar um convite com nomes vazios.
      </v-alert>
      <v-alert type="error" v-show="showErrorAlert">
        Ocorreu um erro inesperado ao adicionar este convite.
      </v-alert>
    </v-card>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "InvitationForm",

  data() {
    return {
      textFields: [
        {
          id: "name1",
          label: "Nome #1",
          value: "",
        },
        {
          id: "name2",
          label: "Nome #2",
          value: "",
        },
      ],
      numberOfTextFields: 2,
      disabledState: false,
      processingState: false,
      showRemoveButton: true,
      showSuccessAlert: false,
      showWarningAlert: false,
      showErrorAlert: false,
      nameRules: [(v) => !!v || "Campo obrigatório"],
    };
  },

  methods: {
    addNameTextField() {
      ++this.numberOfTextFields;
      this.showRemoveButton = true;

      this.textFields.push({
        id: "name" + this.numberOfTextFields,
        label: "Nome #" + this.numberOfTextFields,
        value: "",
      });
    },

    removeNameTextField() {
      --this.numberOfTextFields;

      this.textFields.pop({
        id: "name" + this.numberOfTextFields,
      });

      if (this.numberOfTextFields == 1) {
        this.showRemoveButton = false;
      }
    },

    save() {
      let family = [];
      let inputValidated = true;
      this.textFields.forEach(function (entry) {
        let name = entry.value.trim();
        if (name === "") {
          inputValidated = false;
        }
        family.push(name);
      });

      if (inputValidated) {
        this.triggerProcessingState();

        axios
          .post(process.env.VUE_APP_API_URL + "/invitation", {
            family: family,
          })
          .then(() => {
            this.showSuccessAlert = true;
          })
          .catch(() => {
            this.showErrorAlert = true;
          })
          .finally(() => {
            this.disabledState = this.processingState = false;
            setTimeout(
              () => (this.showSuccessAlert = this.showErrorAlert = false),
              4000
            );
            this.$refs.form.reset();
          });
      } else {
        this.$refs.form.validate();
        this.showWarningAlert = true;
        setTimeout(() => (this.showWarningAlert = false), 4000);
      }
    },

    triggerProcessingState() {
      this.disabledState = this.processingState = true;
      this.showSuccessAlert = this.showWarningAlert = this.showErrorAlert = false;
    },
  },
};
</script>
