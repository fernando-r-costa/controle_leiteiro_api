# Imagem oficial do node como base (versão corrigida)
# Usa tag major para manter versão 24.x; atualize para um patch específico assim que disponível (ex.: 24.13.0+).
FROM node:24

# Diretório de trabalho
WORKDIR /usr

# Copiar os arquivos package
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar demais arquivos do projeto
COPY . .

# Expor uma porta do container
EXPOSE 3000

# Comando para inicializar a aplicação
CMD [ "node", "src/index.js" ]