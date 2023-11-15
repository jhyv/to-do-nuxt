<template>
  <div class="task-chip">
    <div class="task-chip-label">
      {{ label }}
    </div>
    <div class="task-chip-badge">{{ total }}</div>
  </div>
</template>

<script lang="ts" setup>
const { label, total } = defineProps({
  label: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
})
</script>

<style scoped>
.task-chip {
  padding: 4px 3px;
  background-color: #1d62ff;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 80px;
  height: 30px;
}

.task-chip .task-chip-label {
  color: #fff;
  padding: 0 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  flex-grow: 1;
}

.task-chip .task-chip-badge {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #222;
  font-size: 12px;
  font-weight: bold;
}
</style>

