const products = [
  {id:1,title:'Everyday Chronograph',category:'style',price:2499,old:4999,discount:'50% OFF',rating:'4.8',reviews:'129',image:'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80',desc:'A quiet, considered timepiece with a clean face and a reliable heart.'},
  {id:2,title:'Arc wireless headphones',category:'tech',price:3499,old:5999,discount:'42% OFF',rating:'4.6',reviews:'84',image:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80',desc:'Rich sound, soft memory foam, and a battery that keeps going.'},
  {id:3,title:'Stoneware pour-over set',category:'home',price:1899,old:2499,discount:'24% OFF',rating:'4.9',reviews:'56',image:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=80',desc:'Slow mornings, made better. A tactile ceramic set for your daily ritual.'},
  {id:4,title:'Canvas utility tote',category:'style',price:899,old:1299,discount:'31% OFF',rating:'4.7',reviews:'203',image:'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=700&q=80',desc:'Roomy, sturdy, and ready for whatever the day has in mind.'},
  {id:5,title:'Lumen desk light',category:'home',price:2199,old:3299,discount:'33% OFF',rating:'4.8',reviews:'72',image:'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80',desc:'A warm pool of light for focused work and softer evenings.'},
  {id:6,title:'Pocket instant camera',category:'tech',price:5299,old:6999,discount:'24% OFF',rating:'4.5',reviews:'41',image:'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=80',desc:'Make the moment physical. Small enough to take everywhere.'},
  {id:7,title:'Daily ritual journal',category:'home',price:699,old:999,discount:'30% OFF',rating:'4.9',reviews:'118',image:'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=700&q=80',desc:'A beautiful place for the thoughts you want to keep.'},
  {id:8,title:'Everyday canvas sneakers',category:'style',price:1599,old:2499,discount:'36% OFF',rating:'4.6',reviews:'97',image:'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=700&q=80',desc:'An easy classic with a little more thought in every detail.'}
];
let cart = JSON.parse(localStorage.getItem('shopsphere-cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('shopsphere-wishlist') || '[]');
const money = value => `₹${value.toLocaleString('en-IN')}`;
const productCard = (product, dark=false) => `<article class="product-card" data-category="${product.category}"><div class="product-image"><span class="badge">${product.discount}</span><button class="wishlist ${wishlist.includes(product.id)?'active':''}" data-wishlist="${product.id}" aria-label="Add ${product.title} to wishlist">${wishlist.includes(product.id)?'♥':'♡'}</button><img src="${product.image}" alt="${product.title}" loading="lazy"><button class="quick-view" data-quick="${product.id}">Quick view</button></div><div class="product-info"><div class="rating">★★★★★ <span>${product.rating} · ${product.reviews} reviews</span></div><h3>${product.title}</h3><div class="price-row"><strong class="price">${money(product.price)}</strong><span class="old-price">${money(product.old)}</span></div><button class="add-button" data-add="${product.id}">Add to cart <span>+</span></button></div></article>`;
function renderProducts(){document.querySelector('#deal-products').innerHTML=products.slice(0,4).map(p=>productCard(p,true)).join(''); document.querySelector('#all-products').innerHTML=products.slice(2).map(p=>productCard(p)).join(''); bindProductActions();}
function bindProductActions(){document.querySelectorAll('[data-add]').forEach(button=>button.addEventListener('click',()=>addToCart(Number(button.dataset.add))));document.querySelectorAll('[data-wishlist]').forEach(button=>button.addEventListener('click',()=>toggleWishlist(Number(button.dataset.wishlist))));document.querySelectorAll('[data-quick]').forEach(button=>button.addEventListener('click',()=>openQuickview(Number(button.dataset.quick))));}
function addToCart(id){const item=cart.find(entry=>entry.id===id);item?item.qty++:cart.push({id,qty:1});save();openDrawer();}
function toggleWishlist(id){wishlist=wishlist.includes(id)?wishlist.filter(item=>item!==id):[...wishlist,id];localStorage.setItem('shopsphere-wishlist',JSON.stringify(wishlist));document.querySelector('#wishlist-count').textContent=wishlist.length;renderProducts();}
function save(){localStorage.setItem('shopsphere-cart',JSON.stringify(cart));renderCart();}
function renderCart(){const total=cart.reduce((sum,item)=>sum+(products.find(p=>p.id===item.id).price*item.qty),0);document.querySelector('#cart-count').textContent=cart.reduce((sum,item)=>sum+item.qty,0);document.querySelector('#drawer-count').textContent=cart.reduce((sum,item)=>sum+item.qty,0);document.querySelector('#cart-total').textContent=money(total);document.querySelector('#cart-empty').style.display=cart.length?'none':'block';document.querySelector('#cart-items').innerHTML=cart.map(item=>{const p=products.find(product=>product.id===item.id);return `<div class="cart-item"><img src="${p.image}" alt="${p.title}"><div><h4>${p.title}</h4><p>${money(p.price)}</p><div class="qty"><button data-decrease="${p.id}">−</button>${item.qty}<button data-increase="${p.id}">+</button></div></div><button data-remove="${p.id}">Remove</button></div>`}).join('');document.querySelectorAll('[data-increase]').forEach(b=>b.onclick=()=>{cart.find(i=>i.id===Number(b.dataset.increase)).qty++;save()});document.querySelectorAll('[data-decrease]').forEach(b=>b.onclick=()=>{const i=cart.find(i=>i.id===Number(b.dataset.decrease));i.qty--;if(i.qty<1)cart=cart.filter(x=>x.id!==i.id);save()});document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{cart=cart.filter(i=>i.id!==Number(b.dataset.remove));save()});}
function openDrawer(){document.querySelector('#cart-drawer').classList.add('open');document.querySelector('#drawer-backdrop').classList.add('open');}
function closeDrawer(){document.querySelector('#cart-drawer').classList.remove('open');document.querySelector('#drawer-backdrop').classList.remove('open');}
function openQuickview(id){const p=products.find(product=>product.id===id);document.querySelector('#quickview-image').src=p.image;document.querySelector('#quickview-image').alt=p.title;document.querySelector('#quickview-title').textContent=p.title;document.querySelector('#quickview-description').textContent=p.desc;document.querySelector('#quickview-price').textContent=money(p.price);document.querySelector('#quickview-add').onclick=()=>{addToCart(id);document.querySelector('#quickview').classList.remove('open')};document.querySelector('#quickview').classList.add('open');}
document.querySelector('#search-form').addEventListener('submit',event=>{event.preventDefault();const query=document.querySelector('#search-input').value.toLowerCase();document.querySelectorAll('#all-products .product-card').forEach(card=>{card.style.display=card.textContent.toLowerCase().includes(query)?'':'none'});document.querySelector('#new').scrollIntoView({behavior:'smooth'});});
document.querySelectorAll('.filter-tabs button').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.filter-tabs button').forEach(b=>b.classList.remove('active'));button.classList.add('active');document.querySelectorAll('#all-products .product-card').forEach(card=>card.style.display=button.dataset.filter==='all'||card.dataset.filter===button.dataset.filter?'':'none')}));
document.querySelectorAll('.cart-trigger,#wishlist-button').forEach(button=>button.addEventListener('click',openDrawer));document.querySelector('.close-drawer').onclick=closeDrawer;document.querySelector('#drawer-backdrop').onclick=closeDrawer;document.querySelector('.close-quickview').onclick=()=>document.querySelector('#quickview').classList.remove('open');document.querySelector('#quickview').addEventListener('click',event=>{if(event.target.id==='quickview')event.currentTarget.classList.remove('open')});document.querySelector('.announcement button').onclick=event=>event.target.parentElement.remove();
let seconds=8*3600+42*60+19;setInterval(()=>{seconds--;const hours=Math.floor(seconds/3600),minutes=Math.floor((seconds%3600)/60),secs=seconds%60;document.querySelector('#timer').textContent=[hours,minutes,secs].map(n=>String(n).padStart(2,'0')).join(' : ')},1000);renderProducts();renderCart();document.querySelector('#wishlist-count').textContent=wishlist.length;

const modal = id => document.querySelector(`#${id}`);
const closeModal = element => element.classList.remove('open');
const openModal = element => element.classList.add('open');
const account = JSON.parse(localStorage.getItem('shopsphere-account') || 'null');
const locationData = JSON.parse(localStorage.getItem('shopsphere-location') || 'null');
const orders = JSON.parse(localStorage.getItem('shopsphere-orders') || '[]');

function refreshAccount(){
  const currentAccount = JSON.parse(localStorage.getItem('shopsphere-account') || 'null');
  const currentLocation = JSON.parse(localStorage.getItem('shopsphere-location') || 'null');
  document.querySelector('#account-greeting').textContent = currentAccount ? `Hello, ${currentAccount.name}` : 'Hello, sign in';
  if(currentLocation){
    const target = document.querySelector('.location b');
    target.textContent = `${currentLocation.city} ${currentLocation.postcode}`;
  }
}
function renderCheckoutSummary(){
  const total = cart.reduce((sum,item)=>sum + products.find(product=>product.id===item.id).price * item.qty,0);
  document.querySelector('#checkout-summary').innerHTML = `<h3>Order summary</h3>${cart.map(item=>{const product=products.find(p=>p.id===item.id);return `<p><span>${product.title} × ${item.qty}</span><b>${money(product.price*item.qty)}</b></p>`}).join('')}<div class="summary-total"><span>Total</span><b>${money(total)}</b></div>`;
}
function openCheckout(){
  if(!cart.length){ openDrawer(); return; }
  closeDrawer(); renderCheckoutSummary(); openModal(modal('checkout-modal'));
}
document.querySelector('.checkout').addEventListener('click',openCheckout);
document.querySelector('.account').addEventListener('click',()=>openModal(modal('account-modal')));
document.querySelector('.location').addEventListener('click',()=>openModal(modal('location-modal')));
document.querySelector('.orders').addEventListener('click',()=>{
  if(!orders.length){ alert('Your orders will appear here after your first purchase.'); return; }
  alert(`You have ${orders.length} order${orders.length===1?'':'s'}. Latest order: ${orders[orders.length-1].id}`);
});
document.querySelectorAll('.modal-close').forEach(button=>button.addEventListener('click',()=>closeModal(button.closest('.modal'))));
document.querySelectorAll('.modal').forEach(element=>element.addEventListener('click',event=>{if(event.target===element)closeModal(element)}));
document.querySelector('.modal-close-action').addEventListener('click',()=>closeModal(modal('success-modal')));
document.querySelector('#account-form').addEventListener('submit',event=>{
  event.preventDefault();
  const email=document.querySelector('#account-email').value;
  localStorage.setItem('shopsphere-account',JSON.stringify({name:email.split('@')[0],email}));
  document.querySelector('#account-status').textContent='Signed in. Your preferences are saved on this device.';
  refreshAccount();
});
document.querySelector('#location-form').addEventListener('submit',event=>{
  event.preventDefault();
  const value={postcode:document.querySelector('#postcode').value,city:document.querySelector('#city').value};
  localStorage.setItem('shopsphere-location',JSON.stringify(value));
  refreshAccount(); closeModal(modal('location-modal'));
});
document.querySelector('#checkout-form').addEventListener('submit',event=>{
  event.preventDefault();
  const order={id:`SS-${Date.now().toString().slice(-6)}`,date:new Date().toISOString(),items:cart};
  const savedOrders=JSON.parse(localStorage.getItem('shopsphere-orders') || '[]');
  savedOrders.push(order); localStorage.setItem('shopsphere-orders',JSON.stringify(savedOrders));
  cart=[]; save(); closeModal(modal('checkout-modal')); document.querySelector('#success-copy').textContent=`Order ${order.id} is confirmed. We will keep you posted as it travels.`; openModal(modal('success-modal'));
});
document.querySelector('.mobile-menu').addEventListener('click',()=>document.querySelector('.category-nav').classList.toggle('mobile-open'));
document.querySelector('.nav-menu').addEventListener('click',()=>document.querySelector('.category-nav').classList.toggle('mobile-open'));
document.querySelectorAll('[data-category-link]').forEach(link=>link.addEventListener('click',()=>{const filter=link.dataset.categoryLink;document.querySelector(`.filter-tabs [data-filter="${filter}"]`).click()}));
document.querySelector('.load-more').addEventListener('click',event=>{document.querySelector('#all-products').innerHTML=products.map(product=>productCard(product)).join('');bindProductActions();event.currentTarget.textContent='All products loaded';event.currentTarget.disabled=true;});
document.querySelector('.newsletter').addEventListener('submit',event=>{event.preventDefault();const input=event.currentTarget.querySelector('input');input.value='';input.placeholder='You are on the list';});
refreshAccount();