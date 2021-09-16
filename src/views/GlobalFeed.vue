<template>
  <div class="home-page">
    Banner
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <feed :api-url="apiUrl"/>
        </div>
        <div class="col-md-3">
          <tags/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Feed from "../components/Feed";
import Tags from "../components/Tags";

export default {
  name: 'GlobalFeed',
  components: {Tags, Feed},
  data() {
    return {
      apiUrl: '/articles',
    }
  }
}
</script>