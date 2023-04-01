export default function scrollTo(node: HTMLAnchorElement) {
  const handleClick = (event: MouseEvent) => {
    event.preventDefault();

    const href = node.href.split('#')[1];
    const target = document.querySelector(`#${href}`);
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  node.addEventListener('click', handleClick);
  return {
    destroy() {
      node.removeEventListener('click', handleClick);
    },
  };
}
