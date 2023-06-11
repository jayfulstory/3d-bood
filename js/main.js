const leaflet = document.querySelector('.leaflet');
// const page = document.querySelector('.page');

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

leaflet.addEventListener('click', e => {
  let pageEle = getTarget(e.target, 'page');
  if (pageEle) {
    pageEle.classList.add('page-filpped');
  }
});
