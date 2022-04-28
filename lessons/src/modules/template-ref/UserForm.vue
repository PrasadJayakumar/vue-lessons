<script setup>
import { ref } from 'vue';

const elements = ref({});
defineExpose({ elements });
</script>

<template>
  <div id="userForm">
    <label for="firstName">First name:</label><br />
    <input
      :ref="(el) => (elements.firstName = el)"
      type="text"
      id="firstName"
    /><br />

    <label for="lastName">Last name:</label><br />
    <input
      :ref="(el) => (elements.lastName = el)"
      type="text"
      id="lastName"
    /><br />
  </div>
</template>
