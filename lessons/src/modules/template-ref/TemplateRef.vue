<script setup>
import { ref } from 'vue';

import Toolbar from './Toolbar.vue';
import UserForm from './UserForm.vue';

const userFormEl = ref(null);
</script>

<template>
  <div>
    <h1>Template Ref Demo</h1>
    <Toolbar :user-form-el="userFormEl" />
    <br />
    <UserForm ref="userFormEl" />
  </div>
</template>
