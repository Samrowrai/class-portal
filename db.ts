:root{--red:#e11d48;--ink:#111827;--muted:#6b7280;--bg:#fff;--card:#f8fafc;--line:#e5e7eb;--r:14px}
*{box-sizing:border-box}html,body{margin:0}
body{font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:var(--ink);background:var(--bg);line-height:1.55}
h1{font-size:clamp(1.8rem,4vw,2.6rem);line-height:1.15;margin:0 0 .5rem}
a{color:inherit}.muted{color:var(--muted)}.error{color:#dc2626;margin:0}.success{color:#16a34a;margin:0}
.container{max-width:1080px;margin:0 auto;padding:40px 20px 80px}.narrow{max-width:620px}
.center-box{text-align:center;padding-top:120px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:18px;margin-top:20px}
.card{background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:20px;box-shadow:0 1px 2px rgba(0,0,0,.04)}
.card h3{margin:.2rem 0 .5rem}.link-card{text-decoration:none;transition:transform .2s,box-shadow .2s}.link-card:hover{transform:translateY(-3px);box-shadow:0 10px 24px rgba(0,0,0,.08)}
.namelist{padding-left:40px;columns:2 240px}.namelist li{padding:4px 0}
.table-wrap{overflow-x:auto;margin-top:20px}table{border-collapse:collapse;width:100%;min-width:480px}th,td{border:1px solid var(--line);padding:10px 14px;text-align:left}thead{background:var(--card)}
.btn{display:inline-block;text-align:center;border:0;border-radius:999px;padding:13px 26px;font-size:1rem;font-weight:600;cursor:pointer;text-decoration:none;transition:transform .15s,opacity .15s;background:#111827;color:#fff}
.btn:hover{transform:translateY(-1px)}.btn:disabled{opacity:.6;cursor:wait}
.btn-red{background:var(--red);color:#fff}.btn-ghost{background:rgba(255,255,255,.15);color:#fff;width:100%;border:1px solid rgba(255,255,255,.4)}
.btn-outline{background:transparent;color:var(--ink);border:1.5px solid var(--ink)}.row{display:flex;gap:12px;flex-wrap:wrap;margin-top:24px}
.stack{display:flex;flex-direction:column;gap:14px}label{display:flex;flex-direction:column;gap:6px;font-weight:600;font-size:.92rem}
input,textarea{font:inherit;padding:14px 18px;border-radius:12px;border:1px solid var(--line);width:100%}
input:focus,textarea:focus{outline:2px solid var(--red);outline-offset:1px}
/* login */
.login{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:90px 20px 40px;color:#fff;
 background:linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.75)),url(/images/login-background.jpg) center/cover no-repeat}
.login-logo{position:absolute;top:24px;left:24px;height:48px}
.login-box{width:100%;max-width:420px;background:rgba(0,0,0,.6);backdrop-filter:blur(6px);border-radius:18px;padding:36px 32px;display:flex;flex-direction:column;gap:14px;animation:fade .6s ease}
.login-box h1{font-size:clamp(2rem,6vw,2.8rem)}.login-box p{margin:0 0 6px;color:#e5e7eb}
.login-box input{background:rgba(20,20,20,.75);color:#fff;border-color:rgba(255,255,255,.3)}
@keyframes fade{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
/* nav */
.nav{position:sticky;top:0;z-index:20;display:flex;align-items:center;justify-content:space-between;padding:12px 24px;background:rgba(255,255,255,.92);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
.nav-logo img{height:44px;display:block}.nav-links{display:flex;align-items:center;gap:6px}
.nav-item{padding:10px 14px;border-radius:10px;text-decoration:none;font-weight:600;cursor:pointer;display:block}.nav-item:hover{background:var(--card)}
.dropdown{position:relative}.menu{display:none;position:absolute;right:0;top:100%;min-width:210px;background:#fff;border:1px solid var(--line);border-radius:12px;box-shadow:0 12px 30px rgba(0,0,0,.12);padding:6px}
.dropdown:hover .menu,.dropdown:focus-within .menu{display:block}.menu a{display:block;padding:10px 14px;border-radius:8px;text-decoration:none}.menu a:hover{background:var(--card)}
.burger{display:none;font-size:1.5rem;background:none;border:0;cursor:pointer}
@media(max-width:800px){.burger{display:block}.nav-links{display:none;position:absolute;top:100%;left:0;right:0;flex-direction:column;align-items:stretch;background:#fff;padding:10px 16px 18px;border-bottom:1px solid var(--line)}
 .nav-links.open{display:flex}.menu{display:block;position:static;border:0;box-shadow:none;padding:0 0 0 14px}}
/* hero */
.hero{position:relative;min-height:calc(100vh - 69px);display:flex;align-items:center;background:url(/images/home-background.jpg) right center/cover no-repeat}
.hero::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#fff 0%,#fff 32%,rgba(255,255,255,.75) 50%,rgba(255,255,255,0) 78%)}
.hero-text{position:relative;max-width:560px;padding:40px 24px 40px max(24px,6vw);animation:fade .7s ease}.hero-text p{font-size:1.15rem;color:#374151}
@media(max-width:800px){.hero{align-items:flex-start}.hero::before{background:linear-gradient(180deg,#fff 0%,#fff 38%,rgba(255,255,255,.6) 62%,rgba(255,255,255,0) 100%)}.hero-text{padding-top:48px}}
.footer{display:flex;justify-content:space-between;align-items:center;padding:16px 24px;border-top:1px solid var(--line);color:var(--muted);font-size:.9rem}
.link-btn{background:none;border:0;color:var(--red);font-weight:600;cursor:pointer;font:inherit}
