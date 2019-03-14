<template>
  <div>
    <dashboard-layout>
      <statistics></statistics>
    </dashboard-layout>
  </div>
</template>

<script>
  import DashboardLayout from '../layouts/DashboardLayout';
  import Statistics from './Statistics';

  export default {
    name: 'dashboard',
    components: {
      DashboardLayout,
      Statistics,
    },
    data() {
      return {
        comp: Statistics,
      };
    },
  };
</script>
