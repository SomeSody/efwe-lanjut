import ErrorPage from "../../components/ErrorPage";

export default function Error403() {
  return (
    <ErrorPage
      code="403"
      title="Forbidden"
      description="Kamu tidak memiliki akses ke halaman ini"
    />
  );
}