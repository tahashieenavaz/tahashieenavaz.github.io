const Home = {
	template:`
<div>
	<h3> github: </h3>
	<nav>
		<ul class="flex dc projects">
			<li><a href="#"> this website </a></li>
			<li><a href="#"> Sass Debuger </a></li>
			<li><a href="#"> Link </a></li>
			<li><a href="#"> Link </a></li>
		</ul>
	</nav>
</div>
	`
}
const Qoutes = {
	template:`
<div class="flex dc">
	<blockquote v-for="q in qoutes" class="stacked">
      <p>{{q.body}}</p>
    </blockquote>
</div>

	`,
	data: () => ({
		qoutes:"",
	}),
	mounted:function(){
		fetch("https://tahashieenavaz.github.io/qoutes/qoutes.json").then(res => res.json())
		.then((data) => {
			this.qoutes = data;
		});
	},
}
const About = {
	template:`
<div class="about">
	<p>With {{experience}} years of web development experience and having just {{age}} years!</p>
		<p>I develop fullstack web with Vue.js and <span title="lang">PHP</span>.</p>
		<p>I study Computer Engineering but highly interested in history and evolutionism. </p>
		<p>You can often find me reading books and <router-link to="/books">recommending</router-link> them to others.</p>
		<p>I write and keep life saving quotes from great legends and <router-link to="/qoutes">this</router-link> is a handfull list of them.</p>
		<p><a class="ignore-link-color" href="#">Good news! You can help me though! <span style="color:orange">(click)</span></a></p>
		<span @click="dynamicNumbers" style="font-size:.7rem;color:tomato;cursor:pointer"> recalculate </span>
</div>
	`,
	data:()=>({
		age:0,
		experience: 0,
		interval:0,
	}),
	methods:{
		dynamicNumbers(){
			if(this.interval) return;
			let times = 0;
			this.interval = setInterval(()=>{
				this.age = Math.floor(Math.random() * 100);
				this.experience = Math.floor(Math.random() * 100);
				if(times >= 17){
					clearInterval(this.interval);
					let year = new Date().getFullYear();
					this.age = year - 2000;
					this.experience = year - 2013;
					this.interval = 0;
				}
				times++;
			},100);
		},
	},
	mounted:function(){
		let year = new Date().getFullYear();
		this.age = year - 2000;
		this.experience = year - 2013;
	}
}
const Hire = {
	template:`
<div>sdg</div>
	`
}
let routerHandle = new VueRouter({
	routes: [
		{path: '/', component:Home},
		{path: '/about', component:About},
		{path: '/hire', component:Hire},
		{path: '/qoutes', component:Qoutes},
	]
});



let app = new Vue({
	el:"#app",
	router: routerHandle,
	data: ()=>({

	}),
});