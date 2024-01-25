import { JSX, SVGProps } from "react";

function FacebookIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function InstagramIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
const Footer = () => {
  return (
    <div className="bg-sky-700 flex sm:flex-row justify-center text-white flex-col">
      <div className="flex flex-col m-3 sm:m-10">
        <p className="pb-1 font-black text-3xl">DOCDOT.ID</p>
        <ul>
          <li className="pb-2">About Us</li>
          <li className="pb-2">FAQ</li>
          <li className="pb-2">Terms and conditions</li>
          <li className="pb-2">Privacy Policy</li>
          <li>Corporate Partnership</li>
        </ul>
      </div>
      <div className="flex flex-col m-3 sm:m-10">
        <p className="pb-2 font-black text-2xl">Consumer Complaints Service</p>
        <ul>
          <li className="pb-3">
            <p>PT Media Dokter Investama</p>
            <p>Jl. H.R. Rasuna Said Kav B32-33, Jakarta Selatan</p>
            <p>help@doc.id / 021-5095-9900</p>
          </li>
          <li>
            <p>Direktorat Jenderal Perlindungan Konsumen dan Tertib Niaga</p>
            <p>Kementerian Perdagangan Republik Indonesia</p>
            <p> 0853 1111 1010 (WhatsApp)</p>
          </li>
        </ul>
      </div>
      <div className="flex flex-col m-3 sm:m-10">
        <p className="pb-2 font-black text-2xl">Social Media</p>
        <div className="flex flex-row pb-2">
          <ul className="flex flex-col">
            <li className="flex flex-row pb-3 items-center">
              <FacebookIcon className="w-10 h-10" />
              <p className="pl-2">Docdot</p>
            </li>
            <li className="flex flex-row pb-3 items-center">
              <TwitterIcon className="w-10 h-10" />
              <p className="pl-2">@Docdot</p>
            </li>
            <li className="flex flex-row pb-3 items-center">
              <InstagramIcon className="w-10 h-10" />
              <p className="pl-2">@Docdot</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
