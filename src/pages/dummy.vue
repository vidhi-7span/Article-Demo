<template>
  <div>
    <h1 class="text-2xl font">List from Dummy API</h1>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const items = ref([]);

    onMounted(async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/everything?q=bitcoin&apiKey=984c6ffd475b4137bce0a7670278e3eb"
        );
        items.value = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });

    return {
      items,
    };
  },
};
</script>
