export function itemAction(e: React.KeyboardEvent<HTMLDivElement>) {
  const target = e.currentTarget as HTMLElement;
  if (target !== null) {
    if (e.key === "ArrowDown" && target.nextSibling !== null) {
      (target.nextSibling as HTMLDivElement)?.focus();
    } else if (e.key === "ArrowUp" && target.previousSibling !== null) {
      (target.previousSibling as HTMLElement)?.focus();
    } else if (e.key === "Enter") {
      target.click();
    }
  }
}
