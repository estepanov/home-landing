<script lang="ts">
  export let date = new Date()

  const DAYS = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  }
  $: dayOfWeek = DAYS[date.getDay()]
</script>

<div class="text-token text-sm">
  {dayOfWeek}
</div>
