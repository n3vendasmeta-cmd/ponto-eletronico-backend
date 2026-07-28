# Comandos úteis

## Gerar JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Build

```bash
npm run build
```

## Executar em desenvolvimento

```bash
npm run start:dev
```

## Testes

```bash
npm run test
```