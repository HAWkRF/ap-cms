<template>
  <section>
    <b-navbar toggleable="sm">
      <b-navbar-toggle target="top-menu"></b-navbar-toggle>

      <b-collapse is-nav id="top-menu">
        <b-navbar-nav class="ml-auto">
          <b-dropdown squared variant="link" class="my-nav" right no-caret>
            <template v-slot:button-content>
              <span class="micon micon__settings"></span>
            </template>

            <b-dropdown-item @click="openUpdateModal('users.permissions')"
              >Права доступа</b-dropdown-item
            >
            <b-dropdown-item @click="openUpdateModal('places')"
              >Места проведения занятий</b-dropdown-item
            >
          </b-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-modal
      lazy
      ok-only
      v-model="formModal.show"
      modal-class="modal-right"
      size="lg"
      :title="formModal.title"
      :okTitle="$t('main.cancel')"
      @ok="handleClose"
      okVariant="secondary"
    >
      <permissions-form
        v-if="formModal.destination == 'users.permissions'"
        ref="permissionsForm"
        @updated="updated"
      >
      </permissions-form>

      <places
        v-if="formModal.destination == 'places'"
        ref="placesForm"
        @updated="updated"
      >
      </places>
    </b-modal>
  </section>
</template>

<script>
import { AUTH_LOGOUT } from "@/store/modules/auth/actions";
import { mapGetters } from "vuex";
import PermissionsForm from "@/components/users/PermissionsForm";
import Places from "@/components/places/Places";

export default {
  name: "simple-header",
  components: {
    PermissionsForm,
    Places,
  },
  data() {
    return {
      formModal: {
        id: null,
        show: false,
        destination: null,
      },
    };
  },
  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        this.$router.push("/login");
      });
    },
    openUpdateModal(destination) {
      this.formModal.show = true;
      this.formModal.destination = destination;
      this.formModal.title = this.$t(`${destination}.title`);
    },
    handleClose(event) {
      event.preventDefault();
      this.formModal.show = false;
    },
    resetForm() {
      this.formModal.id = null;
    },
    updated() {
      this.$_notification_notify(this.$t("main.notifications.updated"));
      // this.saved();
    },
  },
  computed: {
    ...mapGetters({ profile: "getProfile" }),
  },
};
</script>

<style lang="scss">
.my-nav {
  .btn {
    padding: 0 !important;
  }
}
</style>