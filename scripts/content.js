/* content.js - copyright 2023, Austin David France <adf@sorcerer.co.uk> */

function FloatingUrl() {
  const div = this.div = document.createElement('div');

  const trimUrl = url => {
    url = url.replace(/%20/g, ' ');
    if (url.length < 100) return url;
    return url.substr(0,100) + '...';
  }

  const setPos = pos => {
    div.style.left = div.style.top = div.style.right = div.style.bottom = 'auto';
    div.style.position = 'fixed';
    switch(pos) {
      case 'bottom-left':
        div.style.bottom = 0;
        div.style.left = 0;
        break;
      case 'bottom-right':
        div.style.bottom = 0;
        div.style.right = 0;
        break;
    }
    return pos;
  }

  const setTheme = c => {
    switch(c) {
      case 'white':
        div.style.backgroundColor = 'rgba(255,255,255,0.3)';
        div.style.color = 'rgba(0,0,0,0.8)';
        div.style.border = '1px solid rgba(0,0,0,0.5)';
        break;
      case 'black':
        div.style.backgroundColor = 'rgba(0,0,0,0.3)';
        div.style.color = 'rgb(0,0,0,0.8)';
        div.style.border = '1px solid rgb(0,0,0,0.5)';
        break;
    }
    return c;
  };

  const addEventListeners = () => {
    div.addEventListener('mouseover', e => {
      if (!e.shiftKey) {
        switch(this.pos) {
          case 'bottom-left':
            this.pos = setPos('bottom-right');
            break;
          case 'bottom-right':
            this.pos = setPos('bottom-left');
            break;
        }
      }
      e.preventDefault();
    });
    div.addEventListener('click', e => {
      window.open(div.textContent);
      e.preventDefault();
    });
  };

  const setText = text => div.textContent = trimUrl(text);

  this.pos = setPos('bottom-right');
  div.id = 'showUrlFloater';
  div.style.bottom = 0;
  div.style.fontFamily = 'monospace';
  div.style.fontSize = '9px';
  this.currentTheme = setTheme('white');
  div.style.zIndex = 1000000000;
  div.style.margin = '5px';
  div.style.padding = '2px';
  div.style.borderRadius = '2px';
  div.style.boxShadow = '0px 0px 10px 0px rgba(0,0,0,0.1)';
  div.style.userSelect = 'none';
  div.style.lineHeight = '1em';

  setText(location.href);

  setTimeout(() => {
    document.body.appendChild(div)
    addEventListeners();
  }, 1000);

  navigation.addEventListener("navigate", e => {
    setText(e.destination.url);
  });

  return this;
}

FloatingUrl();
