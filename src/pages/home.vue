<template>
  <Header @load="loadArticles"></Header>
  <div class="text-center w-full text-2xl font-bold py-2">
    totalResults : {{ totalResults }}
  </div>
  <div class="flex items-center justify-center overflow-hidden flex-col">
    <div v-if="isLoading">
      <div
        class="h-10 w-10 bg-gradient-to-r from-cyan-500 my-24 to-red-500 animate-spin rounded-full flex items-center justify-center"
      >
        <div class="bg-white h-7 w-7 rounded-full"></div>
      </div>
    </div>

    <div
      class="flex flex-row flex-wrap -mx-3 container"
      v-else-if="articles.length"
    >
      <!-- {{ articles }} -->
      <div
        class="flex-shrink max-w-full w-full sm:w-1/3 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100"
        v-for="(article, i) in articles.slice(0, articlestoShow)"
        :key="i"
      >
        <div class="flex flex-row sm:block hover-img">
          <a href="">
            <img
              v-if="article?.urlToImage"
              class="max-w-full w-full mx-auto aspect-video object-contain"
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

          <div>📅 {{ formatDate(article.publishedAt) }}</div>
        </div>
      </div>
    </div>
    <div v-else>Data Not Found</div>
    <div v-if="!isLoading && articles.length > articlestoShow">
      <button
        @click="loadMore"
        class="py-2 px-4 rounded-md bg-black text-white"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<script setup>
import Header from "../components/header.vue";
import { ref } from "vue";
import axios from "axios";

const formatDate = (data) => {
  const date = new Date(data);
  return date.toLocaleDateString("en-CA");
};

const articles = ref([]);
const isLoading = ref(true);
const articlestoShow = ref(9);
const totalResults = ref(0);
const dateRange = ref([
  formatDate(new Date()),
  formatDate(new Date(new Date().setDate(new Date().getDate() + 7))),
]);
const date = ref(Date());

// Data Liasting Functionality
const getDetails = async (search = "bitcoin", date = dateRange.value) => {
  //   console.log(search);
  const response = await axios.get(
    `https://newsapi.org/v2/everything?q=${search}&from=${date[0]}&to=${date[1]}&pageSize=9&apiKey=984c6ffd475b4137bce0a7670278e3eb`
  );
  if (response.data && response.data.status == "ok") {
    console.log(response.data);
    totalResults.value = response.data.totalResults;
    articles.value = response.data.articles;
    isLoading.value = false;
  } else {
    console.error("Error");
  }
};

// Loading Functionality
setTimeout(() => {
  getDetails();
}, 2000);

const loadArticles = (search, date) => {
  isLoading.value = true;
  articles.value = [];
  dateRange.value = [formatDate(date.value[0]), formatDate(date.value[1])];
  getDetails(search.value);
};
// Load More Functionality

const loadMore = () => {
  articlestoShow.value = articlestoShow.value + 9;
};
</script>
