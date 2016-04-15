<template>
  <li class="thing-item">
    <input type="checkbox" class="toggle" id="{{ 'ct_' + thing.id }}"/>
    <label for="{{ 'ct_' + thing.id }}"></label><span>{{ thing.title }}</span>
  </li>
</template>

<script>
export default {
  props: {
    thing: Object
  }
}
</script>

<style>
.thing-item {
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 13px;
}
.thing-item span {
  display: inline-block;
  line-height: 13px;
  vertical-align: middle;
}
.thing-item .toggle {
  display: none;
}
.thing-item .toggle + label {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: solid 1px #cccccc;
  border-radius: 10px;
  text-align: center;
  color: #cccccc;
  margin-right: 5px;
  vertical-align: middle;
}
.thing-item .toggle:checked + label:after {
  content: "✓";
}
</style>
