import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
import '@skeletonlabs/skeleton/styles/all.css';
import './app.postcss';
import App from "./App.svelte";


const app = new App({
  target: document.getElementById("app"),
});

export default app;
