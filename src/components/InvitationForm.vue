<template>
  <v-form ref="form">
    <v-card elevation="1" max-width="500" class="mx-auto">
      <v-card-title>
        <span class="headline">Nomes dos convidados</span>
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-for="textField in textFields"
          :key="textField.id"
          :label="textField.label"
          :v-model="textField.id"
          :rules="nameRules"
          required
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="addNameTextField"> + nome </v-btn>
        <v-btn v-show="showRemoveButton" @click="removeNameTextField">
          - nome
        </v-btn>
        <v-btn color="primary"> Salvar </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: "InvitationForm",

  data() {
    return {
      textFields: [
        {
          id: "name1",
          label: "Nome #1",
        },
      ],
      numberOfTextFields: 1,
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
      });
    },

    removeNameTextField() {
      --this.numberOfTextFields;

      this.textFields.pop({
        id: "name" + this.numberOfTextFields,
        label: "Nome #" + this.numberOfTextFields,
      });

      if (this.numberOfTextFields == 1) {
        this.showRemoveButton = false;
      }
    },
  },
};
</script>
