<script setup>
    import NavBar from '@/components/NavBar.vue';
    import { getAuth } from 'firebase/auth';
    import { useRoute } from 'vue-router';
    import { getDatabase, ref as rtRef, update } from 'firebase/database';
    import { getFirestore, collection, getDoc, doc, getDocs } from 'firebase/firestore';
    import router from '@/router';
    import { ref } from 'vue';
    const auth = getAuth();
    const rtdb = getDatabase();
    const firestore = getFirestore();
    const u = auth.currentUser;
    const route = useRoute();
    const params = route.params;
    const user = params.user;
    const name = params.name;
    var read = ref([]);
    var write = ref([]);
    var allowRead = ref('');
    var allowWrite = ref('');
    if(u.displayName !== user){
        alert("You do not have access to this project");
        router.push("/");
    }
    getDoc(doc(collection(firestore,"EditAccess"),`${u.uid}.${name}`)).then((snap) => {
        if(snap.exists()){
            const data = snap.data();
            read.value = []
            write.value = []
            for(const [k,v] of Object.entries(data)){
                const d = doc(collection(firestore,"Accounts"),k);
                getDoc(d).then((snap2) => {
                    const name = snap2.data()["username"];
                    if(v === "read"){
                        read.value.push([name,k]);
                    }else if(v === "write"){
                        write.value.push([name,k]);
                    }
                });
            }
        }
    }).catch((e) => console.log(e));
    function revokeRead(username){
        console.log("Revoking read "+username);
        var data = {};
        data[username] = "revoke";
        update(rtRef(rtdb,`EditAccess/${u.uid}/${name}`),data);
    }
    function revokeWrite(username){
        console.log("Revoking write "+username);
        var data = {};
        data[username] = "revoke";
        update(rtRef(rtdb,`EditAccess/${u.uid}/${name}`),data);
    }
    function addRead(){
        if(allowRead.value === "") return;
        console.log("Adding read "+allowRead.value);
        if(read.value.includes(allowRead.value)){
            alert("This person already has read access");
            return;
        }
        if(write.value.includes(allowRead.value)){
            alert("This person has write access");
            return;
        }
        var data = {};
        data[allowRead.value] = "read";
        update(rtRef(rtdb,`EditAccess/${u.uid}/${name}`),data);
        allowRead.value = "";
    }
    function addWrite(){
        console.log("Adding write "+allowWrite.value);
        if(write.value.includes(allowWrite.value)){
            alert("This person already has write access");
            return;
        }
        var data = {};
        data[allowWrite.value] = "write";
        console.log(name);
        update(rtRef(rtdb,`EditAccess/${u.uid}/${name}`),data);
        allowWrite.value = "";
    }
</script>
<template>
    <NavBar></NavBar>
    <h1>Project settings</h1>
    <h1>Project Name: {{ name }}</h1>
    Owner: {{ user }}<br>
    Read Access:
    <ul>
        <li v-for="(item) in read">{{ item[0] }}<button @click="revokeRead(item)">Revoke read</button></li>
    </ul>
    <input v-model="allowRead"><button @click="addRead">Allow Read</button>
    <br><br><br>
    Write Access:
    <ul>
        <li v-for="(item) in write">{{ item[0] }}<button @click="revokeWrite(item)">Revoke write</button></li>
    </ul>
    <input v-model="allowWrite"><button @click="addWrite">Allow Write</button>
</template>
<script>
export default {
    name: 'ProjectSettings',
}
</script>