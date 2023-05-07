<script>
  import Button from '$lib/Button.svelte';
</script>

<form id="logout" method="POST" action="/logout">
  <Button color="error" submit>Log Out</Button>
</form>
