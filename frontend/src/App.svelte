<script module="ts">
   import { onMount } from 'svelte';
 
 let date = new Date();
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
  12: "December"
 }
 const DAYS = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday"
 }
 $: dayOfWeek = `${DAYS[date.getDay()]}`;
 $: dateString = `${MONTH[date.getMonth() + 1]} ${date.getDate()}, ${date.getFullYear()}`;
//  $: hour = date.getHours();
//  $: min = date.getMinutes();
//  $: sec = date.getSeconds();

 $: time = date.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

 
 onMount( () => {
   const interval = setInterval(() => {
     date = new Date();
   }, 1000);
   return () => clearInterval(interval);
 });
</script>

<main>
  <div class="absolute top-5 right-5 flex flex-col justify-center items-end">
    <!-- <div class="text-5xl font-bold">
      {hour}:{min < 10 ? '0' :''}{min}<span class="text-surface-300 font-mono text-lg">:{sec < 10 ? '0' :''}{sec}</span>
    </div> -->
    <div class="text-4xl font-bold">
      {time}
    </div>
    <div class="text-surface-400">
      {dateString}
    </div>
    <div class="text-surface-400">
      {dayOfWeek}
    </div>
  </div>
</main>
