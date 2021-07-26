<template>
  <footer class="footer" :class="{ simple: isSimple }">
    <div class="container-ap">
      <div class="row-ap">
        <div class="col-sm-12 col-md-6 footer-custom">
          <ul class="">
            <li>
              <router-link to="/services">Услуги</router-link>
            </li>
            <li>
              <router-link to="/agreement">Договор-оферта</router-link>
            </li>
            <li>
              <router-link to="/policy"
                >Пользовательское соглашение</router-link
              >
            </li>
          </ul>
        </div>

        <div class="col-sm-12 col-md-6 footer-contacts">
          <ul>
            <li>
              <a class="footer-phone" href="tel:+79229928800"
                >+7 922 992 8800</a
              >
            </li>
            <li>
              <a class="footer-email" href="mailto:client@akratoprime.ru"
                >client@akratoprime.ru</a
              >
            </li>

            <li>
              &copy; Web-сервис AkratoPRIME.
              <a href="https://www.akrato.com/" target="_blank">ООО «АКРАТО»</a
              >, {{ year }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "footer-simple",
  props: {
    isSimple: {
      default: true,
    },
  },
  components: {},
  data() {
    return {
      year: "",
    };
  },
  methods: {},
  created() {
    let d = new Date();
    this.year = d.getFullYear();
  },
};
</script>