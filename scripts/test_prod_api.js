const BASE = 'https://web-production-a5f94.up.railway.app';

async function req(path, opts){
  const res = await fetch(BASE + path, opts);
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch(e){ json = text; }
  return { status: res.status, body: json };
}

(async ()=>{
  console.log('== STEP 1: CREATE USER ==');
  let r1 = await req('/users', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ name: 'Deploy Test User', email: 'deploy-test@example.com', password: 'Test1234' }) });
  console.log(r1);

  console.log('\n== STEP 2: LOGIN ==');
  let r2 = await req('/session', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email: 'deploy-test@example.com', password: 'Test1234' }) });
  console.log(r2);

  let token = null;
  if (r2 && r2.body && r2.body.token) token = r2.body.token;

  if (!token) {
    console.error('\nNo token received, aborting authenticated tests.');
    process.exit(1);
  }

  console.log('\nTOKEN:', token);

  console.log('\n== STEP 3: CREATE CATEGORY ==');
  let r3 = await req('/category', { method: 'POST', headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${token}`}, body: JSON.stringify({ name: 'Pizzas' }) });
  console.log(r3);

  console.log('\n== STEP 4: LIST CATEGORIES ==');
  let r4 = await req('/category', { method: 'GET', headers: { 'Authorization': `Bearer ${token}` } });
  console.log(r4);
})();
