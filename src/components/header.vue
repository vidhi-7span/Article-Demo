<template>
  <div class="shadow-md sticky top-0 bg-white mb-10 px-5 py-3">
    <h1 class="text-center py-2 font-bold text-2xl underline">My Articles</h1>

    <form @submit="submit" class="w-full justify-between flex items-center">
      <div class="flex gap-2">
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
      </div>
      <div class="text-center text-lg py-2 gap-3">
        {{ result }} Articles Found
        <button type="submit" class="border rounded-lg border-black py-2 px-3">
          Load Articles
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import { ref, onMounted } from "vue";
const totalResults = ref(0);
const emit = defineEmits(["load"]);
const textData = ref("bitcoin");
const date = ref();
const props = defineProps({ result: Number });

function submit() {
  emit("load", textData, date);
}

onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
});
</script>
