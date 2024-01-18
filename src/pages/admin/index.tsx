import Sidebar from "@/components/aside-bar";
import { getOrdersMonthly } from "@/lib/fetcher/orders";
import { menus } from "@/utils/menus";
import React, { PureComponent, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useSWR from "swr";

export default function Home(): JSX.Element {
  const { token } = useSelector((state: RootState) => state.user);
  const [ordersData, setOrdersData] = useState<[]>([]);
  const [ordersData2, setOrdersData2] = useState<[]>([]);

  const fetchData = async () => {
    try {
      const data = await getOrdersMonthly(token);

      console.log("ini data", data);
      setOrdersData(data.data.ProductCategorySales);
      setOrdersData2(data.data.ProductSales);
    } catch (error) {
      console.error("" + error);
    }
  };

  const { error: isError, isValidating: isLoading } = useSWR(
    ["/orders/sales_reports", token],
    fetchData
  );

  const getStatusMonth = (month: number) => {
    switch (month) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";

      default:
        return "Unknown";
    }
  };

  const data = ordersData;
  const data2 = ordersData2;
  // const data = [
  //   {
  //     name: "Page A",
  //     uv: 4000,
  //     pv: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: "Page B",
  //     uv: 3000,
  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: "Page C",
  //     uv: 2000,
  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: "Page D",
  //     uv: 2780,
  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: "Page E",
  //     uv: 1890,
  //     pv: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: "Page F",
  //     uv: 2390,
  //     pv: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: "Page G",
  //     uv: 3490,
  //     pv: 4300,
  //     amt: 2100,
  //   },
  // ];

  return (
    <div className="flex">
      <Sidebar menus={menus} />
      <div className="w-full mx-10 mt-5">
        <h1 className="text-black text-3xl font-bold my-2 mb-8">DASHBOARD</h1>
        <div className="w-full flex gap-10">
          <div className="w-1/2 bg-blue-200 rounded-lg h-96 py-5">
            <h1 className="px-5 font-semibold text-lg">
              Monthly sales report by product category
            </h1>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis dataKey="order_price" />
                <Tooltip />
                <Legend />

                <Bar
                  dataKey="order_price"
                  fill="#82ca9d"
                  activeBar={<Rectangle fill="gold" stroke="purple" />}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="w-1/2 bg-red-200 rounded-lg h-96 py-5">
            <h1 className="px-5 font-semibold text-lg">
              Monthly sales report by product
            </h1>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={data2}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tickFormatter={getStatusMonth} />
                <YAxis />
                <Tooltip />
                <Legend />

                <Bar
                  dataKey="order_price"
                  fill="#82ca9d"
                  activeBar={<Rectangle fill="gold" stroke="purple" />}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl">Earnings by Pharmacy</h2>

          <table></table>
        </div>
      </div>
    </div>
  );
}
