import { JSX } from "preact";
import type { Signal } from "@preact/signals";

interface TranslationAreaProps {
  id: string;
  label?: string;
  value: Signal<string>;
  placeholder: string;
  readonly: boolean;
  rows: number;
  props?: JSX.HTMLAttributes<HTMLDivElement>;
}

export default function TranslationArea(
  { id, label, value, placeholder, readonly, rows, props }:
    TranslationAreaProps,
) {
  return (
    <div {...props}>
      <label for={id} class="my-2 font-bold">{label}</label>
      <textarea
        id={id}
        label={label}
        value={value}
        placeholder={placeholder}
        readonly={readonly}
        rows={rows}
        onInput={(e) => {
          value.value = e.currentTarget.value;
        }}
        class="w-full h-full border-2 border-gray-500 rounded transition-colors resize-none"
      />
    </div>
  );
}
