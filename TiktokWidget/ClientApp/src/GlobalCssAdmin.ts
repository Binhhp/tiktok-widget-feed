import { createGlobalStyle } from "styled-components";
import FontUrlDisplay2 from "assets/fonts/SFProDisplay-Regular2.ttf";
import FontUrl from "assets/fonts/SFProText-Regular.ttf";
import FontPoppinsUrl from "assets/fonts/Poppins-Regular.ttf";
import FontLatoUrl from "assets/fonts/Lato-Regular.ttf";
import JostUrl from "assets/fonts/Jost.ttf";

export default createGlobalStyle`
    @font-face {
  font-family: "SF Pro Display";
  src: local("SF Pro Display"),
    url(${FontUrlDisplay2})
      format("truetype");
}
@font-face {
  font-family: "Jost";
  src: local("Jost"),
    url(${JostUrl})
      format("truetype");
}
@font-face {
  font-family: "SF Pro Text";
  src: local("SF Pro Text"),
    url(${FontUrl})
      format("truetype");
}
@font-face {
  font-family: "Poppins";
  src: local("Poppins"),
    url(${FontPoppinsUrl})
      format("truetype");
}
@font-face {
  font-family: "Lato";
  src: local("Lato"),
    url(${FontLatoUrl})
      format("truetype");
}
html,
body {
  font-family: "SF Pro Display";
  font-style: normal;
}
div[p-color-scheme="light"] {
  height: 100%;
}
#orichi-root {
  width: 100%;
  height: 100%;
}
#btn-delete:not(.Polaris-Button--loading){
  background: #E70000 !important;
}
.Polaris-Modal-Header--titleHidden{
  display: none;
}
.swiper-container {
  width: 100%;
  margin-left: 0px !important;
  margin-right: 0px !important;
}
.Polaris-Image--isLoading{
  background: transparent !important;
}
#feedback-submit{
  background: #FF0B53;
}
#feedback-submit.Polaris-Button--loading{
  background: var(--p-action-primary-disabled)
}
#btn-save-onboarding{
  background: #FB447A;
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
#orichi-root{
  width: 100%;
  min-height: 100%;
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

.img-loading {
  opacity: 0;
  transition: .15s opacity ease-in-out;
}

.img-loaded {
  opacity: 1;
  transition: .15s opacity ease-in-out;
}
#btn-need-help-table{
  cursor: pointer;
  text-decoration-line: underline;
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  margin-left: 11px;
}
.Polaris-Modal-Footer__FooterContent{
  position: relative;
}
.modal-title-store{
  font-family: 'SF Pro Display';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
}


.dragging {
  filter: drop-shadow(-4px 5px 10px rgba(38, 38, 38, 0.21));
  border: 1px solid rgba(79, 76, 76, 0.63) !important;
}
.check-video .Polaris-Choice__Control {
  margin: 0px;
  z-index: 9999;
}
.check-video  span.Polaris-Checkbox__Backdrop::before {
  background-color: #fb447a;
}
.video-item {
  z-index: 999;
  cursor: pointer;
  .video-item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 11px 10px 11px 10px;
    height: 50px;
  }
  background: #ffffff;
  border: 1px solid #e4e4e4;
  border-radius: 10px;
  height: 100%;
  .video-item-image {
    width: 100%;
    img {
      display: block;
      width: 100%;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      object-fit: cover;
      height: 100%;
    }
  }
}
`;
