<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'login'}">
              Have an account?
            </router-link>
          </p>

          <validation-errors
              v-if="errors"
              :errors="errors"
          />

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Username"
                  v-model="username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="password"
              />
            </fieldset>
            <button
                :disabled="isSubmitting"
                class="btn btn-lg btn-primary pull-xs-right">
              Sign Up
            </button>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ValidationErrors from "../components/ValidationErrors";
import {actionTypes} from "../store/modules/auth";
import {mapState} from "vuex";

export default {
  name: 'AppRegister',
  components: {ValidationErrors},
  data() {
    return {
      email: '',
      password: '',
      username: '',
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
      this.$store.dispatch(actionTypes.register, {
        email: this.email,
        username: this.username,
        password: this.password,
      }).then(user => user && this.$router.push({name: 'home'}));
    },
  }
}
</script>
