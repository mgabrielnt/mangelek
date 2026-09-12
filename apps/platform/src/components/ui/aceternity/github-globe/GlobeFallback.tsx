export function GlobeFallback() {
  return <svg className="globeFallback" viewBox="0 0 300 300" fill="none" aria-hidden="true">
    <circle cx="150" cy="150" r="126" fill="#152225" stroke="#9fbaa5" strokeOpacity=".6" />
    {[40, 82, 118].map((radius) => <ellipse key={radius} cx="150" cy="150"
      rx={radius} ry="126" stroke="#8aab99" strokeOpacity=".3" />)}
    {[40, 82, 118].map((radius) => <ellipse key={radius} cx="150" cy="150"
      rx="126" ry={radius} stroke="#8aab99" strokeOpacity=".25" />)}
    <path d="M 68 165 Q 158 25 245 138 M 245 138 Q 145 265 87 218"
      stroke="#d0ad72" strokeWidth="1.2" />
    <circle cx="245" cy="138" r="4" fill="#dac197" />
    <circle cx="68" cy="165" r="3" fill="#c2d2bf" />
    <circle cx="87" cy="218" r="3" fill="#c2d2bf" />
  </svg>;
}
