<script>
  import Button from '$lib/Button.svelte';
  import Form from '$lib/Form.svelte';
</script>

<Form id="logout" method="POST" action="/logout">
  <Button color="error" submit>Log Out</Button>
</Form>
