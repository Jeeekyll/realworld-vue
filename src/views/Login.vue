<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'register'}">
              Need an account?
            </router-link>
          </p>

          <app-validation-errors v-if="errors" errors="errors"/>

          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg"
                       type="email" placeholder="Email"
                       v-model="email"
                >
              </fieldset>

              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password"
                       placeholder="Password"
                       v-model="password"
                >
              </fieldset>

              <button class="btn btn-lg btn-primary pull-xs-right" type="submit"
                      :disabled="isSubmitting"
              >
                Sign in
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {actionTypes} from "../store/modules/auth";
import AppValidationErrors from "../components/ValidationErrors";
import {mapState} from "vuex";

export default {
  name: 'AppLogin',
  components: {AppValidationErrors},
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.auth.isSubmitting,
      errors: state => state.auth.errors,
    }),
  },
  methods: {
    onSubmit() {
      this.$store.dispatch(actionTypes.login, {
        email: this.email,
        password: this.password,
      }).then(user => user && this.$router.push({name: 'home'}));
    }
  }
}
</script>