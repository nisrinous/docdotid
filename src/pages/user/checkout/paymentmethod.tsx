import PaymentMethodCard from "@/components/card/payment-method-card";

export default function MyCart() {
  return (
    <>
      <div className="container my-10 grid grid-cols-1 grid-rows-2 md:grid-cols-3 md:grid-rows-1 gap-10 pb-5">
        <div className="col-span-3 md:col-span-2 flex flex-col">
          <div className="flex flex-row justify-between gap-4 border-b-2 pb-5">
            <h3 className="scroll-m-20 text-2xl md:text-3xl">
              Select Payment Method
            </h3>
          </div>

          <div className="py-5 flex flex-col gap-3">
            <div className="px-10">
              <h5 className="py-2">Virtual Account</h5>
              <PaymentMethodCard
                method="Seabank"
                img_path="https://appmanager.seabank.co.id/seamoney/bke/app-manager/live/front_low_code/20230920/40abe4c7131b49d2bd27d9994c405e58.svg"
              />
              <PaymentMethodCard
                method="BCA"
                img_path="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/440px-Bank_Central_Asia.svg.png"
              />
              <PaymentMethodCard
                method="Mandiri"
                img_path="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/440px-Bank_Mandiri_logo_2016.svg.png"
              />
              <PaymentMethodCard
                method="BRI"
                img_path="	https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/BRI_2020.svg/440px-BRI_2020.svg.png"
              />
              <PaymentMethodCard
                method="BNI"
                img_path="https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/350px-BNI_logo.svg.png"
              />
            </div>
            <div className="px-10">
              <h5 className="py-2">Debit Card</h5>
              <PaymentMethodCard
                method="Debit Card"
                img_path="https://i.imgur.com/mUwfVNk.png"
              />
            </div>
            <div className="px-10">
              <h5 className="py-2">QRIS</h5>
              <PaymentMethodCard
                method="QRIS"
                img_path="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logo_QRIS.svg/600px-Logo_QRIS.svg.png"
              />
            </div>
          </div>
        </div>
        <div className="col-span-3 md:block md:col-span-1">
          <h3 className="scroll-m-20 text-xl md:text-2xl border-b-2 mt-1 mb-3 pb-5">
            Summary
          </h3>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between mt-2">
              <p className="text-zinc-600 leading-none text-sm">Order total</p>
              <p className="text-zinc-600 leading-none text-sm">Rp total</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-zinc-600 leading-none text-sm">
                Shipping cost
              </p>
              <p className="text-zinc-600 leading-none text-sm">Rp total</p>
            </div>
            <div className="flex flex-row justify-between border-b-[1px] pb-3">
              <p className="text-zinc-600 leading-none text-sm">
                Service charge 10%
              </p>
              <p className="text-zinc-600 leading-none text-sm">Rp total</p>
            </div>
            <div className="flex flex-row justify-between py-5">
              <p className="text-zinc-600 leading-none text-base">
                Total price
              </p>
              <p className="leading-none text-base text-orange-600">Rp total</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
