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
      <div className="flex flex-row items-center justify-center gap-2">
        <Button onClick={decrement} className="h-6 w-6 p-0">
          -
        </Button>
        <p className="border-b-2 px-2">{counter}</p>
        <Button onClick={increment} className="h-6 w-6 p-0">
          +
        </Button>
      </div>
    </>
  );
};

export default ManageQuantityButton;
