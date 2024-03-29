<template>
  <Header @load="loadArticles" :result="totalResults"></Header>

  <div class="flex items-center justify-center overflow-hidden flex-col">
    <div v-if="isLoading">
      <div
        class="h-10 w-10 bg-gradient-to-r from-cyan-400 my-24 to-slate-700 animate-spin rounded-full flex items-center justify-center"
      >
        <div class="bg-white h-7 w-7 rounded-full"></div>
      </div>
    </div>

    <div class="gap-6 grid grid-cols-3 container" v-else-if="articles.length">
      <!-- {{ articles }} -->
      <div
        class="flex-shrink max-w-full w-full px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted rounded-md border-gray-100 shadow-md"
        v-for="(article, i) in articles"
        :key="i"
      >
        <div class="flex flex-row sm:block hover-img">
          <button @click="openModal(article)">
            <img
              v-if="article?.urlToImage"
              class="max-w-full w-full mx-auto aspect-video object-contain"
              :src="article.urlToImage"
              alt="alt title"
            />
          </button>
          <div class="py-0 sm:py-3 pl-3 sm:pl-0">
            <h3 class="text-lg font-bold leading-tight mb-2">
              {{ article.title }}
            </h3>
            <p
              class="hidden md:block text-gray-600 leading-tight mb-1"
              v-if="article.description"
            >
              {{ article.description }}
            </p>
            <span class="inline-block h-3 border-l-2 border-red-600 mr-2"></span
            >{{ article.author }}
          </div>

          <div>📅 {{ formatDate(article.publishedAt) }}</div>
        </div>
      </div>
    </div>
    <div v-else>Data Not Found</div>
    <div v-if="!isLoading">
      <button
        @click="loadMore"
        class="my-4 py-3 px-6 text-lg rounded-md bg-slate-600 text-white font-semibold"
      >
        Load More
      </button>
    </div>
    <model :detail="modalDetail" />
  </div>
</template>

<script setup>
import model from "@/components/model.vue";
import Header from "@/components/header.vue";
import { ref, inject } from "vue";
import axios from "axios";

const $global = inject("global");
const formatDate = (data) => {
  const date = new Date(data);
  return date.toLocaleDateString("en-CA");
};

const articles = ref([]);
const isLoading = ref(true);
const modalDetail = ref(null);
const totalResults = ref(0);
const currentPage = ref(1);

const dateRange = ref([
  formatDate(new Date()),
  formatDate(new Date(new Date().setDate(new Date().getDate() - 7))),
]);
const date = ref(Date());

const openModal = (item) => {
  modalDetail.value = item;
  $global.$vayu.modal.open("detail-modal");
};

// Data Liasting Functionality
const getDetails = async (
  isLoadingMore = false,
  search = "bitcoin",
  lang = "en",
  role = "publishedAt",
  date = dateRange.value
) => {
  const response = await axios.get(
    `https://newsapi.org/v2/everything?q=${search}&from=${date[0]}&to=${date[1]}&language=${lang}&sortBy=${role}&pageSize=9&page=${currentPage.value}&apiKey=984c6ffd475b4137bce0a7670278e3eb`
  );
  if (response.data && response.data.status == "ok") {
    totalResults.value = response.data.totalResults;
    if (isLoadingMore) {
      articles.value.push(...response.data.articles);
    } else {
      articles.value = response.data.articles;
    }
    isLoading.value = false;
  } else {
    console.error("Error");
  }
};

// Loading Functionality
setTimeout(() => {
  getDetails();
}, 2000);

const loadArticles = (search, date, lang, rele) => {
  isLoading.value = true;
  articles.value = [];
  dateRange.value = [formatDate(date.value[0]), formatDate(date.value[1])];
  getDetails(false, search.value, lang.value, rele.value);
};
// Load More Functionality

const loadMore = () => {
  currentPage.value = currentPage.value + 1;
  getDetails(true);
};
</script>
