import { Button } from "@/components/ui/button";
import PageHeader from "../../components/PageHeader";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
    Accordion, 
    AccordionContent, 
    AccordionItem, 
    AccordionTrigger 
} from "@/components/ui/accordion";

export default function FiturXyx() {
    return (
        <div id="fiturxyz-container">
            <PageHeader title="Fitur XYZ" breadcrumb={["Dashboard", "Fitur XYZ"]}/>
            <Card className="p-4 bg-white rounded-lg shadow">
                Fitur XYZ adalah fitur yang memungkinkan pengguna untuk melakukan
            </Card>

            <Button className="mt-4" variant="destructive">Contoh Destructive</Button>
            <Button className="mt-4" variant="secondary">Contoh Secondary</Button>
            <Button className="mt-4" variant="default">Contoh Default</Button>
            <Button className="mt-4" variant="ghost">Contoh Ghost</Button>
            <Button className="mt-4" variant="outline">Contoh Outline</Button>
            <Button className="mt-4" variant="link">Contoh Link</Button>
        
                <Card className="mt-4 w-[380px]">
                    <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Belajar shadcn/ui</CardTitle>
                        <Badge variant="secondary">Baru</Badge>
                    </div>
                    <CardDescription>
                        Contoh penggunaan komponen shadcn/ui di React
                    </CardDescription>
                    </CardHeader>

                    <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Komponen ini dibuat di branch <strong>setup-shadcn</strong>
                        lalu di-merge ke main.
                    </p>
                    </CardContent>

                    <CardFooter className="flex gap-2">
                    <Button>Simpan</Button>
                    <Button variant="outline">Batal</Button>
                    </CardFooter>
                </Card>

                <Accordion
                    type="single"
                    collapsible
                    defaultValue="shipping"
                    className="max-w-lg"
                    >
                    <AccordionItem value="shipping">
                        <AccordionTrigger>What are your shipping options?</AccordionTrigger>
                        <AccordionContent>
                        We offer standard (5-7 days), express (2-3 days), and overnight
                        shipping. Free shipping on international orders.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="returns">
                        <AccordionTrigger>What is your return policy?</AccordionTrigger>
                        <AccordionContent>
                        Returns accepted within 30 days. Items must be unused and in original
                        packaging. Refunds processed within 5-7 business days.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="support">
                        <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
                        <AccordionContent>
                        Reach us via email, live chat, or phone. We respond within 24 hours
                        during business days.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
        </div>
    );
}