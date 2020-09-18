<template>
  <div class="wrapper">
    <div class="doc-container">
      <div
        v-for="doc in this.documents"
        :key="doc.id"
        class="document"
        @click="docEdit(doc.id)"
      >
        <div class="doc-content">
          <p class="doc-title">
            <span class="text-blue-900 mr-2">
              <i class="fas fa-bookmark"></i>
            </span>
            {{ doc.title }}
          </p>
          <p class="doc-text">
            {{ doc.content }}
          </p>
        </div>
        <div class="doc-details">
          <span class="doc-delete">
            <i class="far fa-trash-alt"></i>
          </span>
          <p class="doc-date">
            date
          </p>
        </div>
      </div>
    </div>
    <router-link to="/doc-create" class="btn-main doc-create transition">
      Create New
    </router-link>
    <Fab />
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import Fab from "@/components/Fab.vue";
  import { mapState } from "vuex";
  export default Vue.extend({
    name: "Documents",
    components: {
      Fab,
    },
    computed: {
      ...mapState(["documents"]),
    },
    methods: {
      docEdit(doc: string) {
        this.$router.push({
          name: "DocCreate",
          params: { docedit: doc },
        });
      },
    },
  });
</script>
<style lang="css" scoped>
  @layer components {
    .wrapper {
      @apply w-full h-full grid row-gap-4 col-gap-16;
      grid-template-columns: 8fr 1fr;
    }
    .doc-create {
      max-height: 55px;
    }
    .doc-container {
      @apply grid row-gap-8 col-gap-8 grid-cols-4;
      grid-auto-rows: min-content;
    }
    .document {
      @apply w-full bg-white rounded-md shadow-md;
      grid-template-rows: 1fr 32px;
    }
    .document:hover {
      @apply cursor-pointer;
    }
    .doc-content {
      @apply p-8;
    }
    .doc-title {
      @apply text-lg font-semibold text-dark-900;
    }
    .doc-text {
      @apply text-dark-900 mt-4;
    }
    .doc-details {
      @apply flex items-center py-4 px-8 bg-gray-100 justify-between;
      border-top: 1px solid var(--gray-light);
    }
    .doc-delete {
      @apply text-gray-700;
    }
  }
</style>
