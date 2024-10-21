<script lang="ts" setup>
import './assets/index.less'
import { h, nextTick, ref } from 'vue'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import { VueFlow, useVueFlow, type Node, type Edge } from '@vue-flow/core'
import CustomNode from './CustomNode.vue'
import CustomEdge from './CustomEdge.vue'
import { useLayout } from './useLayout'

const { onConnect, addEdges } = useVueFlow()

const nodes = ref<Node[]>([
  { id: 'start', type: 'input', label: '开始', position: { x: 250, y: 5 } },
  { id: '2', type: 'custom', label: '圈定条件1', position: { x: 100, y: 100 } },
  { id: '3', type: 'custom', label: '圈定条件2', position: { x: 400, y: 100 } },
  { id: '4', type: 'custom', label: '圈定条件3', position: { x: 400, y: 100 } },
  { id: 'end', type: 'custom', label: '结束', position: { x: 400, y: 100 } },
])

const edges = ref<Edge[]>([
  // { id: 'e1-2', source: '1', target: '2', type: 'custom', markerEnd: 'arrow' },
  { id: 'estart-2', source: 'start', target: '2', markerEnd: 'arrow' },
  { id: 'e2-3', source: '2', target: '3', label: '未命中', markerEnd: 'arrow' },
  { id: 'e2-end', source: '2', target: 'end', label: '命中', markerEnd: 'arrow' },

  { id: 'e3-4', source: '3', target: '4', label: '未命中', markerEnd: 'arrow' },
  { id: 'e3-end', source: '3', target: 'end', label: '命中', markerEnd: 'arrow' },
  { id: 'e4-end', source: '4', target: 'end', label: '命中', markerEnd: 'arrow' },
])

onConnect((params) => {
  addEdges([params])
})

const { graph, layout, previousDirection } = useLayout()

const { fitView } = useVueFlow()

async function layoutGraph(direction: string) {
  await stop()

  // reset(nodes.value)

  nodes.value = layout(nodes.value, edges.value, direction)

  nextTick(() => {
    fitView()
  })
}
</script>

<template>
  <div style="height: 100vh">
    <VueFlow
      v-model:nodes="nodes"
      v-model:edges="edges"
      fit-view-on-init
      class="vue-flow-basic-example"
      :default-zoom="1.5"
      :min-zoom="0.2"
      :max-zoom="4"
      @nodes-initialized="layoutGraph('LR')"
    >
      <Background pattern-color="#aaa" :gap="8" />

      <MiniMap />

      <Controls />

      <template #node-custom="nodeProps">
        <CustomNode v-bind="nodeProps" />
      </template>

      <template #edge-custom="edgeProps">
        <CustomEdge v-bind="edgeProps" />
      </template>
    </VueFlow>
  </div>
</template>
