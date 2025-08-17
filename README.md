# Projeto Firebase Revisado Final

## 🚀 Como rodar
Abra o `index.html` em um servidor (ex: GitHub Pages, Firebase Hosting, ou `live-server` local).  
**⚠️ Importante:** abrir diretamente via `file://` pode quebrar cookies e Firebase. Sempre use um servidor.

## 🔑 Regras Firestore (modo teste)
```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
⚠️ Apenas para desenvolvimento. Em produção configure autenticação.

## 📂 Estrutura da coleção `usuarios`
```
usuarios (Collection)
  12345 (Document ID = matrícula)
    {
      "nome": "Lucas Custodio",
      "senha": "1234",
      "criadoEm": "2025-08-17T10:00:00.000Z"
    }
```

## 🛠️ Debug
Veja o console do navegador:
- `[UI]` → cliques nos botões
- `[Cadastro]` → tentativas e sucesso de cadastro
- `[Login]` → tentativas de login, dados recebidos e validação de senha
