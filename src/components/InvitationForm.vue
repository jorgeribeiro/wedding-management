<template>
  <v-form ref="form">
    <v-card elevation="1" max-width="500" class="mx-auto">
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

      <v-card-actions>
        <v-btn @click="addNameTextField"> + nome </v-btn>
        <v-btn v-show="showRemoveButton" @click="removeNameTextField">
          - nome
        </v-btn>
        <v-btn color="primary" @click="save"> Salvar </v-btn>
      </v-card-actions>
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
      showRemoveButton: false,
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

      this.textFields.forEach(function(entry) {
        family.push(entry.value);
      });

      axios.post(process.env.VUE_APP_API_URL + "/invitation", {
        "family": family,
      }).then((response) => {
        console.log(response);
        // TODO: show proper response in the frontend
        // TODO: clear/reset form
      });
    },
  },
};
</script>
