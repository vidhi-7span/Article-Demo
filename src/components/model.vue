<template>
  <VyModal
    name="detail-modal"
    port="modal"
    _class="max-w-[550px] rounded-2xl relative z-50 mx-auto modal-remove-header "
    :closeOnEsc="true"
    :closeOnOverlay="false"
    class="text-bold"
  >
    <template #default>
      <div class="p-5">
        <img
          v-if="detail?.urlToImage"
          class="max-w-full w-full mx-auto aspect-video"
          :src="detail.urlToImage"
          alt="alt title"
        />
        <h3 class="text-lg font-bold leading-tight mb-2 mt-3">
          <a href="#">{{ detail.title }}</a>
        </h3>
        <p
          class="hidden md:block text-gray-600 leading-tight mb-1"
          v-if="detail.description"
        >
          {{ detail.description }}
        </p>

        <a class="text-gray-500" href="#"
          ><span class="inline-block h-3 border-l-2 border-red-600 mr-2"></span
          >{{ detail.author }}</a
        >
        <div class="text-gray-500">📅 {{ formatDate(detail.publishedAt) }}</div>
      </div>
    </template>
  </VyModal>
</template>
<script setup>
import { ref, inject } from "vue";
const emit = defineEmits(["confirm", "cancel"]);
const $global = inject("global");
const formatDate = (data) => {
  const date = new Date(data);
  return date.toLocaleDateString("en-CA");
};
const dateRange = ref([
  formatDate(new Date()),
  formatDate(new Date(new Date().setDate(new Date().getDate() - 7))),
]);
const props = defineProps({
  title: {
    type: String,
  },
  detail: {
    type: Object,
  },
});

const cancel = () => {
  emit("cancel");
  $global.$vayu.modal.close("confirm-modal");
};
const ok = () => {
  emit("confirm");
  $global.$vayu.modal.close("confirm-modal");
};
</script>
