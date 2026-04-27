import ErrorPage from "../../components/ErrorPage";

export default function Error401() {
  return (
    <ErrorPage
      code="401"
      title="Unauthorized"
      description="Silakan login untuk mengakses halaman ini"
    />
  );
}