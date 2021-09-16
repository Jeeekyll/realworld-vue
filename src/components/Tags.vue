<template>
  <div class="sidebar">
    <p>Popular Tags</p>
    <div v-if="isLoading">
      Loading tags...
    </div>

    <div class="tag-list">
      <router-link
          v-for="tag in tags"
          :key="tag"
          :to="{name: 'tag', params: {slug: tag}}"
          class="tag-default tag-pill"
      >
        {{ tag }}
      </router-link>
    </div>
  </div>
</template>

<script>
import {actionTypes} from "../store/modules/tags";
import {mapState} from "vuex";

export default {
  name: 'Tags',
  computed: {
    ...mapState({
      tags: state => state.tags.data,
      isLoading: state => state.tags.isLoading,
    }),
  },
  mounted() {
    this.$store.dispatch(actionTypes.getTags);
  }
}
</script>