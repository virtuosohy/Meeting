<script setup>

</script>

<template>

</template>

<style scoped lang="scss">

</style>
<template>
  <div>
    <div>{{ firstItem }}</div>
    <div>{{ secondItem }}</div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  setup() {
    const arrs = ref([
      { "HYMC": "20240723", "PX": "1", "a": "未开始" },
      { "HYMC": "20240723", "PX": "2", "a": "未开始" },
      { "HYMC": "测试编号是否正常", "PX": "1", "a": "未开始" },
      { "HYMC": "测试编号是否正常", "PX": "2", "a": "未开始" }
    ]);

    const groupedArrs = computed(() => {
      const groups = {};
      arrs.value.forEach(item => {
        if (!groups[item.HYMC]) {
          groups[item.HYMC] = [];
        }
        groups[item.HYMC].push(item);
      });

      for (const key in groups) {
        groups[key].sort((a, b) => parseInt(a.PX) - parseInt(b.PX));
      }

      return groups;
    });

    const firstItem = computed(() => {
      for (const key in groupedArrs.value) {
        const firstGroup = groupedArrs.value[key];
        if (firstGroup.length > 0) {
          return firstGroup[0].a;
        }
      }
      return '';
    });

    const secondItem = computed(() => {
      for (const key in groupedArrs.value) {
        const firstGroup = groupedArrs.value[key];
        if (firstGroup.length > 1) {
          return firstGroup[1].a;
        }
      }
      return '';
    });

    return {
      firstItem,
      secondItem
    };
  }
};
</script>
