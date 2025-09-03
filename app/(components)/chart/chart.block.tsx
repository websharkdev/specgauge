import ChartBG from "./chart-background"

const BChart = () => {
    return (
        <div className="w-full grid grid-cols-2 items-center min-h-dvh justify-end relative">
            <div className="col-span-1 flex flex-col gap-4 relative overflow-hidden h-full pt-32 px-11 border-r border-[#00000050] bg-[#E5E8EF]">
                <h6 className="z-10 uppercase text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-[#F14616] to-sky-[#860000]">tanks often 80% full</h6>
                <h2 className="z-10 text-4xl font-medium text-[#111111] leading-tight max-w-md">Monthly top-ups wasting resources</h2>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 801 900"
                    className="absolute inset-0"
                >
                    <g clipPath="url(#clip0_1_1183)">
                        <g filter="url(#filter0_f_1_1183)" opacity="0.15">
                            <path
                                fill="#0A7EEE"
                                fillRule="evenodd"
                                d="M-268.042 741.599c-39.909-49.803 106.012-156.821 183.765-238.004C-30.69 447.644 33.799 401.84 104.234 352.898c101.109-70.256 205.729-188.083 303.745-191.349 98.267-3.275 47.261 109.98 45.385 179.714-1.176 43.753-34.751 92.327-54.025 141.472-31.75 80.954 19.562 170.338-93.22 233.96-112.251 63.324-149.537-43.996-251.35-39.58-101.884 4.419-282.062 115.336-322.811 64.484"
                                clipRule="evenodd"
                            ></path>
                        </g>
                        <g filter="url(#filter1_f_1_1183)" opacity="0.1">
                            <path
                                fill="#FF8B00"
                                fillRule="evenodd"
                                d="M647.094 591.465c-56.259-21.847-118.214-65.261-108.045-144.561 9.977-77.805 107.936-114.79 150.634-187.562 41.714-71.093 24.781-178.53 87.609-218.483 61.666-39.214 111.082 23.52 148.089 68.6 27.893 33.979 26.693 89.738 26.487 144.057-.177 46.841-6.936 93.323-27.567 141.283-26.085 60.638-52.958 126.422-102.804 161.786-58.36 41.403-123.479 54.655-174.403 34.88"
                                clipRule="evenodd"
                            ></path>
                        </g>
                    </g>
                    <defs>
                        <filter
                            id="filter0_f_1_1183"
                            width="1383.08"
                            height="1233.43"
                            x="-594.826"
                            y="-158.521"
                            colorInterpolationFilters="sRGB"
                            filterUnits="userSpaceOnUse"
                        >
                            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                            <feBlend
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            ></feBlend>
                            <feGaussianBlur
                                result="effect1_foregroundBlur_1_1183"
                                stdDeviation="160"
                            ></feGaussianBlur>
                        </filter>
                        <filter
                            id="filter1_f_1_1183"
                            width="1053.99"
                            height="1211.97"
                            x="217.945"
                            y="-291.493"
                            colorInterpolationFilters="sRGB"
                            filterUnits="userSpaceOnUse"
                        >
                            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                            <feBlend
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            ></feBlend>
                            <feGaussianBlur
                                result="effect1_foregroundBlur_1_1183"
                                stdDeviation="160"
                            ></feGaussianBlur>
                        </filter>
                        <clipPath id="clip0_1_1183">
                            <path fill="#fff" d="M0 0h801v900H0z"></path>
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <div className="col-span-1 flex flex-col gap-4 relative overflow-hidden h-full pt-32 px-11 bg-white">
                <h6 className="z-10 uppercase text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-[#0B9C36] to-sky-[#175F49]">With SpecGauge</h6>
                <h2 className="z-10 text-4xl font-medium text-[#111111] leading-tight max-w-md">Efficient refills only when they’re needed</h2>

                <svg className="flex-1 absolute" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 610 900">
                    <g filter="url(#filter0_f_1_1182)" opacity="0.15">
                        <path
                            fill="#5C98FF"
                            fillRule="evenodd"
                            d="M388.222 753.992c-96.717-67.624-195.296-178.034-143.717-320.399 50.606-139.679 249.738-161.249 359.739-275.847C711.707 45.792 723.908-161.852 858.275-205.828c131.88-43.163 198.995 97.093 250.035 198.6 38.47 76.509 13.38 179.473-9.25 280.24-19.52 86.894-51.25 169.958-109.646 249.093-73.828 100.056-151.245 209.289-259.349 250.985-126.566 48.818-254.299 42.111-341.843-19.098"
                            clipRule="evenodd"
                        ></path>
                    </g>
                    <defs>
                        <filter
                            id="filter0_f_1_1182"
                            width="1357.93"
                            height="1479.22"
                            x="0.324"
                            y="-443.853"
                            colorInterpolationFilters="sRGB"
                            filterUnits="userSpaceOnUse"
                        >
                            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                            <feBlend
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            ></feBlend>
                            <feGaussianBlur
                                result="effect1_foregroundBlur_1_1182"
                                stdDeviation="115"
                            ></feGaussianBlur>
                        </filter>
                    </defs>
                </svg>
            </div>
            <ChartBG />
        </div>
    )
}

export default BChart