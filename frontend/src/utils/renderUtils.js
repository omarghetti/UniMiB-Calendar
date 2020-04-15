export function renderWhenReady(isReady, placeholder, content) {
  return isReady ? content : placeholder;
}
