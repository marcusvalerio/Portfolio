# Marcus Valério · Portfólio

Site estático em português e inglês. Sem framework e sem etapa de build: o Vercel publica a pasta como está.
No ar em https://marcusvalerio.vercel.app

## Sistema visual

* **Cores:** azul #0117FF, off white #F5F4F0, grafite #202124
* **Tipografia:** Geist para interface e texto, DM Sans para o nome
* **Espaçamento:** grade de 8px; seções com 80 a 144px de respiro
* **Botões pill:** Primary (fundo azul), Outline (borda de 2px azul) e Inverse (fundo grafite)

## Estrutura

```
index.html      página única; textos em pares <span data-l="pt"> / <span data-l="en">
styles.css      tokens, escala tipográfica, botões e layout
main.js         troca de idioma, revelações, filmes e contato
films/          filmes dos projetos (mp4 e webm) com pôsteres
work/           telas estáticas
motion/         animação do rodapé
fonts/          Geist e DM Sans (SIL OFL 1.1)
```

## Editar um texto

Cada frase aparece duas vezes, uma por idioma. Edite as duas:

```html
<span data-l="pt">Ver projetos</span><span data-l="en">See the work</span>
```
