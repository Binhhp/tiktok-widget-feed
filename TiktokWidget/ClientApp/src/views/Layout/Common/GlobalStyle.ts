import { createGlobalStyle } from "styled-components";
export default createGlobalStyle`
    @font-face {
  font-family: "SF Pro Display";
  font-style: normal;
  font-weight: 400;
  src: local("SF Pro Display"),
    url("https://fonts.cdnfonts.com/s/59278/SFPRODISPLAYREGULAR.woff")
      format("woff");
}
@font-face {
  font-family: "SF Pro Display";
  font-style: italic;
  font-weight: 100;
  src: local("SF Pro Display"),
    url("https://fonts.cdnfonts.com/s/59278/SFPRODISPLAYULTRALIGHTITALIC.woff")
      format("woff");
}
@font-face {
  font-family: "SF Pro Display";
  font-style: italic;
  font-weight: 200;
  src: local("SF Pro Display"),
    url("https://fonts.cdnfonts.com/s/59278/SFPRODISPLAYTHINITALIC.woff")
      format("woff");
}
@font-face {
  font-family: "SF Pro Display";
  font-style: italic;
  font-weight: 300;
  src: local("SF Pro Display"),
    url("https://fonts.cdnfonts.com/s/59278/SFPRODISPLAYLIGHTITALIC.woff")
      format("woff");
}
@font-face {
  font-family: "SF Pro Display";
  font-style: normal;
  font-weight: 500;
  src: local("SF Pro Display"),
    url("https://fonts.cdnfonts.com/s/59278/SFPRODISPLAYMEDIUM.woff")
      format("woff");
}
@font-face {
  font-family: "SF Pro Display";
  font-style: italic;
  font-weight: 600;
  src: local("SF Pro Display"),
    url("https://fonts.cdnfonts.com/s/59278/SFPRODISPLAYSEMIBOLDITALIC.woff")
      format("woff");
}
@font-face {
  font-family: "SF Pro Display";
  font-style: normal;
  font-weight: 700;
  src: local("SF Pro Display"),
    url("https://fonts.cdnfonts.com/s/59278/SFPRODISPLAYBOLD.woff")
      format("woff");
}
@font-face {
  font-family: "SF Pro Display";
  font-style: italic;
  font-weight: 800;
  src: local("SF Pro Display"),
    url("https://fonts.cdnfonts.com/s/59278/SFPRODISPLAYHEAVYITALIC.woff")
      format("woff");
}
@font-face {
  font-family: "SF Pro Display";
  font-style: italic;
  font-weight: 900;
  src: local("SF Pro Display"),
    url("https://fonts.cdnfonts.com/s/59278/SFPRODISPLAYBLACKITALIC.woff")
      format("woff");
}

html,
body {
  font-family: "SF Pro Display";
  font-style: normal;
  height: auto !important;
}
div[p-color-scheme="light"] {
  height: 100%;
}
#orichi-root {
  width: 100%;
}
.swiper-container {
  width: 100%;
  margin-left: 0px !important;
  margin-right: 0px !important;
}
.Polaris-Image--isLoading{
  background: transparent !important;
}

.img-loading{
  filter: blur(10px);
  clip-path: inset(0);
}

.img-loaded{
  filter: blur(0px);
  transition: filter 0.5s linear;
}
html {
    --scrollbarBG: #ffffff;
    --thumbBG: gray;
}
body::-webkit-scrollbar {
  width: 14px;
}
body {
  background-color: #ffffff;
  scrollbar-width: thin;
  scrollbar-color: var(--thumbBG) var(--scrollbarBG);
}
::-webkit-scrollbar-track {
  background: var(--scrollbarBG);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: var(--thumbBG) ;
  border: 3px solid var(--scrollbarBG);
}
@keyframes react-loading-skeleton {
    100% {
        transform: translateX(100%);
    }
}

.react-loading-skeleton {
    --base-color: #ebebeb;
    --highlight-color: #f5f5f5;
    --animation-duration: 1.5s;
    --animation-direction: normal;
    --pseudo-element-display: block; /* Enable animation */

    background-color: var(--base-color);

    width: 100%;
    border-radius: 0.25rem;
    display: inline-flex;
    line-height: 1;

    position: relative;
    overflow: hidden;
    z-index: 1; /* Necessary for overflow: hidden to work correctly in Safari */
}

.react-loading-skeleton::after {
    content: ' ';
    display: var(--pseudo-element-display);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background-repeat: no-repeat;
    background-image: linear-gradient(
        90deg,
        var(--base-color),
        var(--highlight-color),
        var(--base-color)
    );
    transform: translateX(-100%);

    animation-name: react-loading-skeleton;
    animation-direction: var(--animation-direction);
    animation-duration: var(--animation-duration);
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
}

`;
