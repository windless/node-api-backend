
export default async function pagingEdges(Model, pagingInput, {where, sort}) {
  let query = Model.find(where)
  if (sort) {
    query = query.sort(sort)
  }
  let allModels = await query.exec()
  let edges = allModels.map((it) => {
    return {
      node: it.toObject(),
      cursor: it.cursor,
    }
  })

  edges = applyCursorsToEdges(edges, pagingInput)

  return {
    edges: edgesToReturn(edges, pagingInput),
    pageInfo: {
      hasPreviousPage: hasPreviousPage(edges, pagingInput.last),
      hasNextPage: hasNextPage(edges, pagingInput.first)
    },
    count: null,
  }
}

function applyCursorsToEdges(edges, {before, after}) {
  if (after) {
    let index = edges.findIndex((it) => it.cursor === after)
    if (index !== -1) {
      return edges.slice(index + 1)
    }
  }
  if (before) {
    let index = edges.findIndex((it) => it.cursor === before)
    if (index !== -1) {
      return edges.slice(0, index)
    }
  }
  return edges
}

function edgesToReturn(edges, {first, last}) {
  if (first) {
    if (first < 0) {
      throw new Error('first 不能小于 0')
    }
    if (edges.length > first) {
      return edges.slice(0, first)
    }
  }
  if (last) {
    if (last < 0 ) {
      throw new Error('last 不能小于 0')
    }
    if (edges.length > last) {
      return edges.slice(-last)
    }
  }

  return edges
}

function hasPreviousPage(edges, last) {
  if (last) {
    return edges.length > last
  }
  return false
}

function hasNextPage(edges, first) {
  if (first) {
    return edges.length > first
  }
  return false
}
