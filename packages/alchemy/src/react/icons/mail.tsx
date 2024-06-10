import type { SVGProps } from "react";

// eslint-disable-next-line jsdoc/require-jsdoc
export const MailIcon = ({
  fill = "currentColor",
  ...props
}: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg
    className="fill-fg-primary disabled:fill-fg-disabled"
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill={fill}
      fillRule="evenodd"
      d="M1.335 2.705 9 8.07l7.665-5.365a1.048 1.048 0 0 0-.998-.747H2.333c-.469 0-.87.317-.998.747ZM16.708 4.2l-7.35 5.145a.625.625 0 0 1-.716 0L1.292 4.2V13c0 .572.47 1.042 1.041 1.042h13.334c.571 0 1.041-.47 1.041-1.042V4.2ZM.042 3A2.297 2.297 0 0 1 2.333.708h13.334A2.297 2.297 0 0 1 17.958 3v10a2.297 2.297 0 0 1-2.291 2.292H2.333A2.297 2.297 0 0 1 .042 13V3Z"
      clipRule="evenodd"
    />
  </svg>
);

// eslint-disable-next-line jsdoc/require-jsdoc
export const MailIllustration = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      opacity="0.4"
      d="M15.8706 13.4766L26.5437 24.1941C27.4295 25.0836 28.825 25.2118 29.8581 24.4985L44.9388 14.0852C45.2237 14.5957 45.34 15.2074 45.2189 15.8371L41.8908 33.1432C41.6557 34.3654 40.5862 35.2489 39.3416 35.2489H14.3428C12.7125 35.2489 11.4857 33.7637 11.7936 32.1627L15.1217 14.8566C15.2261 14.3139 15.495 13.838 15.8706 13.4766Z"
      fill="#363FF9"
    />
    <path
      d="M18.88 12.8L27.6271 21.5837C28.1731 22.1319 29.0333 22.2109 29.67 21.7713L42.6623 12.8H18.88Z"
      fill="#363FF9"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.3999 15.2C2.3999 14.7582 2.75807 14.4 3.1999 14.4H10.555C10.9968 14.4 11.355 14.7582 11.355 15.2C11.355 15.6419 10.9968 16 10.555 16H3.1999C2.75807 16 2.3999 15.6419 2.3999 15.2Z"
      fill="#363FF9"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.06514 18.7265L9.68963 18.7265C10.1315 18.7265 10.4896 19.0847 10.4896 19.5265C10.4896 19.9683 10.1315 20.3265 9.68963 20.3265L4.06514 20.3265C3.62331 20.3265 3.26514 19.9683 3.26514 19.5265C3.26514 19.0847 3.62331 18.7265 4.06514 18.7265Z"
      fill="#363FF9"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.93057 23.0531L8.82444 23.0531C9.26627 23.0531 9.62444 23.4112 9.62444 23.8531C9.62444 24.2949 9.26627 24.6531 8.82444 24.6531L4.93057 24.6531C4.48874 24.6531 4.13057 24.2949 4.13057 23.8531C4.13057 23.4113 4.48874 23.0531 4.93057 23.0531Z"
      fill="#363FF9"
    />
  </svg>
);
