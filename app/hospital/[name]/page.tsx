



import HospitalAppointmentsClient from "../HospitalAppointmentsClient";

export async function generateStaticParams() {
  return [
    { name: "mashh" },
  ];
}

export default async function Page({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;

  return <HospitalAppointmentsClient />;
}