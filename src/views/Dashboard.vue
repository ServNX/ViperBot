<template>
  <div>
    <dashboard-layout>
      <statistics></statistics>
    </dashboard-layout>
  </div>
</template>

<script>
  import DashboardLayout from '../components/DashboardLayout';
  import Statistics from '../components/Statistics';

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
