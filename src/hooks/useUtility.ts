

const toTargetUrlWithNewWindow = (url: string) => {
  window.open(url)
}

/**
 * 
 * @param {string} param   目标参数
 * 
 */

const getURLParam = (param: string) => {
  const paramArray = window.location.search.split('&').filter(item => {
    return item.indexOf(param) !== -1;
  })
  if (paramArray.length === 0) {
    return ''
  }
  return decodeURIComponent(paramArray[0].split('=')[1])
}

export {
  toTargetUrlWithNewWindow,
  getURLParam
}
