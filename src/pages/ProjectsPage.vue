<script setup>
import NavBar from '@/components/NavBar.vue';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { getStorage, ref as storageRef, listAll } from 'firebase/storage';
import { ref } from 'vue';
const auth = getAuth();
const router = useRouter();
const names = ref([]);
const user = auth.currentUser;
if(user === null || !user.emailVerified){
  alert("You must login to view projects");
  router.push("/");
}
const db = getStorage();
const projects = storageRef(db,`Projects/${user.uid}`);
listAll(projects).then((res) => {
  names.value = [];
  res.items.forEach((item) => {
    names.value.push(item.fullPath.substring(item.fullPath.lastIndexOf("/")+1,item.fullPath.length-4));
  });
});
</script>
<template>
    <NavBar></NavBar>
    <h1>My Projects</h1>
    <button @click="router.push('/new')">Create Project</button>
    <br>
    <br>
    <div v-if="names.length === 0">No Existing Projects</div>
    <div v-if="names.length !== 0">
      Existing Projects
      <ul>
        <li v-for="(item,index) in names" :key="index"><button @click="router.push(`/editor/${user.displayName}/${item}`)">{{ item }}</button></li>
      </ul>
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
