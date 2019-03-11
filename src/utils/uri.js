function getUrlVars () {
  const vars = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
    vars[key] = value;
  });
  return vars;
}

function getUrlParam (parameter, value) {
  let param = value;
  if (window.location.href.indexOf(parameter) > -1) {
    param = getUrlVars()[parameter];
  }
  return param;
}

export {
  getUrlVars,
  getUrlParam,
};
