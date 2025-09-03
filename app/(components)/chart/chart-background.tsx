import { PhoneCall } from "lucide-react"
import ChartIcon from "./chart-icon"
import ChartCustom from "./chart-custom"


const info_data = [
    {
        id: 1,
        icon: <PhoneCall />,
        title: "Emergency calls from customers in winter",
    }
]

const ChartBG = () => {
    return (
        <div className="flex justify-center items-center w-full absolute bottom-0 left-0">
            {/* {info_data.map((data) => (
                <div key={data.id} className={`flex flex-col justify-center items-center gap-3 max-w-xs text-center absolute ${data.chartFor}`}>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-full bg-opacity-40 backdrop-blur-xl bg-blend-multiply">
                        {data.icon}
                    </div>
                    <p className="text-sm">{data.title}</p>
                </div>
            ))} */}
            {/* <ChartIcon data={info_data} /> */}

            <ChartCustom data={info_data} />
        </div>
    )
}

export default ChartBG