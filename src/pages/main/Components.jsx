import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import Avatar from "../../components/Avatar";
import Container from "../../components/Container";
import Footer from "../../components/Footer";

export default function Components() {
    return (
        <>
        <Container className="bg-gray-200">

            <PageHeader title="Components" />
            
                <p>You can add your components here.</p>
                <div className="mb-3 flex gap-2">
                    <Button>Simpan</Button>
                    <Button type="danger">Hapus</Button>
                    <Button type="secondary">Edit</Button>
                    <Button type="warning">Cetak</Button>
                </div>

                <div className="mb-3 flex gap-2">
                    <Badge>Aktif</Badge>
                    <Badge type="secondary">Nonaktif</Badge>
                    <Badge type="success">Sukses</Badge>
                </div>

                <div className="mb-3 flex gap-2">
                    <Avatar name="Alice" />
                    <Avatar name="Bob" />
                    <Avatar name="Charlie" />
                </div>

        </Container>
        <Footer />
        </>
    );
}