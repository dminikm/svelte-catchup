export async function load({ locals }) {
  console.log('Bruh: ', locals);
  return {
    user: locals.user,
  };
}
