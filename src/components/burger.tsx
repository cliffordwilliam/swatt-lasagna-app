import { Menu } from "lucide-react";
import Sidebar from "./sidebar/sidebar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const Burger = ({ resIsAdmin }: { resIsAdmin: boolean }) => {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>Pilih Halaman</SheetTitle>
            <SheetDescription>
              Silakan klik opsi di bawah untuk memilih halaman
            </SheetDescription>
          </SheetHeader>
          <Sidebar resIsAdmin={resIsAdmin} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Burger;
