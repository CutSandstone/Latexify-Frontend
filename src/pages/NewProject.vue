<script setup>
  import LatexEditor from '@/components/LatexEditor.vue';
  import NavBar from '@/components/NavBar.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { getAuth } from 'firebase/auth';
  import { getStorage, ref as storageRef, getDownloadURL, uploadString } from 'firebase/storage';
  const auth = getAuth();
  const u = auth.currentUser;
  const route = useRoute();
  const params = route.params;
  const user = params.user;
  const name = params.name;
  var defaultVal = ref(null);
  var lastSave = "";
  const db = getStorage();
  if(user !== undefined && name !== undefined){
    if(u === null || !u.emailVerified || user != u.displayName){
      alert("Must be signed in");
      useRouter().push("/");
    }
    const project = storageRef(db,`Projects/${u.uid}/${name}.txt`);
    getDownloadURL(project).then((url) => {
      fetch(url).then((txt) => {
        txt.text().then((t) => {
          defaultVal.value = t;
        });
      }).catch((e) => console.log(e));
    }).catch((e) => {
      uploadString(project,"");
      console.log(e);
      defaultVal.value = "";
    });
  }else defaultVal.value = "";
  function update(text){
    if(user !== undefined && name !== undefined){
      defaultVal.value = text;
    }
  }
  function save(){
    console.log("saving");
    if(user !== undefined && name !== undefined && lastSave !== defaultVal.value){
      console.log("saved");
      const project = storageRef(db,`Projects/${u.uid}/${name}.txt`);
      lastSave = defaultVal.value;
      uploadString(project,lastSave);
    }
  }
</script>
<template>
  <NavBar></NavBar>
  <div v-if="user !== undefined && name !== undefined">
    Creator: {{ user }}<br>
    Project Name: {{ name }}
  </div>
  <div v-if="defaultVal !== null">
    <button @click="save">Save</button>
    <LatexEditor :onChange="update" :val="defaultVal"></LatexEditor>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    }
  };
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
