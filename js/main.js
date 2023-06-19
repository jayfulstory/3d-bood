const leaflet = document.querySelector('.leaflet');
const pageElems = document.querySelectorAll('.page');
let pageCount = 0;
let currentMenu;

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
  const dy = innerHeight / 2 - (rect.y + rect.height / 2);

  let angle;

  switch (elem.parentNode.parentNode.parentNode.dataset.page * 1) {
    case 1:
      angle = -30;
      break;
    case 2:
      angle = 0;
      break;
    case 3:
      angle = 30;
      break;
  }

  document.body.classList.add('zoomIn');
  leaflet.style.transform = `translate3d(${dx}px, ${dy}px, 50vw) rotateY(${angle}deg`;
  currentMenu = elem;
  currentMenu.classList.add('current-menu');
}

function zoomOut() {
  leaflet.style.transform = 'translate3d(0,0,0)';
  if (currentMenu) {
    document.body.classList.remove('zoomIn');
    currentMenu.classList.remove('current-menu');
    currentMenu = null;
  }
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
    zoomOut();
  }

  let menuItemElem = getTarget(e.target, 'menu-item');
  if (menuItemElem) {
    if (!document.body.classList.contains('zoomIn')) {
      zoomIn(menuItemElem);
    }
  }

  let backBtn = getTarget(e.target, 'back-btn');
  if (backBtn) {
    console.log(backBtn);
    zoomOut();
  }
});

const hand = document.querySelector('.hand');
const handPos = {
  x: 0,
  y: 0,
};
const targetPos = {
  x: 0,
  y: 0,
};

function render() {
  distX = targetPos.x - handPos.x;
  distY = targetPos.y - handPos.y;
  handPos.x = handPos.x + distX * 0.1;
  handPos.y = handPos.y + distY * 0.1;

  hand.style.transform = `translate(${handPos.x}px, ${handPos.y}px)`;
  requestAnimationFrame(render);
}
render();

// window.addEventListener('mousemove', e => {
//   targetPos.x = e.client.x;
//   targetPos.y = e.clientY;
//   hand.style.transform = `translate(${e.clientX - 50}px, ${e.clientY}px)`;
// });
