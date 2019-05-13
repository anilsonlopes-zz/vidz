<template>
  <div class="fixed pin-r pin-b z-50 px-4 flex flex-col items-end">
    <nf-notification
      v-for="(notification, index) in notifications"
      :key="index"
      :notification="notification"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NfNotification from '~/components/NfNotification'

export default {
  components: { NfNotification },
  computed: {
    ...mapGetters(['notifications'])
  }
}
</script>
