<script setup>
const props = defineProps({
  userFormEl: {
    type: Object,
    required: true
  }
});

const setFocus = (elName) => props.userFormEl?.elements[elName]?.focus();
</script>

<template>
  <div>
    <span>Set focus on </span>
    <button class="btn" @click="setFocus('firstName')">FirstName</button>
    <button class="btn" @click="setFocus('lastName')">LastName</button>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  margin: 15px;
}
</style>
