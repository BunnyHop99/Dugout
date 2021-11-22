var cssChangeTarget,
    watchedElems,
    config2 = {
      selector: '.color-me', // This is the CSS selector who what to watch as the page is scrolled.
      dataAttr: 'color',
      dataAttr2: 'color2', // This is the data attribute to read. Don't use the "data-" portion. E.g. use "color" not "data-color", etc.
      targetElem: '#page-wrapper', // This element gets its CSS changed.
			cssProp: 'backgroundColor',
            cssProp2: 'color', // Which CSS property gets changed. Use JS style not CSS style. E.g. use "backgroundColor" not "background-color", etc.
      threshold: 1, // 1.0 = 100% in view,
			enableWillChange: true, // Advanced use only. Enabling may improve performance. See https://developer.mozilla.org/en-US/docs/Web/CSS/will-change
			willChangeProp: 'background' // Advanced use only. Because 'will-change: background-color' is invalid. 
    };

// Set things up.
window.addEventListener("load", function(event) {
    cssChangeTarget = document.querySelector(config2.targetElem);
		if (config2.enableWillChange) cssChangeTarget.style.willChange = config2.willChangeProp;
    watchedElems = document.querySelectorAll(config2.selector);
    createObserver();
  }, false);

function createObserver() {
  var observer;

  var options = {
    root: null,
    rootMargin: "0px",
    threshold: config2.threshold
  };

  observer = new IntersectionObserver(handleIntersect, options);
  
  watchedElems.forEach(elem => {
    observer.observe(elem);
  });
}

function handleIntersect(entries, observer) {
  entries.forEach(function(entry) {
    var newValue = entry.target.dataset[config2.dataAttr];
    cssChangeTarget.style[config2.cssProp] = newValue;
    var newValue2 = entry.target.dataset[config2.dataAttr2];
    cssChangeTarget.style[config2.cssProp2] = newValue2;
  });
}