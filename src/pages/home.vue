<template>
  <div class="flex flex-row flex-wrap -mx-3">
    <!-- {{ articles }} -->
    <div
      class="flex-shrink max-w-full w-full sm:w-1/3 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100"
      v-for="(article, i) in articles"
      :key="i"
    >
      <div class="flex flex-row sm:block hover-img">
        <a href="">
          <img
            v-if="article?.urlToImage"
            class="max-w-full w-full mx-auto"
            :src="article.urlToImage"
            alt="alt title"
          />
        </a>
        <div class="py-0 sm:py-3 pl-3 sm:pl-0">
          <h3 class="text-lg font-bold leading-tight mb-2">
            <a href="#">{{ article.title }}</a>
          </h3>
          <p
            class="hidden md:block text-gray-600 leading-tight mb-1"
            v-if="article.description"
          >
            {{ article.description }}
          </p>
          <a class="text-gray-500" href="#"
            ><span
              class="inline-block h-3 border-l-2 border-red-600 mr-2"
            ></span
            >{{ article.author }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const articles = ref(null);
const getDetails = async () => {
  const response = await axios.get(
    "https://newsapi.org/v2/everything?q=bitcoin&apiKey=984c6ffd475b4137bce0a7670278e3eb"
  );
  if (response.data && response.data.status == "ok") {
    console.log(response.data);
    articles.value = response.data.articles;
  } else {
    console.error("Error");
  }
};
getDetails();
</script>
