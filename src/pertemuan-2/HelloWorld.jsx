export default function HelloWorld(){
    const propsUserCard = {
            nama: "Goku",
            nim: "999999",
            tanggal: "2025-01-01"
        }

    return (
        <div>
            <h1>Wanted</h1>
            <p>Selamat Belajar ReactJs</p>
            <GreetingBinjai/>
            {/* <QuoteText/> */}
            <UserCard 
	            nama="Udin" 
	            nim="2231535"
	            tanggal={new Date().toLocaleDateString()}
	          />

           <UserCard {...propsUserCard}/>

           
        </div>
    )
}

function GreetingBinjai(){  
    return (
        <div>
            <small>Selamat Datang di Kota Binjai 👌</small>
        </div>
    )
}

function UserCard(props){
    return (
        <div>
            <hr/>
            <h3>Nama: {props.nama}</h3>
            <p>NIM: {props.nim}</p>
            <p>Tanggal: {props.tanggal}</p>
        </div>
    )
}