'use strict';

/******************************************
Treehouse Techdegree:
FSJS project 4 - OOP Game Show App
Reinhard Liess, 2019
******************************************/

// wrapper class to use animate.css
// adapted from https://github.com/daneden/animate.css
class AnimateCss {
  constructor() {}
  
  /** 
    * Animates DOM node via animate.css 
    * @param (DOMelement) node - The node to animate
    * @param (string) animationName - The name of the animation as defined in animate.css
    * @param (function) [callback] - Callback function to be executed when the animation has ended
  */ 
  animateNode(node, animationName, callback) {
    node.classList.add('animated', animationName);
    
    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') {
          callback();
        }
    }
    node.addEventListener('animationend', handleAnimationEnd)
  }
  
  /** 
    * Animates HTML element via animate.css 
    * @param (HTMLselector) selector - The CSS selector to animate
    * @param (string) animationName - The name of the animation as defined in animate.css
    * @param (function) [callback] - Callback function to be executed when the animation as ended
  */ 
  animateElement(selector, animationName, callback) {
    const node = document.querySelector(selector);
    this.animateNode(node, animationName, callback);
  }
}