# Setup

Existe 2 formas de iniciar a nossa aplicação:

- Usando o docker
- Não usar o docker


## Docker

Para inicializar o nosso projeto utilizando *containers Docker* é preciso realizar os seguintes passos:

1. sudo ./rebuild.sh
2. Aceitar ambas as confirmações
3. sudo docker cp Data/all_data.json ruas-mongodb:/tmp
4. sudo docker exec -it ruas-mongodb bash
5. mongoimport -d RuasBragaDB -c ruas --jsonArray /tmp/all_data.json

## Não utilizando o docker

Sem utilizar *containers Docker* é preciso realizar os seguintes passos:

1. mongoimport -d RuasBragaDB -c ruas --jsonArray Data/all_data.json
2. Abrir 3 terminais diferentes
3. Terminal 1: cd APIAutenticacao
4. Terminal 1: npm i
5. Terminal 1: npm start
6. Terminal 2: cd APIDados
7. Terminal 2: npm i
8. Terminal 2: npm start
9. Terminal 3: cd WebSite
10. Terminal 3: npm i
11. Terminal 3: npm start

## Notas

Se por ventura o ficheiro Data/all_data.json for apagado, basta correr o programa em *Python* script.py na diretoria Data.
