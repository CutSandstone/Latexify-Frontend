<script setup>
    import NavBar from '@/components/NavBar.vue';
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, updateProfile, signOut } from 'firebase/auth';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { getFirestore, collection, doc, setDoc, query, where, or, getDocs, limit } from 'firebase/firestore';
    const db = getFirestore();
    const router = useRouter();
    const auth = getAuth();
    const user = auth.currentUser;
    const email = ref('');
    const username = ref('');
    const password1 = ref('');
    const password2 = ref('');
    const confirmP = ref('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var isFirstTime = ref(false);
    function signin(){
        if(isFirstTime.value){
            if(password2.value != confirmP.value){
                alert("Password and confirm password are not the same");
                return;
            }
            if(username.value == ""){
                alert("Username cannot be empty");
                return;
            }
            if(emailRegex.test(username.value)){
                alert("Username cannot be email");
                return;
            }
            const existQuery = query(collection(db,"Accounts"),or(where("username","==",username.value),where("email","==",email.value)));
            getDocs(existQuery).then((snap) => {
                if(!snap.empty){
                    alert("Username or Email in use");
                    return;
                }
                createUserWithEmailAndPassword(auth, email.value, password2.value).then((cred) => {
                    updateProfile(cred.user,{photoURL: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg", displayName: username.value}).then(() => {
                        sendEmailVerification(cred.user).then(() => {
                            setDoc(doc(db,`Accounts/${cred.user.uid}`),{"email":email.value,"username":username.value})
                            alert(`Verification email sent to ${email.value}`);
                            router.push("/");
                        });
                    });
                }).catch((e) => alert(e.message));
            });
        }else{
            if(emailRegex.test(email.value)){
                signInWithEmailAndPassword(auth, email.value, password1.value).then(() => {
                    router.push("/");
                }).catch((e) => alert(e.message));
            }else{
                const userQuery = query(collection(db,"Accounts"),where("username","==",email.value),limit(1));
                getDocs(userQuery).then((snap) => {
                    if(snap.docs.length === 0){
                        alert(`No user with username ${email.value}`);
                        return;
                    }
                    signInWithEmailAndPassword(auth, snap.docs[0].data()["email"], password1.value).then(() => {
                        router.push("/");
                    }).catch((e) => alert(e.message));
                })
            }
        }
    }
    function signout(){
        signOut(auth).then(() => router.go());
    }
</script>
<template>
    <NavBar></NavBar>
    <div v-if="user === null">
        <div v-if="!isFirstTime">
            <h1>Log In</h1>
            Email/Username: <input type="email" v-model="email"><br>
            Password: <input type="password" v-model="password1">
        </div>

        <div v-if="isFirstTime">
            <h1>Create Account</h1>
            Email: <input type="email" v-model="email"><br>
            Username: <input type="username" v-model="username"><br>
            Password: <input type="password" v-model="password2"><br>
            Confirm Password: <input type="password" v-model="confirmP">
        </div>
        <br>
        <button @click="signin">{{ isFirstTime ? "Create Account" : "Log In" }}</button>
        <br>
        <br>
        <button @click="isFirstTime=!isFirstTime">{{ isFirstTime ? "Have an account? Sign In":"Don't have an account? Create Account" }}</button>
    </div>
    <div v-if="user !== null">
        <h1>{{ user.displayName }}<img :src="user.photoURL" width="50px" height="50px"></h1>
        Email: {{ user.email }}
        <button @click="signout">Sign Out</button>
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

</style>