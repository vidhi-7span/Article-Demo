<template>
  <div class="shadow-md sticky top-0 bg-white mb-10 px-5 py-3">
    <h1 class="text-center py-2 font-bold text-2xl underline">My Articles</h1>

    <div class="w-full justify-between flex items-center">
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

        <select v-model="selected" class="border rounded-md px-1">
          <option value="en">English</option>
          <option value="ar">Arabic</option>
          <option value="de">German</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="he">Hebrew</option>
          <option value="it">Italian</option>
          <option value="nl">Dutch</option>
          <option value="no">Norwegian</option>
          <option value="pt">Portuguese</option>
          <option value="ru">Russian</option>
          <option value="sv">Swedish</option>
          <option value="zh">Chinese</option>
        </select>
      </div>
      <div class="text-center text-lg py-2 gap-3">
        {{ result }} Articles Found
        <button
          @click="submit"
          class="border rounded-lg border-black py-2 px-3"
        >
          Load Articles
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref, onMounted } from "vue";

const props = defineProps({ result: Number });
const emit = defineEmits(["load"]);

const textData = ref("bitcoin");
const selected = ref("en");
const date = ref();

function submit() {
  emit("load", textData, date, selected);
}

onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() - 7));
  date.value = [startDate, endDate];
});
</script>
