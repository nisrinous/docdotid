import { Button } from "../ui/button";

const ManageQuantityButton = ({ counter }: { counter: number }) => {
  const increment = () => {
    counter + 1;
  };
  const decrement = () => {
    counter - 1;
  };

  return (
    <>
      {counter > 0 && (
        <div className="flex flex-row items-center justify-center gap-2 w-full">
          <Button onClick={decrement} className="h-6 w-6 p-0">
            -
          </Button>
          <p className="border-b-2 px-2">{counter}</p>
          <Button onClick={increment} className="h-6 w-6 p-0">
            +
          </Button>
        </div>
      )}
      {!(counter > 0) && (
        <div className="flex flex-row items-center justify-center gap-2 w-full">
          <p className="px-5 text-zinc-400 leading-none text-xs">Sold out</p>
        </div>
      )}
    </>
  );
};

export default ManageQuantityButton;
