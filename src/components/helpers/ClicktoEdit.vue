<template>
  <div>
    <input
      type="text"
      v-if="edit"
      :value="valueLocal"
      @blur="inputChange($event.target.value)"
      @keyup.enter="edit = false"
      @keyup.esc="edit = false"
      v-focus=""
    />
    <p v-else @click="edit = true">
      {{ valueLocal }}
    </p>
  </div>
</template>

<script>
  import Vue from "vue";
  export default Vue.extend({
    name: "ClickToEdit",
    props: ["value"],

    data() {
      return {
        edit: false,
        valueLocal: this.value,
      };
    },

    watch: {
      value: function() {
        this.valueLocal = this.value;
      },
    },

    methods: {
      inputChange(target) {
        const stateValue = {
          newValue: target,
          oldValue: this.valueLocal,
        };
        this.valueLocal = target;
        this.edit = false;
        this.$emit("input", stateValue);
      },
    },

    directives: {
      focus: {
        inserted(el) {
          el.focus();
        },
      },
    },
  });
</script>
