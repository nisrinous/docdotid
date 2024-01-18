const Headline = ({ text }: { text: string }) => {
  return (
    <h3 className="scroll-m-20 text-3xl tracking-tight text-center my-5">
      {text}
    </h3>
  );
};
export default Headline;
