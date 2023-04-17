import { getRuleNode, getTierNode } from "./utils"

const groupNodes = [
  {
    id: 'ingress',
    data: { label: 'ingress' },
    position: {x: 0, y: 0},
    type: 'workloadGroupIdentifier'
  },
  {
    id: 'non-ingress',
    data: { label: 'non-ingress' },
    position: {x: 330, y: 0},
    type: 'workloadGroupIdentifier'
  },
  {
    id: 'tier1',
    data: { label: 'Tier 1' },
    position: {x: 0, y: 40},
    type: 'tierGroup'
  },
  {
    id: 'rule1',
    data: { label: 'Node 1', nodeType: 'input' },
    position: {x: 60, y: 80},
    type: 'ruleNode'
  },
  {
    id: 'rule2',
    data: { label: 'Node 2', nodeType: 'input' },
    position: {x: 60, y: 160},
    type: 'ruleNode'
  },
  {
    id: 'rule3',
    data: { label: 'Node 3', nodeType: 'input' },
    position: {x: 60, y: 240},
    type: 'ruleNode'
  },
  {
    id: 'rule4',
    data: { label: 'Node 4', nodeType: 'input' },
    position: {x: 60, y: 320},
    type: 'ruleNode'
  },
  {
    id: 'tier2',
    data: { label: 'Tier 2' },
    position: {x: 330, y: 40},
    type: 'tierGroup'
  },
  {
    id: 'rule5',
    data: { label: 'Node 5', nodeType: 'default' },
    position: {x: 390, y: 80}, // 330 + 60
    type: 'ruleNode'
  },
  {
    id: 'rule6',
    data: { label: 'Node 6', nodeType: 'default' },
    position: {x: 390, y: 160}, // 330 + 60
    type: 'ruleNode'
  },
  {
    id: 'tier3',
    data: { label: 'Tier 3' },
    position: {x: 660, y: 40}, // 330 + 300 + 30
    type: 'tierGroup'
  },
  {
    id: 'rule7',
    data: { label: 'Node 7', nodeType: 'output' },
    position: {x: 720, y: 80}, // x = 660 + 60, y = y + 40
    type: 'ruleNode'
  },
  {
    id: 'rule8',
    data: { label: 'Node 8', nodeType: 'output' },
    position: {x: 720, y: 160},
    type: 'ruleNode'
  }
]

const groupNodeWidth = 300
const groupNodeHeight = 600

const ruleNodeWidth = 100, ruleNodeHeight = 40, ruleNodeGap = 30

export function transformNodes(nodes: any[]) {
  const createTierNode = getTierNode(groupNodeWidth, 60)
  const tier1Nodes = [createTierNode()], 
    tier2Nodes = [createTierNode()], 
    tier3Nodes = [createTierNode()]
  let startX = 100, startY = 80

  // Tier 1 nodes creation
  nodes.filter(node => node.tier === 1).forEach((node, i) => {
    
    tier1Nodes.push(
      getRuleNode(node, {
        x: startX,
        y: startY + (i * 80)
      })
    )
  })

  // Tier 2 nodes creation
  nodes.filter(node => node.tier === 2).forEach((node, i) => {
    tier2Nodes.push(
      getRuleNode(node, {
        x: startX,
        y: startY + (i * 80)
      })
    )
  })

  // Tier 3 nodes creation
  nodes.filter(node => node.tier === 3).forEach((node, i) => {
    tier3Nodes.push(
      getRuleNode(node, {
        x: startX,
        y: startY + (i * 80)
      })
    )
  })
  return [{
    id: 'ingress',
    data: { label: 'ingress' },
    position: {x: 0, y: 0},
    type: 'workloadGroupIdentifier'
  },
  {
    id: 'non-ingress',
    data: { label: 'non-ingress' },
    position: {x: 330, y: 0},
    type: 'workloadGroupIdentifier'
  }].concat(tier1Nodes, tier2Nodes, tier3Nodes)
}
