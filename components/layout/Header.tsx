import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "../ui/sidebar";

const Header = ({ title }: { title: string }) => {
  return (
    <>
      <div className="flex items-center gap-3 p-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="!h-6 hidden sm:block" />
        <p className="text-md font-semibold">{title}</p>
      </div>
      <Separator />
    </>
  );
};

export default Header;
