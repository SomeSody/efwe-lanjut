export default function Biodata(){
    const test = {
        No: "089977655177"
    }

    return (
    <div>
        <div className="container">
            <Nama/>
            <Tgl/>
            <Alm/>
            <Pendk/>
            <Jrs/>
            <Y {...test}/>
        </div>
    </div>
    )
}

function Nama(){
    return (
        <div className="card">
            <h3>Nama Lengkap</h3>
            <p>Farid Ramadhan</p>
        </div>
    )
}

function Tgl(){
    return (
        <div className="card">
            <h3>Tanggal Lahir</h3>
            <p>12 12 1972</p>
        </div>
    )
}

function Alm(){
    return (
        <div className="card">
            <h3>Alamat</h3>
            <p>Jln.aspal Gg.sempit</p>
        </div>
    )
}

function Pendk(){
    return (
        <div className="card">
            <h3>Kampus</h3>
            <p>Politeknik Caltex Riau</p>
        </div>
    )
}

function Jrs(){
    return (
        <div className="card">
            <h3>Jurusan</h3>
            <p>Sistem Informasi</p>
        </div>
    )
}

function Y(J){
    return (
        <div className="card">
            <h3>No HP</h3>
            <p>{J.No}</p>
        </div>
    )
}
