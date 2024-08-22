import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import auth from './firebase';
import { setPersistence, browserLocalPersistence, getAuth } from 'firebase/auth';

async function startApp() {
  try {
    // Set Firebase auth persistence
    await setPersistence(getAuth(), browserLocalPersistence);

    // Only create and mount the Vue app after persistence is set
    createApp(App).use(router).mount('#app');
  } catch (error) {
    console.error('Failed to set Firebase persistence:', error);
  }
}
startApp();