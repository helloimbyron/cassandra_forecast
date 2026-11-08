export function BrandMark() {
  return (
    <svg className="brand-symbol" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path className="brand-symbol-arc" d="M23.5 8.5a10 10 0 1 0 0 15" strokeLinecap="round" />
      <path
        className="brand-symbol-line"
        d="M13 20l5-8 4 5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle className="brand-symbol-point" cx="23.5" cy="8.5" r="2.5" />
    </svg>
  );
}
