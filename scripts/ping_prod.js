const BASE = process.env.API_URL || 'http://localhost:3333';
(async ()=>{
  for (const path of ['/', '/users', '/session']){
    try{
      const res = await fetch(BASE+path, { method: 'GET' });
      const text = await res.text();
      console.log(`PATH: ${path} - STATUS: ${res.status}`);
      console.log(text.slice(0,2000));
    }catch(e){
      console.error(`PATH: ${path} - ERROR:`, e.message);
    }
    console.log('\n---\n');
  }
})();
