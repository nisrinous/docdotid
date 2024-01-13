import Sidebar from "@/components/aside-bar";
import { menus } from "@/utils/menus";

export default function Home(): JSX.Element {
  return (
    <div className="flex">
      <Sidebar menus={menus} />
      <div className="w-full mx-10 mt-5">
        <h1 className="text-black text-2xl my-2 mb-8">Dashboard</h1>
        <div className="w-full flex gap-10">
          <div className="w-1/2 bg-blue-200 rounded-lg h-60">Hello</div>
          <div className="w-1/2 bg-red-200 rounded-lg h-60">Hello</div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl">Earnings by Pharmacy</h2>

          <table></table>
        </div>
      </div>
    </div>
  );
}
