<template>
  <div class="w-full">
    <LineChartCard
      :label="label"
      :compound-tooltip="true"
      :chart-type="'line'"
      :value-unit="props.valueUnit"
      :measures="[measure]"
      :configurators="configurators"
      :skip-zero-values="false"
      trigger="item"
    />
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted } from "vue"
import { dimensionConfigurator } from "../configurators/DimensionConfigurator"
import { ServerConfigurator } from "../configurators/ServerConfigurator"
import { configuratorListKey } from "../injectionKeys"
import LineChartCard from "./LineChartCard.vue"

const props = withDefaults(defineProps<{
  label: string
  measure: string
  projects: Array<string>
  serverConfigurator: ServerConfigurator
  valueUnit?: "ns"|"ms"
}>(), {
  valueUnit: "ms"
})
const providedConfigurators = inject(configuratorListKey, null)
if (providedConfigurators == null) {
  throw new Error("`dataQueryExecutor` is not provided")
}
const scenarioConfigurator = dimensionConfigurator("project", props.serverConfigurator, null, true)
const configurators = [...providedConfigurators, scenarioConfigurator]
onMounted(() => {
  scenarioConfigurator.selected.value = props.projects
})
</script>
