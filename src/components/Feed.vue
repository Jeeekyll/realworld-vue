<template>
  <div>
    <div v-if="isLoading">
      Loading...
    </div>
    <div v-if="feed">
      <div
          class="article-preview"
          v-for="(article, index) in feed.articles"
          :key="index"
      >
        <div class="article-meta">
          <router-link
              :to="{name: 'profile', params: {slug: article.author.username} }"
          >
            <img :src="article.author.image" alt="">
          </router-link>
          <div class="info">
            <router-link
                class="author"
                :to="{name: 'profile', params: {slug: article.author.username} }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">
            like
          </div>
        </div>
        <router-link
            class="preview-link"
            :to="{name: 'article', params: {slug: article.slug}}">
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          tag list
        </router-link>
      </div>

      <pagination
          :total="feed.articlesCount"
          :limit="limit"
          :current-page="currentPage"
          :url="baseURL"
      />

    </div>
  </div>
</template>

<script>
import {actionTypes} from "../store/modules/feed";
import {mapState} from "vuex";
import Pagination from "./Pagination";
import {limit} from '../helpers/vars';
import {parseUrl, stringify} from "query-string";

export default {
  name: 'Feed',
  components: {Pagination},
  props: {
    apiUrl: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      limit,
      url: 'tags/dragons'
    }
  },
  computed: {
    ...mapState({
      feed: state => state.feed.data,
      isLoading: state => state.feed.isLoading,
    }),
    currentPage() {
      return Number(this.$route.query.page || '1');
    },
    baseURL() {
      return this.$route.path;
    },
    offset() {
      return this.currentPage * limit - limit;
    },
  },
  mounted() {
    this.fetchFeed();
  },
  watch: {
    currentPage() {
      this.fetchFeed();
    }
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl);
      const stringifiedParams = stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query,
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
      this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams});
    }
  }
}
</script>