export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatDate(iso: string) {
  return dateFormatter.format(new Date(`${iso}T12:00:00`));
}

export function pad(n: number) {
  return String(n).padStart(2, "0");
}
