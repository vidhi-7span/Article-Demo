<template>
  <div
    class="justify-between shadow-2xl h-20 sticky top-0 w-full bg-gray-200 mb-10 flex items-center px-5"
  >
    <input
      v-model="textData"
      type="text"
      placeholder="Enter Text"
      class="border rounded-lg active:border-black py-2 px-3"
    />
    <VueDatePicker
      v-model="date"
      :enable-time-picker="false"
      range
      class="max-w-72"
    />
    <button @click="submit" class="border rounded-lg border-black py-2 px-3">
      Load Articles
    </button>
  </div>
</template>
<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import { ref, onMounted } from "vue";
const emit = defineEmits(["load"]);
const textData = ref("bitcoin");
const date = ref();

function submit() {
  emit("load", textData, date);
  console.log("Button Clicked");
}

onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
});
</script>
