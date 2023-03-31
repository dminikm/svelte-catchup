<script>
  import { setAuthContext } from '$lib/authContext';
  import '../app.css';

  setAuthContext();
</script>

<slot />
