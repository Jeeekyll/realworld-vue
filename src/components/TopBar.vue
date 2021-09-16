<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link :to="{name: 'home'}" class="navbar-brand">
        Test vue
      </router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
              class="nav-link"
              :to="{name: 'home'}"
              active-class="active"
              exact
          >
            Home
          </router-link>
        </li>
        <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'createArticle'}">
              <i class="ion-compose"></i>&nbsp;
              New Article
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'settings'}">
              <i class="ion-gear-a"></i>&nbsp;
              Settings
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'profile', params: {slug: user.username}}">
              <img class="user-pic" alt="img" :src="user.image"/>
              {{ user.username }}
            </router-link>
          </li>
        </template>

        <template v-if="isAnonymous">
          <li class="nav-item">
            <router-link
                class="nav-link"
                :to="{name: 'login'}"
                active-class="active"
            >
              Login
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
                class="nav-link"
                :to="{name: 'register'}"
                active-class="active"
            >
              Register
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'TopBar',
  computed: {
    ...mapGetters([
      'user',
      'isLoggedIn',
      'isAnonymous',
    ]),
  }
}

</script>