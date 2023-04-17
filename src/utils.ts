export function getTierNode(width: number, buffer: number) {
  let id = 1,
   posX = 0
  return function() {
    const node = {
      id: `tier${id}`,
      data: { label: `Tier ${id}` },
      position: {x: posX, y: 40},
      type: 'tierGroup'
    }
    id++
    posX += width + buffer
    return node
  }
}

function getNodeType(tier: number) {
  switch(tier) {
    case 1:
      return 'input'
    case 3:
      return 'output'
    default:
      return 'default'
  }
}

export function getRuleNode(node: any, pos: {x: number, y: number}) {
  return {
    id: node.id,
    data: {
      label: node.rule.metadata.name,
      nodeType: getNodeType(node.tier),
      tier: node.tier,
      ...node.rule
    },
    position: {
      x: pos.x,
      y: pos.y
    },
    parentNode: `tier${node.tier}`,
    extent: 'parent',
    type: 'ruleNode'
  }
}