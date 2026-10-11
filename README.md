# Marcus Valério · Portfólio

Site estático em português e inglês. Sem framework e sem etapa de build: o Vercel publica a pasta como está.

## Estrutura

```
index.html      página única; textos em pares <span data-l="pt"> / <span data-l="en">
styles.css      identidade: Fluid Blue #C5D6EB, Off white #F5F4F0, Charcoal #202124
main.js         troca de idioma, revelações, cursor quadrado, filmes e contato
films/          filmes dos projetos (mp4 e webm) com pôsteres
work/           telas estáticas
motion/         animação do rodapé
fonts/          Anton, Instrument Sans, Instrument Serif e Space Mono (SIL OFL 1.1)
```

## Editar um texto

Cada frase aparece duas vezes, uma por idioma. Edite as duas:

```html
<span data-l="pt">Ver projetos</span><span data-l="en">See the work</span>
```

## Publicar

No Vercel: Add New Project, importe este repositório e mantenha as configurações padrão
(Framework Preset: Other, sem comando de build). Depois do primeiro deploy, troque
`/og.png` no `<head>` pelo endereço completo do site para a prévia aparecer nas redes.
