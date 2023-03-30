const CIRCLE_ICONS = {
  1: ({ background, color }) => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='11.25'
        fill={background}
        stroke={color}
        strokeWidth='1.5'
      />
      <path
        d='M11.7231 17.1001H12.8711C12.9691 17.1001 13.0111 17.0581 13.0111 16.9601V7.4401C13.0111 7.3421 12.9691 7.3001 12.8711 7.3001H12.2271C12.1431 7.3001 12.0871 7.3281 12.0171 7.3701L9.72113 8.6161C9.63713 8.6581 9.56713 8.7281 9.56713 8.8261V10.0441C9.56713 10.1421 9.60913 10.1701 9.67913 10.1701C9.72113 10.1701 9.76313 10.1561 9.81913 10.1281L11.5831 9.1481V16.9601C11.5831 17.0581 11.6251 17.1001 11.7231 17.1001Z'
        fill={color}
      />
    </svg>
  ),
  '1*': ({ background, color }) => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='11.25'
        fill={background}
        stroke={color}
        strokeWidth='1.5'
        strokeDasharray='3 3'
      />
      <path
        d='M11.7231 17.1001H12.8711C12.9691 17.1001 13.0111 17.0581 13.0111 16.9601V7.4401C13.0111 7.3421 12.9691 7.3001 12.8711 7.3001H12.2271C12.1431 7.3001 12.0871 7.3281 12.0171 7.3701L9.72113 8.6161C9.63713 8.6581 9.56713 8.7281 9.56713 8.8261V10.0441C9.56713 10.1421 9.60913 10.1701 9.67913 10.1701C9.72113 10.1701 9.76313 10.1561 9.81913 10.1281L11.5831 9.1481V16.9601C11.5831 17.0581 11.6251 17.1001 11.7231 17.1001Z'
        fill={color}
      />
    </svg>
  ),
  2: ({ background, color }) => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='11.25'
        fill={background}
        stroke={color}
        strokeWidth='1.5'
      />
      <path
        d='M8.81913 16.7998H15.1611C15.2591 16.7998 15.3011 16.7578 15.3011 16.6598V15.5818C15.3011 15.4838 15.2591 15.4418 15.1611 15.4418H10.7931L13.6071 12.7678C14.5451 11.8858 15.0071 11.0598 15.0071 9.7858C15.0071 8.0778 13.8031 6.8598 11.8851 6.8598C9.92513 6.8598 8.70713 8.2878 8.69313 9.9258C8.69313 10.0798 8.76313 10.1358 8.86113 10.1358H9.91113C10.0371 10.1358 10.0931 10.0938 10.0931 9.9258C10.1351 8.9318 10.7931 8.2178 11.8851 8.2178C12.9351 8.2178 13.5931 8.8898 13.5931 9.8418C13.5931 10.5698 13.3551 11.1998 12.6551 11.8718L8.83313 15.4978C8.73513 15.5818 8.67913 15.6798 8.67913 15.8198V16.6598C8.67913 16.7578 8.72113 16.7998 8.81913 16.7998Z'
        fill={color}
      />
    </svg>
  ),
  3: ({ background, color }) => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='11.25'
        fill={background}
        stroke={color}
        strokeWidth='1.5'
      />
      <path
        d='M11.9551 17.14C13.9851 17.14 15.3991 16.02 15.3991 14.144C15.3991 12.716 14.5731 12.016 13.8171 11.708C14.5591 11.232 14.9651 10.56 14.9651 9.566C14.9651 8.082 13.6911 7.06 11.9411 7.06C10.3311 7.06 8.98713 8.138 8.86113 9.762C8.84713 9.944 8.94513 10.014 9.05713 10.014H10.0791C10.1911 10.014 10.2471 10 10.2611 9.846C10.3871 8.922 11.1011 8.418 11.9691 8.418C12.8931 8.418 13.5791 8.894 13.5791 9.706C13.5791 10.574 13.0331 11.092 11.8851 11.092H11.1431C11.0451 11.092 10.9891 11.134 10.9891 11.246V12.31C10.9891 12.422 11.0311 12.464 11.1431 12.464H11.9411C13.2571 12.464 13.9711 13.052 13.9711 14.046C13.9711 15.222 13.1311 15.782 11.9971 15.782C10.9051 15.782 10.0511 15.18 9.92513 13.976C9.91113 13.822 9.84113 13.794 9.72913 13.794H8.70713C8.60913 13.794 8.51113 13.85 8.52513 14.046C8.65113 15.922 10.0371 17.14 11.9551 17.14Z'
        fill={color}
      />
    </svg>
  ),
  4: ({ background, color }) => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='11.25'
        fill={background}
        stroke={color}
        strokeWidth='1.5'
      />
      <path
        d='M12.5471 16.7998H13.6671C13.7791 16.7998 13.8211 16.7578 13.8211 16.6598V14.9658H15.2071C15.3051 14.9658 15.3471 14.9238 15.3471 14.8258V13.7478C15.3471 13.6498 15.3051 13.6078 15.2071 13.6078H13.8211V7.1398C13.8211 7.0418 13.7791 6.9998 13.6811 6.9998H12.8131C12.7291 6.9998 12.6731 7.0418 12.6311 7.1118L8.17913 13.7198C8.10913 13.8178 8.06713 13.9018 8.06713 14.0418V14.8258C8.06713 14.9238 8.10913 14.9658 8.20713 14.9658H12.4071V16.6598C12.4071 16.7578 12.4491 16.7998 12.5471 16.7998ZM9.77513 13.6078L12.4071 9.7158V13.6078H9.77513Z'
        fill={color}
      />
    </svg>
  ),
  '4*': ({ background, color }) => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='11.25'
        fill={background}
        stroke={color}
        stroke-width='1.5'
        stroke-dasharray='3 3'
      />
      <path
        d='M12.544 16.7998H13.664C13.776 16.7998 13.818 16.7578 13.818 16.6598V14.9658H15.204C15.302 14.9658 15.344 14.9238 15.344 14.8258V13.7478C15.344 13.6498 15.302 13.6078 15.204 13.6078H13.818V7.1398C13.818 7.0418 13.776 6.9998 13.678 6.9998H12.81C12.726 6.9998 12.67 7.0418 12.628 7.1118L8.17601 13.7198C8.10601 13.8178 8.06401 13.9018 8.06401 14.0418V14.8258C8.06401 14.9238 8.10601 14.9658 8.20401 14.9658H12.404V16.6598C12.404 16.7578 12.446 16.7998 12.544 16.7998ZM9.77201 13.6078L12.404 9.7158V13.6078H9.77201Z'
        fill={color}
      />
    </svg>
  ),
  5: ({ background, color }) => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='11.25'
        fill={background}
        stroke={color}
        strokeWidth='1.5'
      />
      <path
        d='M12.0284 17.2401C13.9464 17.2401 15.4444 16.1061 15.4444 13.8941C15.4444 11.8081 14.2264 10.6041 12.3224 10.6041C11.4824 10.6041 10.8244 10.8421 10.2364 11.2061L10.6004 8.6581H14.7864C14.8844 8.6581 14.9264 8.6161 14.9264 8.5181V7.4401C14.9264 7.3421 14.8844 7.3001 14.7864 7.3001H9.46644C9.36844 7.3001 9.34044 7.3421 9.32644 7.4401L8.72444 12.7041C8.71044 12.7881 8.76644 12.8441 8.85044 12.8441H9.85844C9.97044 12.8441 10.0264 12.7881 10.0964 12.7181C10.6704 12.2141 11.2864 11.9621 12.0424 11.9621C13.2744 11.9621 14.0304 12.7181 14.0304 13.9221C14.0304 15.1681 13.2604 15.8821 12.0704 15.8821C11.0344 15.8821 10.2504 15.2801 10.0684 14.2861C10.0404 14.1181 9.99844 14.0761 9.88644 14.0761H8.82244C8.72444 14.0761 8.65444 14.1321 8.65444 14.3001C8.79444 16.0641 10.0964 17.2401 12.0284 17.2401Z'
        fill={color}
      />
    </svg>
  ),
  '5*': ({ background, color }) => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='11.25'
        fill={background}
        stroke={color}
        strokeWidth='1.5'
        strokeDasharray='3 3'
      />
      <path
        d='M12.0284 17.2401C13.9464 17.2401 15.4444 16.1061 15.4444 13.8941C15.4444 11.8081 14.2264 10.6041 12.3224 10.6041C11.4824 10.6041 10.8244 10.8421 10.2364 11.2061L10.6004 8.6581H14.7864C14.8844 8.6581 14.9264 8.6161 14.9264 8.5181V7.4401C14.9264 7.3421 14.8844 7.3001 14.7864 7.3001H9.46644C9.36844 7.3001 9.34044 7.3421 9.32644 7.4401L8.72444 12.7041C8.71044 12.7881 8.76644 12.8441 8.85044 12.8441H9.85844C9.97044 12.8441 10.0264 12.7881 10.0964 12.7181C10.6704 12.2141 11.2864 11.9621 12.0424 11.9621C13.2744 11.9621 14.0304 12.7181 14.0304 13.9221C14.0304 15.1681 13.2604 15.8821 12.0704 15.8821C11.0344 15.8821 10.2504 15.2801 10.0684 14.2861C10.0404 14.1181 9.99844 14.0761 9.88644 14.0761H8.82244C8.72444 14.0761 8.65444 14.1321 8.65444 14.3001C8.79444 16.0641 10.0964 17.2401 12.0284 17.2401Z'
        fill={color}
      />
    </svg>
  ),
  6: ({ background, color }) => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='11.25'
        fill={background}
        stroke={color}
        strokeWidth='1.5'
      />
      <path
        d='M12.0389 17.14C13.7889 17.14 15.4129 15.95 15.4129 13.906C15.4129 11.862 14.0409 10.672 12.2209 10.672C11.3809 10.672 10.5549 10.952 9.93888 11.54C10.0789 9.23 10.9889 8.39 12.0669 8.39C12.8089 8.39 13.4809 8.698 13.7469 9.594C13.7749 9.678 13.8029 9.734 13.9009 9.734H15.0069C15.0909 9.734 15.1749 9.706 15.1609 9.594C14.9649 8.068 13.7609 7.06 12.0669 7.06C9.95288 7.06 8.45488 8.768 8.45488 12.534C8.45488 15.894 10.0649 17.14 12.0389 17.14ZM12.0669 15.782C10.8909 15.782 10.1489 15.012 10.1489 13.906C10.1489 12.8 10.8909 12.03 12.0669 12.03C13.2569 12.03 13.9989 12.8 13.9989 13.906C13.9989 15.012 13.2569 15.782 12.0669 15.782Z'
        fill={color}
      />
    </svg>
  ),
  '6*': ({ background, color }) => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='11.25'
        fill={background}
        stroke={color}
        strokeWidth='1.5'
        strokeDasharray='3 3'
      />
      <path
        d='M12.0389 17.14C13.7889 17.14 15.4129 15.95 15.4129 13.906C15.4129 11.862 14.0409 10.672 12.2209 10.672C11.3809 10.672 10.5549 10.952 9.93888 11.54C10.0789 9.23 10.9889 8.39 12.0669 8.39C12.8089 8.39 13.4809 8.698 13.7469 9.594C13.7749 9.678 13.8029 9.734 13.9009 9.734H15.0069C15.0909 9.734 15.1749 9.706 15.1609 9.594C14.9649 8.068 13.7609 7.06 12.0669 7.06C9.95288 7.06 8.45488 8.768 8.45488 12.534C8.45488 15.894 10.0649 17.14 12.0389 17.14ZM12.0669 15.782C10.8909 15.782 10.1489 15.012 10.1489 13.906C10.1489 12.8 10.8909 12.03 12.0669 12.03C13.2569 12.03 13.9989 12.8 13.9989 13.906C13.9989 15.012 13.2569 15.782 12.0669 15.782Z'
        fill={color}
      />
    </svg>
  ),
  7: ({ background, color }) => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='11.25'
        fill={background}
        stroke={color}
        strokeWidth='1.5'
      />
      <path
        d='M10.39 17.2998H11.538C11.608 17.2998 11.664 17.2718 11.692 17.2018L14.996 8.7878C15.052 8.6338 15.066 8.5638 15.066 8.4378V7.6398C15.066 7.5418 15.024 7.4998 14.926 7.4998H8.766C8.668 7.4998 8.626 7.5418 8.626 7.6398V8.7178C8.626 8.8158 8.668 8.8578 8.766 8.8578H13.512L10.292 17.0898C10.278 17.1318 10.264 17.1598 10.264 17.2018C10.264 17.2578 10.306 17.2998 10.39 17.2998Z'
        fill={color}
      />
    </svg>
  ),
  '7*': ({ background, color }) => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='11.25'
        fill={background}
        stroke={color}
        strokeWidth='1.5'
        strokeDasharray='3 3'
      />
      <path
        d='M10.39 17.2998H11.538C11.608 17.2998 11.664 17.2718 11.692 17.2018L14.996 8.7878C15.052 8.6338 15.066 8.5638 15.066 8.4378V7.6398C15.066 7.5418 15.024 7.4998 14.926 7.4998H8.766C8.668 7.4998 8.626 7.5418 8.626 7.6398V8.7178C8.626 8.8158 8.668 8.8578 8.766 8.8578H13.512L10.292 17.0898C10.278 17.1318 10.264 17.1598 10.264 17.2018C10.264 17.2578 10.306 17.2998 10.39 17.2998Z'
        fill={color}
      />
    </svg>
  ),
  8: ({ background, color }) => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='11.25'
        fill={background}
        stroke={color}
        strokeWidth='1.5'
      />
      <path
        d='M12.1371 17.14C14.1111 17.14 15.4551 15.88 15.4551 14.158C15.4551 12.912 14.7971 12.226 14.0271 11.792C14.6711 11.344 15.1471 10.672 15.1471 9.72C15.1471 8.026 13.7331 7.06 12.1371 7.06C10.5411 7.06 9.12712 8.026 9.12712 9.72C9.12712 10.672 9.60313 11.344 10.2471 11.792C9.47713 12.226 8.81913 12.912 8.81913 14.158C8.81913 15.88 10.1631 17.14 12.1371 17.14ZM12.1371 11.176C11.1431 11.176 10.4991 10.616 10.4991 9.776C10.4991 8.894 11.1991 8.404 12.1371 8.404C13.0751 8.404 13.7751 8.894 13.7751 9.776C13.7751 10.616 13.1311 11.176 12.1371 11.176ZM12.1371 15.782C11.0171 15.782 10.2471 15.18 10.2471 14.158C10.2471 13.122 11.0171 12.52 12.1371 12.52C13.2571 12.52 14.0271 13.122 14.0271 14.158C14.0271 15.18 13.2571 15.782 12.1371 15.782Z'
        fill={color}
      />
    </svg>
  ),
  '8*': ({ background, color }) => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='11.25'
        fill={background}
        stroke={color}
        strokeWidth='1.5'
        strokeDasharray='3 3'
      />
      <path
        d='M12.1371 17.14C14.1111 17.14 15.4551 15.88 15.4551 14.158C15.4551 12.912 14.7971 12.226 14.0271 11.792C14.6711 11.344 15.1471 10.672 15.1471 9.72C15.1471 8.026 13.7331 7.06 12.1371 7.06C10.5411 7.06 9.12712 8.026 9.12712 9.72C9.12712 10.672 9.60313 11.344 10.2471 11.792C9.47713 12.226 8.81913 12.912 8.81913 14.158C8.81913 15.88 10.1631 17.14 12.1371 17.14ZM12.1371 11.176C11.1431 11.176 10.4991 10.616 10.4991 9.776C10.4991 8.894 11.1991 8.404 12.1371 8.404C13.0751 8.404 13.7751 8.894 13.7751 9.776C13.7751 10.616 13.1311 11.176 12.1371 11.176ZM12.1371 15.782C11.0171 15.782 10.2471 15.18 10.2471 14.158C10.2471 13.122 11.0171 12.52 12.1371 12.52C13.2571 12.52 14.0271 13.122 14.0271 14.158C14.0271 15.18 13.2571 15.782 12.1371 15.782Z'
        fill={color}
      />
    </svg>
  ),
  9: ({ background, color }) => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='11.25'
        fill={background}
        stroke={color}
        strokeWidth='1.5'
      />
      <path
        d='M11.934 17.14C14.048 17.14 15.546 15.432 15.546 11.666C15.546 8.306 13.936 7.06 11.962 7.06C10.212 7.06 8.588 8.25 8.588 10.294C8.588 12.338 9.96 13.528 11.78 13.528C12.62 13.528 13.446 13.248 14.062 12.66C13.922 14.97 13.012 15.81 11.934 15.81C11.192 15.81 10.52 15.502 10.254 14.606C10.226 14.522 10.198 14.466 10.1 14.466H8.994C8.896 14.466 8.812 14.48 8.84 14.634C9.064 16.146 10.24 17.14 11.934 17.14ZM11.934 12.17C10.744 12.17 10.002 11.4 10.002 10.294C10.002 9.188 10.744 8.418 11.934 8.418C13.11 8.418 13.852 9.188 13.852 10.294C13.852 11.4 13.11 12.17 11.934 12.17Z'
        fill={color}
      />
    </svg>
  ),
  10: ({ background, color }) => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='11.25'
        fill={background}
        stroke={color}
        strokeWidth='1.5'
      />
      <path
        d='M7.62156 17H8.76956C8.86756 17 8.90956 16.958 8.90956 16.86V7.34C8.90956 7.242 8.86756 7.2 8.76956 7.2H8.12556C8.04156 7.2 7.98556 7.228 7.91556 7.27L5.61956 8.516C5.53556 8.558 5.46556 8.628 5.46556 8.726V9.944C5.46556 10.042 5.50756 10.07 5.57756 10.07C5.61956 10.07 5.66156 10.056 5.71756 10.028L7.48156 9.048V16.86C7.48156 16.958 7.52356 17 7.62156 17ZM14.5158 17.14C16.6018 17.14 18.2958 15.432 18.2958 12.1C18.2958 8.768 16.6018 7.06 14.5158 7.06C12.4298 7.06 10.7358 8.768 10.7358 12.1C10.7358 15.432 12.4298 17.14 14.5158 17.14ZM14.5158 15.782C13.2138 15.782 12.1778 14.816 12.1778 12.1C12.1778 9.384 13.2138 8.418 14.5158 8.418C15.8178 8.418 16.8538 9.384 16.8538 12.1C16.8538 14.816 15.8178 15.782 14.5158 15.782Z'
        fill={color}
      />
    </svg>
  ),
  '10*': ({ background, color }) => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='11.25'
        fill={background}
        stroke={color}
        strokeWidth='1.5'
        strokeDasharray='3 3'
      />
      <path
        d='M7.52 17H8.668C8.766 17 8.808 16.958 8.808 16.86V7.34C8.808 7.242 8.766 7.2 8.668 7.2H8.024C7.94 7.2 7.884 7.228 7.814 7.27L5.518 8.516C5.434 8.558 5.364 8.628 5.364 8.726V9.944C5.364 10.042 5.406 10.07 5.476 10.07C5.518 10.07 5.56 10.056 5.616 10.028L7.38 9.048V16.86C7.38 16.958 7.422 17 7.52 17ZM14.4142 17.14C16.5002 17.14 18.1942 15.432 18.1942 12.1C18.1942 8.768 16.5002 7.06 14.4142 7.06C12.3282 7.06 10.6342 8.768 10.6342 12.1C10.6342 15.432 12.3282 17.14 14.4142 17.14ZM14.4142 15.782C13.1122 15.782 12.0762 14.816 12.0762 12.1C12.0762 9.384 13.1122 8.418 14.4142 8.418C15.7162 8.418 16.7522 9.384 16.7522 12.1C16.7522 14.816 15.7162 15.782 14.4142 15.782Z'
        fill={color}
      />
    </svg>
  ),
  11: ({ background, color }) => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='11.25'
        fill={background}
        stroke={color}
        strokeWidth='1.5'
      />
      <path
        d='M9.52 17H10.668C10.766 17 10.808 16.958 10.808 16.86V7.34C10.808 7.242 10.766 7.2 10.668 7.2H10.024C9.94 7.2 9.884 7.228 9.814 7.27L7.518 8.516C7.434 8.558 7.364 8.628 7.364 8.726V9.944C7.364 10.042 7.406 10.07 7.476 10.07C7.518 10.07 7.56 10.056 7.616 10.028L9.38 9.048V16.86C9.38 16.958 9.422 17 9.52 17ZM14.5102 17H15.6582C15.7562 17 15.7982 16.958 15.7982 16.86V7.34C15.7982 7.242 15.7562 7.2 15.6582 7.2H15.0142C14.9302 7.2 14.8742 7.228 14.8042 7.27L12.5082 8.516C12.4242 8.558 12.3542 8.628 12.3542 8.726V9.944C12.3542 10.042 12.3962 10.07 12.4662 10.07C12.5082 10.07 12.5502 10.056 12.6062 10.028L14.3702 9.048V16.86C14.3702 16.958 14.4122 17 14.5102 17Z'
        fill={color}
      />
    </svg>
  ),
  '11*': ({ background, color }) => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='11.25'
        fill={background}
        stroke={color}
        strokeWidth='1.5'
        strokeDasharray='3 3'
      />
      <path
        d='M9.52 17H10.668C10.766 17 10.808 16.958 10.808 16.86V7.34C10.808 7.242 10.766 7.2 10.668 7.2H10.024C9.94 7.2 9.884 7.228 9.814 7.27L7.518 8.516C7.434 8.558 7.364 8.628 7.364 8.726V9.944C7.364 10.042 7.406 10.07 7.476 10.07C7.518 10.07 7.56 10.056 7.616 10.028L9.38 9.048V16.86C9.38 16.958 9.422 17 9.52 17ZM14.5102 17H15.6582C15.7562 17 15.7982 16.958 15.7982 16.86V7.34C15.7982 7.242 15.7562 7.2 15.6582 7.2H15.0142C14.9302 7.2 14.8742 7.228 14.8042 7.27L12.5082 8.516C12.4242 8.558 12.3542 8.628 12.3542 8.726V9.944C12.3542 10.042 12.3962 10.07 12.4662 10.07C12.5082 10.07 12.5502 10.056 12.6062 10.028L14.3702 9.048V16.86C14.3702 16.958 14.4122 17 14.5102 17Z'
        fill={color}
      />
    </svg>
  ),
  12: ({ background, color }) => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='11.25'
        fill={background}
        stroke={color}
        strokeWidth='1.5'
      />
      <path
        d='M8.02 16.8999H9.168C9.266 16.8999 9.308 16.8579 9.308 16.7599V7.2399C9.308 7.1419 9.266 7.0999 9.168 7.0999H8.524C8.44 7.0999 8.384 7.1279 8.314 7.1699L6.018 8.4159C5.934 8.4579 5.864 8.5279 5.864 8.6259V9.8439C5.864 9.9419 5.906 9.9699 5.976 9.9699C6.018 9.9699 6.06 9.9559 6.116 9.9279L7.88 8.9479V16.7599C7.88 16.8579 7.922 16.8999 8.02 16.8999ZM11.1062 16.8999H17.4482C17.5462 16.8999 17.5882 16.8579 17.5882 16.7599V15.6819C17.5882 15.5839 17.5462 15.5419 17.4482 15.5419H13.0802L15.8942 12.8679C16.8322 11.9859 17.2942 11.1599 17.2942 9.8859C17.2942 8.1779 16.0902 6.9599 14.1722 6.9599C12.2122 6.9599 10.9942 8.3879 10.9802 10.0259C10.9802 10.1799 11.0502 10.2359 11.1482 10.2359H12.1982C12.3242 10.2359 12.3802 10.1939 12.3802 10.0259C12.4222 9.0319 13.0802 8.3179 14.1722 8.3179C15.2222 8.3179 15.8802 8.9899 15.8802 9.9419C15.8802 10.6699 15.6422 11.2999 14.9422 11.9719L11.1202 15.5979C11.0222 15.6819 10.9662 15.7799 10.9662 15.9199V16.7599C10.9662 16.8579 11.0082 16.8999 11.1062 16.8999Z'
        fill={color}
      />
    </svg>
  ),
  '12*': ({ background, color }) => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='11.25'
        fill={background}
        stroke={color}
        strokeWidth='1.5'
        strokeDasharray='3 3'
      />
      <path
        d='M8.02 16.8999H9.168C9.266 16.8999 9.308 16.8579 9.308 16.7599V7.2399C9.308 7.1419 9.266 7.0999 9.168 7.0999H8.524C8.44 7.0999 8.384 7.1279 8.314 7.1699L6.018 8.4159C5.934 8.4579 5.864 8.5279 5.864 8.6259V9.8439C5.864 9.9419 5.906 9.9699 5.976 9.9699C6.018 9.9699 6.06 9.9559 6.116 9.9279L7.88 8.9479V16.7599C7.88 16.8579 7.922 16.8999 8.02 16.8999ZM11.1062 16.8999H17.4482C17.5462 16.8999 17.5882 16.8579 17.5882 16.7599V15.6819C17.5882 15.5839 17.5462 15.5419 17.4482 15.5419H13.0802L15.8942 12.8679C16.8322 11.9859 17.2942 11.1599 17.2942 9.8859C17.2942 8.1779 16.0902 6.9599 14.1722 6.9599C12.2122 6.9599 10.9942 8.3879 10.9802 10.0259C10.9802 10.1799 11.0502 10.2359 11.1482 10.2359H12.1982C12.3242 10.2359 12.3802 10.1939 12.3802 10.0259C12.4222 9.0319 13.0802 8.3179 14.1722 8.3179C15.2222 8.3179 15.8802 8.9899 15.8802 9.9419C15.8802 10.6699 15.6422 11.2999 14.9422 11.9719L11.1202 15.5979C11.0222 15.6819 10.9662 15.7799 10.9662 15.9199V16.7599C10.9662 16.8579 11.0082 16.8999 11.1062 16.8999Z'
        fill={color}
      />
    </svg>
  ),
  13: ({ background, color }) => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='11.25'
        fill={background}
        stroke={color}
        strokeWidth='1.5'
      />
      <path
        d='M8.02 17H9.168C9.266 17 9.308 16.958 9.308 16.86V7.34C9.308 7.242 9.266 7.2 9.168 7.2H8.524C8.44 7.2 8.384 7.228 8.314 7.27L6.018 8.516C5.934 8.558 5.864 8.628 5.864 8.726V9.944C5.864 10.042 5.906 10.07 5.976 10.07C6.018 10.07 6.06 10.056 6.116 10.028L7.88 9.048V16.86C7.88 16.958 7.922 17 8.02 17ZM14.2422 17.14C16.2722 17.14 17.6862 16.02 17.6862 14.144C17.6862 12.716 16.8602 12.016 16.1042 11.708C16.8462 11.232 17.2522 10.56 17.2522 9.566C17.2522 8.082 15.9782 7.06 14.2282 7.06C12.6182 7.06 11.2742 8.138 11.1482 9.762C11.1342 9.944 11.2322 10.014 11.3442 10.014H12.3662C12.4782 10.014 12.5342 10 12.5482 9.846C12.6742 8.922 13.3882 8.418 14.2562 8.418C15.1802 8.418 15.8662 8.894 15.8662 9.706C15.8662 10.574 15.3202 11.092 14.1722 11.092H13.4302C13.3322 11.092 13.2762 11.134 13.2762 11.246V12.31C13.2762 12.422 13.3182 12.464 13.4302 12.464H14.2282C15.5442 12.464 16.2582 13.052 16.2582 14.046C16.2582 15.222 15.4182 15.782 14.2842 15.782C13.1922 15.782 12.3382 15.18 12.2122 13.976C12.1982 13.822 12.1282 13.794 12.0162 13.794H10.9942C10.8962 13.794 10.7982 13.85 10.8122 14.046C10.9382 15.922 12.3242 17.14 14.2422 17.14Z'
        fill={color}
      />
    </svg>
  ),
  '13*': ({ background, color }) => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='11.25'
        fill={background}
        stroke={color}
        strokeWidth='1.5'
        strokeDasharray='3 3'
      />
      <path
        d='M8.02 17H9.168C9.266 17 9.308 16.958 9.308 16.86V7.34C9.308 7.242 9.266 7.2 9.168 7.2H8.524C8.44 7.2 8.384 7.228 8.314 7.27L6.018 8.516C5.934 8.558 5.864 8.628 5.864 8.726V9.944C5.864 10.042 5.906 10.07 5.976 10.07C6.018 10.07 6.06 10.056 6.116 10.028L7.88 9.048V16.86C7.88 16.958 7.922 17 8.02 17ZM14.2422 17.14C16.2722 17.14 17.6862 16.02 17.6862 14.144C17.6862 12.716 16.8602 12.016 16.1042 11.708C16.8462 11.232 17.2522 10.56 17.2522 9.566C17.2522 8.082 15.9782 7.06 14.2282 7.06C12.6182 7.06 11.2742 8.138 11.1482 9.762C11.1342 9.944 11.2322 10.014 11.3442 10.014H12.3662C12.4782 10.014 12.5342 10 12.5482 9.846C12.6742 8.922 13.3882 8.418 14.2562 8.418C15.1802 8.418 15.8662 8.894 15.8662 9.706C15.8662 10.574 15.3202 11.092 14.1722 11.092H13.4302C13.3322 11.092 13.2762 11.134 13.2762 11.246V12.31C13.2762 12.422 13.3182 12.464 13.4302 12.464H14.2282C15.5442 12.464 16.2582 13.052 16.2582 14.046C16.2582 15.222 15.4182 15.782 14.2842 15.782C13.1922 15.782 12.3382 15.18 12.2122 13.976C12.1982 13.822 12.1282 13.794 12.0162 13.794H10.9942C10.8962 13.794 10.7982 13.85 10.8122 14.046C10.9382 15.922 12.3242 17.14 14.2422 17.14Z'
        fill={color}
      />
    </svg>
  ),
  14: ({ background, color }) => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='11.25'
        fill={background}
        stroke={color}
        strokeWidth='1.5'
      />
      <path
        d='M8.12156 17H9.26956C9.36756 17 9.40956 16.958 9.40956 16.86V7.34C9.40956 7.242 9.36756 7.2 9.26956 7.2H8.62556C8.54156 7.2 8.48556 7.228 8.41556 7.27L6.11956 8.516C6.03556 8.558 5.96556 8.628 5.96556 8.726V9.944C5.96556 10.042 6.00756 10.07 6.07756 10.07C6.11956 10.07 6.16156 10.056 6.21756 10.028L7.98156 9.048V16.86C7.98156 16.958 8.02356 17 8.12156 17ZM15.4358 17H16.5558C16.6678 17 16.7098 16.958 16.7098 16.86V15.166H18.0958C18.1938 15.166 18.2358 15.124 18.2358 15.026V13.948C18.2358 13.85 18.1938 13.808 18.0958 13.808H16.7098V7.34C16.7098 7.242 16.6678 7.2 16.5698 7.2H15.7018C15.6178 7.2 15.5618 7.242 15.5198 7.312L11.0678 13.92C10.9978 14.018 10.9558 14.102 10.9558 14.242V15.026C10.9558 15.124 10.9978 15.166 11.0958 15.166H15.2958V16.86C15.2958 16.958 15.3378 17 15.4358 17ZM12.6638 13.808L15.2958 9.916V13.808H12.6638Z'
        fill={color}
      />
    </svg>
  ),
  15: ({ background, color }) => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='11.25'
        fill={background}
        stroke={color}
        strokeWidth='1.5'
      />
      <path
        d='M8.02 17H9.168C9.266 17 9.308 16.958 9.308 16.86V7.34C9.308 7.242 9.266 7.2 9.168 7.2H8.524C8.44 7.2 8.384 7.228 8.314 7.27L6.018 8.516C5.934 8.558 5.864 8.628 5.864 8.726V9.944C5.864 10.042 5.906 10.07 5.976 10.07C6.018 10.07 6.06 10.056 6.116 10.028L7.88 9.048V16.86C7.88 16.958 7.922 17 8.02 17ZM14.6202 17.14C16.5382 17.14 18.0362 16.006 18.0362 13.794C18.0362 11.708 16.8182 10.504 14.9142 10.504C14.0742 10.504 13.4162 10.742 12.8282 11.106L13.1922 8.558H17.3782C17.4762 8.558 17.5182 8.516 17.5182 8.418V7.34C17.5182 7.242 17.4762 7.2 17.3782 7.2H12.0582C11.9602 7.2 11.9322 7.242 11.9182 7.34L11.3162 12.604C11.3022 12.688 11.3582 12.744 11.4422 12.744H12.4502C12.5622 12.744 12.6182 12.688 12.6882 12.618C13.2622 12.114 13.8782 11.862 14.6342 11.862C15.8662 11.862 16.6222 12.618 16.6222 13.822C16.6222 15.068 15.8522 15.782 14.6622 15.782C13.6262 15.782 12.8422 15.18 12.6602 14.186C12.6322 14.018 12.5902 13.976 12.4782 13.976H11.4142C11.3162 13.976 11.2462 14.032 11.2462 14.2C11.3862 15.964 12.6882 17.14 14.6202 17.14Z'
        fill={color}
      />
    </svg>
  ),
  16: ({ background, color }) => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='11.25'
        fill={background}
        stroke={color}
        strokeWidth='1.5'
      />
      <path
        d='M7.91844 17H9.06644C9.16444 17 9.20644 16.958 9.20644 16.86V7.34C9.20644 7.242 9.16444 7.2 9.06644 7.2H8.42244C8.33844 7.2 8.28244 7.228 8.21244 7.27L5.91644 8.516C5.83244 8.558 5.76244 8.628 5.76244 8.726V9.944C5.76244 10.042 5.80444 10.07 5.87444 10.07C5.91644 10.07 5.95844 10.056 6.01444 10.028L7.77844 9.048V16.86C7.77844 16.958 7.82044 17 7.91844 17ZM14.6307 17.14C16.3807 17.14 18.0047 15.95 18.0047 13.906C18.0047 11.862 16.6327 10.672 14.8127 10.672C13.9727 10.672 13.1467 10.952 12.5307 11.54C12.6707 9.23 13.5807 8.39 14.6587 8.39C15.4007 8.39 16.0727 8.698 16.3387 9.594C16.3667 9.678 16.3947 9.734 16.4927 9.734H17.5987C17.6827 9.734 17.7667 9.706 17.7527 9.594C17.5567 8.068 16.3527 7.06 14.6587 7.06C12.5447 7.06 11.0467 8.768 11.0467 12.534C11.0467 15.894 12.6567 17.14 14.6307 17.14ZM14.6587 15.782C13.4827 15.782 12.7407 15.012 12.7407 13.906C12.7407 12.8 13.4827 12.03 14.6587 12.03C15.8487 12.03 16.5907 12.8 16.5907 13.906C16.5907 15.012 15.8487 15.782 14.6587 15.782Z'
        fill={color}
      />
    </svg>
  ),
}

export default CIRCLE_ICONS
