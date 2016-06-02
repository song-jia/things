<template>
  <div class="toolbar pure-menu">
    <span class="pure-menu-heading">Things</span>
    <ul class="pure-menu-list">
      <li class="pure-menu-item"><a v-link="{ path: '/collections' }" class="pure-menu-link">collections</a></li>
      <li class="pure-menu-item"><a v-link="{ path: '/actions' }" class="pure-menu-link">today</a></li>
    </ul>
  </div>
</template>

<style>
.toolbar .pure-menu-heading {
  font-weight: 600;
}
