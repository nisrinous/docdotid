import Sidebar from "@/components/aside-bar";
import { getCategoryList, getOrdersMonthly } from "@/lib/fetcher/orders";
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
import { Combobox } from "@/components/combo-box";
import { Combobox2 } from "@/components/combo-box/product";

export default function Home(): JSX.Element {
  const { token } = useSelector((state: RootState) => state.user);
  const [ordersData, setOrdersData] = useState<[]>([]);
  const [ordersData2, setOrdersData2] = useState<[]>([]);

  const fetchData = async () => {
    try {
      const data = await getOrdersMonthly(
        token,
        selectedCategory,
        selectedProduct
      );

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

  return (
    <div className="flex">
      <Sidebar menus={menus} />
      <div className="w-full mx-10 mt-5">
        <h1 className="text-black text-3xl font-bold my-2 mb-3">DASHBOARD</h1>
        <div className="w-full flex gap-10">
          <div className="w-1/2 bg-blue-200 rounded-lg h-96 py-8">
            <div className="flex justify-between px-5">
              <h1 className="px-5 font-semibold text-lg">
                Monthly sales report by product category
              </h1>
              {/* <Combobox onSelectCategory={handleSelectCategory} /> */}
            </div>
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
                <XAxis dataKey="month" tickFormatter={getStatusMonth} />
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
          <div className="w-1/2 bg-red-200 rounded-lg h-96 py-8">
            <div className="flex justify-between px-5">
              <h1 className="px-5 font-semibold text-lg">
                Monthly sales report by product
              </h1>
              <Combobox2 />
            </div>
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
