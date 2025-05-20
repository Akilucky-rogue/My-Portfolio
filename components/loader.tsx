export function Loader({ text = "Loading..." }) {
  return (
    <div className="loader">
      <div className="loader-spinner" />
      <span className="loader-text">{text}</span>
    </div>
  )
}
