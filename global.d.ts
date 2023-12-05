/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="esnext" />

declare interface String {
  match_overlap: (regexp: RegExp) => RegExpExecArray[] | null;
}
