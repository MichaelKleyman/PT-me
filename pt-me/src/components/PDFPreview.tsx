import { Courier_Prime } from "next/font/google";
import { PatientFormData } from "./CreatePatientForm";

const courier_prime = Courier_Prime({
  weight: "400",
  subsets: ["latin"],
});

interface Props {
  patientFormData: PatientFormData;
}

export default function PDFPreview({ patientFormData }: Props) {
  return (
    <div
      className={`${courier_prime.className} p-9 bg-[#f3f8f7] shadow-lg shadow-slate-400 grid grid-cols-3 gap-4`}
    >
      <div>
        <label>First Name</label>
        <div className=' p-2'>
          {patientFormData["First Name"].length > 0 ? (
            patientFormData["First Name"]
          ) : (
            <>&nbsp;</> // non breaking space entity
          )}
        </div>
        <div className='border-b-[1px] border-black'></div>
      </div>
      <div>
        <label>Last Name</label>
        <div className='p-2'>
          {patientFormData["Last Name"].length > 0 ? (
            patientFormData["Last Name"]
          ) : (
            <>&nbsp;</> // non breaking space entity
          )}
        </div>
        <div className='border-b-[1px] border-black'></div>
      </div>
      <div>
        <label>Gender</label>
        <div className='p-2'>
          {patientFormData.Gender.length > 0 ? (
            patientFormData.Gender
          ) : (
            <>&nbsp;</> // non breaking space entity
          )}
        </div>
        <div className='border-b-[1px] border-black'></div>
      </div>
      <div>
        <label>Age</label>
        <div className=' p-2'>
          {patientFormData?.Age ? (
            patientFormData.Age
          ) : (
            <>&nbsp;</> // non breaking space entity
          )}
        </div>
        <div className='border-b-[1px] border-black'></div>
      </div>
      <div>
        <label>Email</label>
        <div className=' p-2'>
          {patientFormData.Email.length > 0 ? (
            patientFormData.Email
          ) : (
            <>&nbsp;</> // non breaking space entity
          )}
        </div>
        <div className='border-b-[1px] border-black'></div>
      </div>
      <div>
        <label>Phone Number</label>
        <div className=' p-2'>
          {patientFormData["Phone Number"] ? (
            patientFormData["Phone Number"]
          ) : (
            <>&nbsp;</> // non breaking space entity
          )}
        </div>
        <div className='border-b-[1px] border-black'></div>
      </div>
      <div>
        <label>Insurance</label>
        <div className=' p-2'>
          {patientFormData.Insurance.length > 0 ? (
            patientFormData.Insurance
          ) : (
            <>&nbsp;</> // non breaking space entity
          )}
        </div>
        <div className='border-b-[1px] border-black'></div>
      </div>
      <div>
        <label>Address</label>
        <div className=' p-2'>
          {patientFormData.Address.length > 0 ? (
            patientFormData.Address
          ) : (
            <>&nbsp;</> // non breaking space entity
          )}
          {/* {patientFormData.Address.length && patientFormData.Address} */}
        </div>
        <div className='border-b-[1px] border-black'></div>
      </div>
      <div>
        <label>State</label>
        <div className=' p-2'>
          {patientFormData.State.length > 0 ? (
            patientFormData.State
          ) : (
            <>&nbsp;</> // non breaking space entity
          )}
        </div>
        <div className='border-b-[1px] border-black'></div>
      </div>
      <div>
        <label>City</label>
        <div className=' p-2'>
          {patientFormData.City.length > 0 ? (
            patientFormData.City
          ) : (
            <>&nbsp;</> // non breaking space entity
          )}
        </div>
        <div className='border-b-[1px] border-black'></div>
      </div>
      <div>
        <label>Zipcode</label>
        <div className=' p-2'>
          {patientFormData.Zipcode ? (
            patientFormData.Zipcode
          ) : (
            <>&nbsp;</> // non breaking space entity
          )}
        </div>
        <div className='border-b-[1px] border-black'></div>
      </div>
    </div>
  );
}
