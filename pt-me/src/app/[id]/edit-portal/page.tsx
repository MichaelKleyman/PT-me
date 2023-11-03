import Link from "next/link";
import { AiOutlineFileSearch } from "react-icons/ai";
import EditClinicInfo from "@/components/EditClinicInfo";

export default function EditPortal({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { [key: string]: string };
}) {
  const { clinicName, address, email } = searchParams;
  return (
    <div className='mt-[1rem] ml-[6rem] p-4'>
      <div className='flex text-center gap-2'>
        <Link
          href={`/${params.id}`}
          className='mb-5 text-sm text-gray-400 hover:underline duration-300 hover:scale-110 flex items-center gap-2'
        >
          <AiOutlineFileSearch />
          Dashboard
        </Link>
        <div>/</div>
        <div className='mb-5 text-sm'>Edit Clinic Information</div>
      </div>
      <div className='p-4 flex items-center justify-center h-screen'>
        <EditClinicInfo
          id={params.id}
          clinicName={clinicName}
          address={address}
          email={email}
        />
      </div>
    </div>
  );
}
