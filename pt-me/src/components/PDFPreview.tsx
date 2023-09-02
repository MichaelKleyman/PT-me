import { Courier_Prime } from "next/font/google";

const courier_prime = Courier_Prime({
  weight: "400",
  subsets: ["latin"],
});

export default function PDFPreview() {
  return (
    <div
      className={`${courier_prime.className} p-9 bg-[#f3f8f7] shadow-lg shadow-slate-400 grid grid-cols-3 gap-4`}
    >
      <div>
        <label>First Name</label>
        <div className='border-b-[1px] border-black p-2'>Michael</div>
      </div>
      <div>
        <label>Last Name</label>
        <div className='border-b-[1px] border-black p-2'>Kleyman</div>
      </div>
      <div>
        <label>Gender</label>
        <div className='border-b-[1px] border-black p-2'>Male</div>
      </div>
      <div>
        <label>Email</label>
        <div className='border-b-[1px] border-black p-2'>@@</div>
      </div>
      <div>
        <label>Phone Number</label>
        <div className='border-b-[1px] border-black p-2'>@@</div>
      </div>
      <div>
        <label>Insurance</label>
        <div className='border-b-[1px] border-black p-2'>@@</div>
      </div>
      <div>
        <label>Address</label>
        <div className='border-b-[1px] border-black p-2'>@@</div>
      </div>
      <div>
        <label>State</label>
        <div className='border-b-[1px] border-black p-2'>@@</div>
      </div>
      <div>
        <label>City</label>
        <div className='border-b-[1px] border-black p-2'>@@</div>
      </div>
      <div>
        <label>Zipcode</label>
        <div className='border-b-[1px] border-black p-2'>@@</div>
      </div>
    </div>
  );
}
