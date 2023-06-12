const leaflet = document.querySelector('.leaflet');
const pageElems = document.querySelectorAll('.page');
let pageCount = 0;

function getTarget(ele, className) {
  while (!ele.classList.contains(className)) {
    ele = ele.parentNode;
    if (ele.nodeName == 'BODY') {
      ele = null;
      return;
    }
  }
  return ele;
}

function closeLeaflet() {
  pageCount = 0;
  document.body.classList.remove('leaflet-opened');
  pageElems[2].classList.remove('page-flipped');
  setTimeout(() => {
    pageElems[0].classList.remove('page-flipped');
  }, 500);
}

function zoomIn(elem) {
  const rect = elem.getBoundingClientRect();
  const dx = innerWidth / 2 - (rect.x + rect.width / 2);
  const dy = innerHeight / 2 - (rect.x + rect.height / 2);
  leaflet.style.transform = `translate3d(${dx}px, ${dy}px, 50vw)`;
  console.log(leaflet);
}

leaflet.addEventListener('click', e => {
  let pageEle = getTarget(e.target, 'page');
  if (pageEle) {
    pageEle.classList.add('page-flipped');
    pageCount++;
    if (pageCount === 2) {
      document.body.classList.add('leaflet-opened');
    }
  }
  let closeBtnEle = getTarget(e.target, 'close-btn');
  if (closeBtnEle) {
    closeLeaflet();
  }
  let menuItemElem = getTarget(e.target, 'menu-item');
  if (menuItemElem) {
    zoomIn(menuItemElem);
  }
});
