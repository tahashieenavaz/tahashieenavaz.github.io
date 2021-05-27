const animations = false;

class Controller{
  el = "";
  loading = false;
  constructor(){
    this.el = document.querySelector('.content');
  }

  index = () =>{
    this.changeStart();
    let TargetPage = new Page(`
      <nav>
        <ul class="flex dc projects">
          <li><a href="#"> elCentralization </a></li>
          <li><a href="#"> Sass Debuger </a></li>
          <li><a href="#"> Link </a></li>
          <li><a href="#"> Link </a></li>
        </ul>
      </nav>
    `);
    if(animations){
      setTimeout(()=>{
        this.el.innerHTML = TargetPage.render();
      }, 400);
    }else{
      this.el.innerHTML = TargetPage.render();
    }
  };

  about = () =>{
    this.changeStart();
    let TargetPage = new Page(`
Hi There, I am Taha.<br>
Fullstack web developer and part time currency trader. <br>
History avid reader and evolutionist.
    `);
    if(animations){
      setTimeout(()=>{
        this.el.innerHTML = TargetPage.render();
      }, 400);
    }else{
      this.el.innerHTML = TargetPage.render();
    }
  };

  qoutes = () => {
    this.changeStart();
    let TargetPage = new Page(`
<a href="#">Sapiens</a>
<a href="#">Sapiens</a>
    `);
    if(animations){
      setTimeout(()=>{
        this.el.innerHTML = TargetPage.render();
      }, 400);
    }else{
      this.el.innerHTML = TargetPage.render();
    }

  };

  books = () => {
    this.changeStart();
    let TargetPage = new Page(`
<div class="books">
  <a href="#">Sapiens <span>- Noah Harari</span></a>
  <a href="#">Homo Deus <span>- Noah Harari</span></a>
  <a href="#">Factfulness <span>- Rans Roseling</span></a>
  <a href="#">Thinking Fast and Slow - Daniel Kanehman</a>
  <a href="#">Nadir Shah</a>
  <a href="#">The Four</a>
</div>
    `);
    if(animations){
      setTimeout(()=>{
        this.el.innerHTML = TargetPage.render();
      }, 400);
    }else{
      this.el.innerHTML = TargetPage.render();
    }
  };

  hireme = () =>{
    this.changeStart();
    let TargetPage = new Page(`
<div class="hireme">
  asdasds
</div>
    `);
    if(animations){
      setTimeout(()=>{
        this.el.innerHTML = TargetPage.render();
      }, 400);
    }else{
      this.el.innerHTML = TargetPage.render();
    }
  };
  changeStart = () =>{
    this.loading = true;
    if (animations) this.el.classList.add('out');
  };

  changeEnd = () =>{
    this.loading = false;
  };
}
class Page {
  template = ``;

  constructor(template){
    this.template = template;
  }

  render = () => {
    return this.template;
  };
}
class Router {
  routes = [];

  mode = null;

  root = '/';

  constructor(options) {
    this.mode = window.history.pushState ? 'history' : 'hash';
    if (options.mode) this.mode = options.mode;
    if (options.root) this.root = options.root;
    this.listen();
  }

  add = (path, cb) => {
    this.routes.push({ path, cb });
    return this;
  };

  remove = path => {
    for (let i = 0; i < this.routes.length; i += 1) {
      if (this.routes[i].path === path) {
        this.routes.slice(i, 1);
        return this;
      }
    }
    return this;
  };

  flush = () => {
    this.routes = [];
    return this;
  };

  clearSlashes = path =>
    path
      .toString()
      .replace(/\/$/, '')
      .replace(/^\//, '');

  getFragment = () => {
    let fragment = '';
    if (this.mode === 'history') {
      fragment = this.clearSlashes(decodeURI(window.location.pathname + window.location.search));
      fragment = fragment.replace(/\?(.*)$/, '');
      fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
    } else {
      const match = window.location.href.match(/#(.*)$/);
      fragment = match ? match[1] : '';
    }
    return this.clearSlashes(fragment);
  };

  navigate = (path = '') => {
    if (this.mode === 'history') {
      window.history.pushState(null, null, this.root + this.clearSlashes(path));
    } else {
      window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${path}`;
    }
    return this;
  };

  listen = () => {
    clearInterval(this.interval);
    this.interval = setInterval(this.interval, 50);
  };

  interval = () => {
    if (this.current === this.getFragment()) return;
    this.current = this.getFragment();

    this.routes.some(route => {
      const match = this.current.match(route.path);
      if (match) {
        match.shift();
        route.cb.apply({}, match);
        return match;
      }
      return false;
    });
  };
}
const router = new Router({
  mode: 'hash',
  root: '/'
});
const controller = new Controller();

router.add(/about/, controller.about)
.add(/books/, controller.books)
.add(/qoutes/, controller.qoutes)
.add(/hireme/, controller.hireme);
if(animations){
  window.addEventListener("DOMContentLoaded", (e) =>{

      let el = document.querySelector('.content');
      let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
      let observer = new MutationObserver(()=>{;
        setTimeout(()=>{
          el.classList.remove('out');
        },500);
      });
      observer.observe(el, {
        childList: true
      });
      
  });
}


router.add('',controller.index);