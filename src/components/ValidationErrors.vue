<template>
  <div>
    <ul class="error-messages">
      <li
          v-for="message in errorMessage"
          :key="message"
      >
        {{ message }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppValidationErrors',
  props: {
    errors: {
      type: Object,
      required: true
    }
  },
  computed: {
    errorMessage() {
      return Object.keys(this.errors).map(error => {
        const messages = this.errors[error].join(', ')
        return `${name} ${messages}`
      });
    }
  }
}
</script>