import { JSX } from "preact";
import type { Signal } from "@preact/signals";

interface LanguageSelectorProps {
  id: string;
  label?: string;
  value: Signal<string>;
  languages: { code: string; name: string }[];
  props?: JSX.HTMLAttributes<HTMLDivElement>
}

export default function LanguageSelector(
  { id, label, value, languages, props }: LanguageSelectorProps,
) {
  return (
    <div {...props}>
      <label for={id} class="my-2 font-bold">{label}</label>
      <select
        id={id}
        value={value}
        class="w-full p-2 border-2 border-gray-500 rounded bg-white hover:bg-gray-100 transition-colors"
      >
        {languages.map((language) => (
          <option value={language.code}>{language.name}</option>
        ))}
      </select>
    </div>
  );
}
