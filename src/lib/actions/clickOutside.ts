export default function clickOutside(node: HTMLElement, handler: () => void) {
  const handleClick = (event: Event) => {
    if (!node.contains(event.target as any)) {
      handler();
    }
  };

  document.addEventListener('click', handleClick);
  return {
    destroy() {
      document.removeEventListener('click', handleClick);
    },
  };
}
