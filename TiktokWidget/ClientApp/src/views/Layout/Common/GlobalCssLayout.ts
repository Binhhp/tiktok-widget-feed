import { createGlobalStyle } from "styled-components";
export default createGlobalStyle`
@font-face {
  font-family: "SF Pro Display"; 
  src: url("//db.onlinewebfonts.com/t/0b51833ff62e4af8acb5fd3e2bf59e97.eot"); 
  src: url("//db.onlinewebfonts.com/t/0b51833ff62e4af8acb5fd3e2bf59e97.eot?#iefix") format("embedded-opentype"), 
  url("//db.onlinewebfonts.com/t/0b51833ff62e4af8acb5fd3e2bf59e97.woff2") format("woff2"), 
  url("//db.onlinewebfonts.com/t/0b51833ff62e4af8acb5fd3e2bf59e97.woff") format("woff"), 
  url("//db.onlinewebfonts.com/t/0b51833ff62e4af8acb5fd3e2bf59e97.ttf") format("truetype"), 
  url("//db.onlinewebfonts.com/t/0b51833ff62e4af8acb5fd3e2bf59e97.svg#SF Pro Display") format("svg"); 
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

//Image onload
.img-loading {
  opacity: 0;
  transition: .15s opacity ease-in-out;
}

.img-loaded {
  opacity: 1;
  transition: .15s opacity ease-in-out;
}

.img-fill-loading {
  filter: blur(10px);
  clip-path: inset(0);
  min-width: 53vh;
}

.img-fill-loaded {
  filter: blur(0px);
  transition: filter 0.5s linear;
}
`;
