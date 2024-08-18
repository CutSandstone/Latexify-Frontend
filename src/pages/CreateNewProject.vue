<script setup>
import NavBar from '@/components/NavBar.vue';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const auth = getAuth();
const router = useRouter();
const user = auth.currentUser;
if(user === null || !user.emailVerified){
    alert("You must login to view projects");
    router.push("/");
}
const name = ref("");
function createProject(){
    if(name.value.match(/[ /\\/.]/) !== null){
        alert("Invalid characters");
        return;
    }
    router.push(`/editor/${user.displayName}/${name.value}`);
}
</script>
<template>
    <NavBar></NavBar>
    Project Name: <input id="name" v-model="name"><br><br>
    <button @click="createProject">Create</button>
</template>