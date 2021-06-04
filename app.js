const Home = {
    template:
      '\n<div class="press">\n\t<h3> github: </h3>\n\t<nav>\n\t\t<ul class="flex dc projects">\n\t\t\t<li><a href="https://github.com/tahashieenavaz/tahashieenavaz.github.io" target="_blank"> this website </a></li>\n\t\t\t<li><a href="https://github.com/tahashieenavaz/sass-debugger"> sass debugger </a></li>\n\t\t\t</ul>\n\t</nav>\n</div>\n\t',
  },
  Quotes = {
    template:
      '\n<div class="flex dc">\n\t<blockquote v-for="q in quotes" class="stacked">\n      <p>{{q.body}}</p>\n      <span style="position:absolute;right:10px;bottom:5px;">- {{q.from}}</span>\n    </blockquote>\n</div>\n\n\t',
    data: () => ({ quotes: "" }),
    mounted: function () {
      fetch("https://tahashieenavaz.github.io/quotes/quotes.json")
        .then((t) => t.json())
        .then((t) => {
          this.quotes = t;
        });
    },
  },
  About = {
    template:
      '\n<div class="about">\n\t<p @click="loading=false">{{experience}} years of web development experience and being just {{age}} years old, I develop fullstack web mostly with Vue.js and PHP professionally.</p>\n\t\t<p>I study computer engineering but highly interested in history and evolutionism. </p>\n\t\t<p>You can often find me reading books and recommending them to others.</p>\n\t\t<p>I keep life saving quotes from great legends and <router-link to="/quotes">this</router-link> is a handfull list of them.</p>\n\t\t<span @click="dynamicNumbers" style="opacity:1;color:tomato;cursor:pointer;animation:blinking .8s ease-out infinite;"> try this </span>\n</div>\n\t',
    data: () => ({ age: 0, experience: 0, interval: 0, loading: !0 }),
    methods: {
      dynamicNumbers() {
        if (this.interval) return;
        let t = 0;
        this.interval = setInterval(() => {
          if (
            ((this.age = Math.floor(100 * Math.random())),
            (this.experience = Math.floor(100 * Math.random())),
            t >= 17)
          ) {
            clearInterval(this.interval);
            let t = new Date().getFullYear();
            (this.age = t - 2e3),
              (this.experience = t - 2013),
              (this.interval = 0);
          }
          t++;
        }, 100);
      },
    },
    mounted: function () {
      let t = new Date().getFullYear();
      (this.age = t - 2e3), (this.experience = t - 2013);
    },
  };
let routerHandle = new VueRouter({
  routes: [
    { path: "/", component: Home },
    { path: "/about", component: About, meta: { title: "Who is ?" } },
    {
      path: "/quotes",
      component: Quotes,
      meta: { title: "Quotes Collection" },
    },
  ],
});
const siteStaticTitle = "Evolution of a web developer";
routerHandle.afterEach((t, e) => {
  Vue.nextTick(() => {
    document.title = t.meta.title
      ? siteStaticTitle + " || " + t.meta.title
      : siteStaticTitle;
  });
});
let app = new Vue({
  el: "#app",
  router: routerHandle,
  data: () => ({ loading: !1, interval: 0, fakeDelay: 1600, darkMode: !1 }),
  watch: {
    $route(t, e) {
      this.startLoading(),
        "/about" != t.path && setTimeout(this.endLoading, this.fakeDelay);
    },
  },
  methods: {
    startLoading() {
      if (0 == this.interval) {
        this.loading = !0;
        let t = document.querySelector("h1");
        this.interval = setInterval(() => {
          t.style.color = `#${Math.floor(16777215 * Math.random()).toString(
            16
          )}`;
        }, 75);
      }
    },
    endLoading() {
      clearInterval(this.interval),
        (this.interval = 0),
        document.querySelector("h1").removeAttribute("style");
    },
    darkItUp(t) {
      document.querySelector("body").classList.toggle("dark"),
        (this.darkMode = !this.darkMode);
    },
  },
});
const el = document.getElementById("visits");
const container = document.querySelector('.dialog-container');
let Bginterval = null;
document.getElementById("close").addEventListener("click", ()=>{
    container.style.display = "none";
    document.body.style.overflowY = "visible";
});
document.addEventListener("keydown", (e)=>{
    if(Bginterval == null){
        Bginterval = setInterval(()=>{
            container.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        }, 200);
    }

    if(e.shiftKey && e.ctrlKey && e.key == "Enter"){
        container.style.display = "flex";
        document.body.style.overflow = "hidden";
    }
});
window.onunload = window.onbeforeunload = (function(){
    fetch("https://api.countapi.xyz/update/tahashieenavaz/onlineusers?amount=-1").then(res => res.json()).then(data => data);
});

let lastVisits = null;
window.onload = function(){
    fetch("https://api.countapi.xyz/hit/tahashieenavaz/realpagevisits")
        .then(res => res.json())
        .then(data => {
            lastVisits = data.value;
            el.innerHTML = data.value;
        });
    fetch("https://api.countapi.xyz/hit/tahashieenavaz/onlineusers")
        .then(res => res.json())
        .then(data => data);
}
setInterval(()=>{
    fetch("https://api.countapi.xyz/get/tahashieenavaz/onlineusers").then(res => res.json()).then(data => {
        document.getElementById("onlineUsers").innerText = data.value;
    });
    fetch("https://api.countapi.xyz/get/tahashieenavaz/realpagevisits")
    .then(res => res.json())
    .then(data => {
        if(lastVisits != data.value){
            lastVisits = data.value;
            el.style.color = "red";
            setTimeout(()=>{
                el.style.color = "#fff";
            }, 1500);
            el.innerHTML = data.value;
        }
    });
},2000);
