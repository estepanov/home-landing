<script lang="ts">

  export let date = new Date()
  const MONTH = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  }
  $: dateString = `${MONTH[date.getMonth() + 1]} ${date.getDate()}, ${date.getFullYear()}`

</script>

<div class="text-on-primary-token text-md font-bold">
    {dateString}
</div>