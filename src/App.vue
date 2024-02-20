<template>
  <home />
  <ModalsContainer /><VyPort
    name="modal"
    has-overlay
    class="port--middle port--center z-[9999]"
  />
</template>
<script setup>
import { ModalsContainer } from "vue-final-modal";
import home from "./pages/home.vue";
</script>
