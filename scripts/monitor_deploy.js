const https = require('https');

const API_URL = 'https://web-production-a5f94.up.railway.app';

console.log('🔍 Monitorando deploy no Railway...\n');
console.log(`URL: ${API_URL}`);
console.log('Aguardando deploy ser concluído...\n');

let attempt = 0;
const maxAttempts = 40; // 40 tentativas = ~2 minutos

function checkDeploy() {
  attempt++;
  
  https.get(`${API_URL}/`, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log(`✅ [Tentativa ${attempt}] Deploy concluído! Status: ${res.statusCode}`);
        console.log(`\n🎉 API está online!\n`);
        console.log('Testando endpoint /users...\n');
        
        // Testar endpoint /users
        https.get(`${API_URL}/users`, (res2) => {
          console.log(`📊 GET /users - Status: ${res2.statusCode}`);
          
          if (res2.statusCode === 200) {
            console.log('✅ Endpoint /users funcionando!\n');
            console.log('🚀 Deploy realizado com sucesso! Todas as tabelas devem estar criadas.');
          } else if (res2.statusCode === 500) {
            console.log('❌ Ainda há erro 500. Verifique os logs.');
          }
        }).on('error', (err) => {
          console.error('Erro ao testar /users:', err.message);
        });
        
      } else if (res.statusCode === 502 || res.statusCode === 503) {
        console.log(`⏳ [Tentativa ${attempt}] Deploy em andamento... Status: ${res.statusCode}`);
        
        if (attempt < maxAttempts) {
          setTimeout(checkDeploy, 3000); // Tentar novamente em 3 segundos
        } else {
          console.log('\n⚠️ Tempo limite excedido. Verifique manualmente o painel do Railway.');
        }
      } else {
        console.log(`⚠️ [Tentativa ${attempt}] Status inesperado: ${res.statusCode}`);
        
        if (attempt < maxAttempts) {
          setTimeout(checkDeploy, 3000);
        }
      }
    });
  }).on('error', (err) => {
    console.log(`⏳ [Tentativa ${attempt}] Aguardando servidor... (${err.code})`);
    
    if (attempt < maxAttempts) {
      setTimeout(checkDeploy, 3000);
    } else {
      console.log('\n⚠️ Tempo limite excedido. Verifique manualmente o painel do Railway.');
    }
  });
}

// Iniciar monitoramento
checkDeploy();
