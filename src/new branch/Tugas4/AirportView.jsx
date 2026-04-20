import { useState } from "react";

function GuestView({ data }) {
  const facilities = [
    { label: "WiFi", value: data.facilities.wifi },
    { label: "Lounge", value: data.facilities.lounge },
    { label: "Parkir", value: data.facilities.parking },
  ];

  return (
    <div className="p-4 mb-4 ml-5 inline-block w-100">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 overflow-hidden shadow-sm bg-white">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-44 object-cover"
        />
        <div className="p-5">
          {/* Badges */}
          <div className="flex gap-2 mb-3">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700">
              {data.code}
            </span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-50 text-green-700">
              Buka 24 Jam
            </span>
          </div>

          {/* Name & Location */}
          <h2 className="text-lg font-semibold text-gray-900">{data.name}</h2>
          <p className="text-sm text-gray-500 mb-4">
            {data.city} &middot; {data.country}
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Jam Operasional</p>
              <p className="text-sm font-medium text-gray-800">
                {data.operational_hours.open} – {data.operational_hours.close}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Zona Waktu</p>
              <p className="text-sm font-medium text-gray-800">{data.operational_hours.timezone}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Koordinat</p>
              <p className="text-sm font-medium text-gray-800">
                {data.lat.toFixed(4)}°, {data.lon.toFixed(4)}°
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Restoran</p>
              <p className="text-sm font-medium text-gray-800">{data.facilities.restaurants} Outlet</p>
            </div>
          </div>

          <hr className="border-gray-100 mb-4" />

          {/* Facilities */}
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Fasilitas</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {facilities.map((f) => (
              <span
                key={f.label}
                className={`flex items-center gap-1.5 text-xs px-3 py-1 rounded-md border ${
                  f.value
                    ? "bg-green-50 text-green-700 border-transparent"
                    : "bg-gray-50 text-gray-400 border-gray-100 line-through"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    f.value ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
                {f.label}
              </span>
            ))}
          </div>

          <hr className="border-gray-100 mb-4" />

          {/* Contact */}
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Kontak</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <PhoneIcon />
              {data.contact.phone}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MailIcon />
              <a href={`mailto:${data.contact.email}`} className="text-blue-600 hover:underline">
                {data.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <GlobeIcon />
              <a href={data.contact.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                {data.contact.website.replace("https://", "")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminView({ data }) {
  const rows = [
    { field: "code", value: data.code, note: "Kode unik bandara" },
    { field: "name", value: data.name, note: "Nama resmi" },
    { field: "city", value: data.city, note: "Kota lokasi" },
    { field: "country", value: data.country, note: "Kode negara (ISO)" },
    { field: "lat", value: data.lat.toFixed(6), note: "Garis lintang" },
    { field: "lon", value: data.lon.toFixed(6), note: "Garis bujur" },
    { field: "contact.phone", value: data.contact.phone, note: "Nomor telepon" },
    { field: "contact.email", value: data.contact.email, note: "Surel kontak", isEmail: true },
    { field: "contact.website", value: data.contact.website, note: "Situs resmi", isLink: true },
    { field: "facilities.wifi", value: data.facilities.wifi, note: "Fasilitas WiFi", isBool: true },
    { field: "facilities.lounge", value: data.facilities.lounge, note: "Fasilitas lounge", isBool: true },
    { field: "facilities.parking", value: data.facilities.parking, note: "Area parkir", isBool: true },
    { field: "facilities.restaurants", value: data.facilities.restaurants, note: "Jumlah restoran" },
    { field: "operational_hours.open", value: data.operational_hours.open, note: "Jam buka" },
    { field: "operational_hours.close", value: data.operational_hours.close, note: "Jam tutup" },
    { field: "operational_hours.timezone", value: data.operational_hours.timezone, note: "Zona waktu" },
    { field: "image", value: data.image, note: "URL gambar", isLink: true },
  ];

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-4 py-3 w-52">
              Field
            </th>
            <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-4 py-3">
              Nilai
            </th>
            <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-4 py-3">
              Keterangan
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.field}
              className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                i === rows.length - 1 ? "border-b-0" : ""
              }`}
            >
              <td className="px-4 py-3">
                <code className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono">
                  {row.field}
                </code>
              </td>
              <td className="px-4 py-3 text-gray-800">
                {row.isBool ? (
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                      row.value
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {row.value ? "Tersedia" : "Tidak Ada"}
                  </span>
                ) : row.isEmail ? (
                  <a href={`mailto:${row.value}`} className="text-blue-600 hover:underline">
                    {row.value}
                  </a>
                ) : row.isLink ? (
                  <a
                    href={row.value}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline break-all text-xs"
                  >
                    {row.value}
                  </a>
                ) : (
                  String(row.value)
                )}
              </td>
              <td className="px-4 py-3 text-gray-400 text-xs">{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.06 3.18 2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}

function AirportItem({ data, tab }) {
  return tab === "guest" ? (
    <GuestView data={data} />
  ) : (
    <AdminView data={data} />
  );
}

export default function AirportView({ dataList }) {
  const [tab, setTab] = useState("guest");

  return (
    <div className="inline-block">
      <div className="w-full px-4">
        {/* Header (1x) */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">
            Airport Data Viewer
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Lihat data bandara sebagai tamu atau admin
          </p>
        </div>

        {/* Tab Bar (1x) */}
        <div className="flex gap-2 mb-6">
          {["guest", "admin"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                tab === t
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {t === "guest" ? "Guest View" : "Admin View"}
            </button>
          ))}
        </div>
      </div>
      {/* List */}
        <div className="space-y-4">
          {dataList.map((data) => (
            <AirportItem key={data.code} data={data} tab={tab} />
          ))}
        </div>
    </div>
  );
}