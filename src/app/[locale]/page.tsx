import { redirect } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/pages";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleIndexPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/getting-started`);
}
