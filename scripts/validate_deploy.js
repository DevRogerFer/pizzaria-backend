// Script de validação pré-deploy
const BASE = 'https://web-production-a5f94.up.railway.app';

async function testEndpoint(path, method, body) {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' }
    };
    
    if (body) {
      options.body = JSON.stringify(body);
    }
    
    const res = await fetch(BASE + path, options);
    const data = await res.text();
    
    return {
      status: res.status,
      ok: res.ok,
      data: data.slice(0, 500)
    };
  } catch (e) {
    return { error: e.message };
  }
}

(async () => {
  console.log('🔍 VALIDAÇÃO PRÉ-DEPLOY\n');
  console.log('Backend:', BASE);
  console.log('Frontend: https://pizzaria-frontend-production.up.railway.app\n');
  
  console.log('═══════════════════════════════════════════════════');
  console.log('📋 TESTE 1: Health Check (GET /)');
  console.log('═══════════════════════════════════════════════════');
  const t1 = await testEndpoint('/', 'GET');
  console.log('Status:', t1.status);
  console.log('Expected: 404 (rota não existe, mas servidor responde)');
  console.log('Result:', t1.status === 404 ? '✅ PASS' : '❌ FAIL');
  
  console.log('\n═══════════════════════════════════════════════════');
  console.log('📋 TESTE 2: Criar Usuário (POST /users)');
  console.log('═══════════════════════════════════════════════════');
  const randomEmail = `test${Date.now()}@example.com`;
  const t2 = await testEndpoint('/users', 'POST', {
    name: 'Security Test User',
    email: randomEmail,
    password: 'SecurePass123'
  });
  console.log('Status:', t2.status);
  console.log('Expected: 200 (usuário criado)');
  console.log('Result:', t2.status === 200 ? '✅ PASS' : '❌ FAIL');
  if (t2.data) console.log('Response:', t2.data);
  
  console.log('\n═══════════════════════════════════════════════════');
  console.log('📋 TESTE 3: Login (POST /session)');
  console.log('═══════════════════════════════════════════════════');
  const t3 = await testEndpoint('/session', 'POST', {
    email: randomEmail,
    password: 'SecurePass123'
  });
  console.log('Status:', t3.status);
  console.log('Expected: 200 (login bem-sucedido)');
  console.log('Result:', t3.status === 200 ? '✅ PASS' : '❌ FAIL');
  if (t3.data) console.log('Response:', t3.data);
  
  console.log('\n═══════════════════════════════════════════════════');
  console.log('📋 TESTE 4: Validação de Email Inválido');
  console.log('═══════════════════════════════════════════════════');
  const t4 = await testEndpoint('/users', 'POST', {
    name: 'Test User',
    email: 'invalid-email',
    password: 'Test1234'
  });
  console.log('Status:', t4.status);
  console.log('Expected: 500 (email inválido rejeitado)');
  console.log('Result:', t4.status === 500 ? '✅ PASS' : '❌ FAIL');
  
  console.log('\n═══════════════════════════════════════════════════');
  console.log('📋 TESTE 5: Validação de Senha Curta');
  console.log('═══════════════════════════════════════════════════');
  const t5 = await testEndpoint('/users', 'POST', {
    name: 'Test User',
    email: `test2${Date.now()}@example.com`,
    password: '123'
  });
  console.log('Status:', t5.status);
  console.log('Expected: 500 (senha muito curta rejeitada)');
  console.log('Result:', t5.status === 500 ? '✅ PASS' : '❌ FAIL');
  
  console.log('\n═══════════════════════════════════════════════════');
  console.log('📊 RESUMO DOS TESTES');
  console.log('═══════════════════════════════════════════════════');
  
  const results = [
    t1.status === 404,
    t2.status === 200,
    t3.status === 200,
    t4.status === 500,
    t5.status === 500
  ];
  
  const passed = results.filter(r => r).length;
  const total = results.length;
  
  console.log(`\nTestes Passados: ${passed}/${total}`);
  console.log(`Taxa de Sucesso: ${(passed/total*100).toFixed(1)}%`);
  
  if (passed === total) {
    console.log('\n✅ TODOS OS TESTES PASSARAM!');
    console.log('✅ Backend está funcionando corretamente');
    console.log('✅ Validações de segurança ativas');
    console.log('✅ Pronto para integração com frontend');
  } else {
    console.log('\n⚠️ ALGUNS TESTES FALHARAM');
    console.log('Verifique os logs acima para detalhes');
  }
  
  console.log('\n═══════════════════════════════════════════════════');
})();
