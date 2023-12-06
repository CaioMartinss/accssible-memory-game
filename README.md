# Jogo de Memória Acessível para Daltonismo

Este é um jogo de memória acessível desenvolvido para pessoas com daltonismo.

## Instalação

Certifique-se de ter o Node.js e o npm instalados antes de prosseguir.

1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```


2. Navegue até o diretório do projeto:

```
cd nome-do-repositorio
```

3.Instale as dependências:

```
npm install
```

Certifique-se de ter um servidor MongoDB em execução.
Crie um arquivo database.js no diretório src com o seguinte conteúdo:

```javascript
// src/database.js
import mongoose from 'mongoose';

const URI = 'sua url do MongoDB';

const databaseConnection = async () => {
  if (!global.mongoose) {
    mongoose.set('strictQuery', false);
    global.mongoose = await mongoose.connect(URI);
  }
};

export default databaseConnection;

```

Certifique-se de substituir 'sua url do MongoDB' pela URL real do seu banco de dados.

Execute o seguinte comando para iniciar a API:
```
npm run dev
```
