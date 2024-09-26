import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ImportJsonService {
  async importLocalJsonFile(): Promise<any> {
    const filePath = path.join(__dirname, '..', '..', 'data.json');
    
    // Lê o arquivo JSON e o converte em um objeto JavaScript
    const jsonData = await JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Aqui você pode processar ou salvar os dados no banco de dados
    return jsonData;
  }
}
