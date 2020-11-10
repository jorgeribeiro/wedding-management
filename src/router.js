import Vue from 'vue';
import Router from 'vue-router';
import InvitationsTable from './components/InvitationsTable';
import InvitationForm from './components/InvitationForm';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'invitations',
      component: InvitationsTable,
    },
    {
      path: '/add-invitations',
      name: 'add-invitations',
      component: InvitationForm,
    }
  ],
});

