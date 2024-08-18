<script setup>
// import {useRoute} from 'vue-router';
// const route = useRoute();
// const params = route.params;
  import { ref, watch } from 'vue';
  const katex = import('katex');
  const markdown = import("markdown");
  const html = ref('');
  const rendered = ref('');
  watch(html, () => {
    katex.then((k) => {
      markdown.then((m) => {
        rendered.value = m.markdown.toHTML(html.value).replace(/(?<!\\)(?:\\\\)*\$(.+?)(?<!\\)(?:\\\\)*\$/gm,(_,a) => {
          return k.default.renderToString(a,{throwOnError: false,output: "mathml"});
        }).replace(/(?<!\\)\\(?:\\\\)*\$/gm,(m) => {
          return m.substring(1);
        });
      });
    });
  });
</script>
<template>
  <div class="textbox-container">
    <textarea class="full-height-textbox" v-model="html"></textarea>
    <div v-html="rendered" class="full-height-textbox"></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    }
  };
</script>

<style scoped>
.textbox-container {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  height: 90vh; /* Full height of the viewport */
}

.full-height-textbox {
  width: 50vw; /* Half the width of the viewport */
  height: 100%; /* Full height of the parent container */
  resize: none; /* Prevent resizing */
  padding: 10px;
  box-sizing: border-box; /* Include padding in width/height calculation */
  font-size: 16px; /* Adjust font size as needed */
}
</style>