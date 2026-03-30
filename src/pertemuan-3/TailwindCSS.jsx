export default function TailwindCSS() {
    return (
        <div>
            <h1 className="border m-4">Belajar tailwind css 4</h1>
            <button className="bg-yellow-500 *:text-white px-4 py-2 rounded m-4">Klik Saya</button>
            <Spacing />
        </div>
  );
}

function Spacing(){
    return (
        <div className="bg-white shadow-lg p-6 m-4 rounded-lg">
            <h2 className="text-lg font-semibold">Card Title</h2>
            <p className="mt-2 text-gray-600">Ini adalah contoh penggunaan padding dan margin di Tailwind.</p>
        </div>
    )
}