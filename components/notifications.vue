<template>
  <div class="fixed pin-l pin-b z-50 px-4 flex flex-col items-start">
    <nf-notification
      v-for="(notification, index) in notifications"
      :key="index"
      :notification="notification"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
    NfNotification: () => import('~/components/notification')
  },
  computed: {
    ...mapGetters(['notifications'])
  }
}
</script>
