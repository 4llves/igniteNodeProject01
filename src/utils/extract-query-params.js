export function extractQueryParams(query) {
  // search=Alves&page=2 => ['search=Alves', 'page=2']
  return query.substr(1).split('&').reduce((queryParams, param) => {
    // ['search', 'Alves'] ['page', '2']
    const [key, value] = param.split('=')

    queryParams[key] = value

    return queryParams
  }, {})
}