import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ImportJsonService {
  async importLocalJsonFile(): Promise<any> {
    const filePath = path.join(__dirname, '..', '..', 'data.json');

    try {
      // Lê o arquivo JSON como string
      let jsonData = await fs.readFileSync(filePath, 'utf8');

      // Substitui os placeholders com valores das variáveis de ambiente
      jsonData = jsonData
        .replace(/\${TYPE}/g, process.env.TYPE)
        .replace(/\${PROJECT_ID}/g, process.env.PROJECT_ID)
        .replace(/\${PRIVATE_KEY_ID}/g, process.env.PRIVATE_KEY_ID)
        .replace(/\${PRIVATE_KEY}/g, process.env.PRIVATE_KEY)
        .replace(/\${CLIENT_EMAIL}/g, process.env.CLIENT_EMAIL)
        .replace(/\${CLIENT_ID}/g, process.env.CLIENT_ID)
        .replace(/\${AUTH_URI}/g, process.env.AUTH_URI)
        .replace(/\${TOKEN_URI}/g, process.env.TOKEN_URI)
        .replace(/\${AUTH_PROVIDER_X509_CERT_URL}/g, process.env.AUTH_PROVIDER_X509_CERT_URL)
        .replace(/\${CLIENT_X509_CERT_URL}/g, process.env.CLIENT_X509_CERT_URL)
        .replace(/\${UNIVERSE_DOMAIN}/g, process.env.UNIVERSE_DOMAIN);

      // Faz o parsing da string modificada para um objeto JavaScript
      const parsedData = JSON.parse(jsonData);

      // Aqui você pode processar ou salvar os dados no banco de dados
      return parsedData;
    } catch (error) {
      // Tratamento de erro caso a leitura ou processamento falhe
      console.error('Erro ao ler ou processar o arquivo JSON:', error);
      throw error;
    }
  }
}
