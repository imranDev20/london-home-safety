import * as React from "react"
import { SVGProps } from "react"
const EngineerIcon = (props:SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    fill="currentColor"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      d="M24.752 10.025a.993.993 0 0 0-.031-.246A8.969 8.969 0 0 0 20 3.967V6a1 1 0 1 1-2 0V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3a1 1 0 0 1-2 0V3.967A8.968 8.968 0 0 0 7.279 9.78a.835.835 0 0 0-.024.246A1.497 1.497 0 0 0 7.5 13h17a1.497 1.497 0 0 0 .252-2.975zM23 15H9v1c0 1.91.77 3.64 2.013 4.904-.003.033-.013.063-.013.096v1.684l4.975 2.21L21 22.383V21c0-.033-.01-.063-.013-.096A6.975 6.975 0 0 0 23 16z"
      data-original="#000000"
    />
    <path
      d="M10 30h12v-5.882l-5.553 2.777a1 1 0 0 1-.853.019L10 24.427zm-2-5.888a10.815 10.815 0 0 0-5.832 4.333A1 1 0 0 0 3 30h5zm21.832 4.333A10.815 10.815 0 0 0 24 24.112V30h5a1 1 0 0 0 .832-1.555z"
      data-original="#000000"
    />
  </svg>
)
export default EngineerIcon
