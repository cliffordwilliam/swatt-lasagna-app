import SidebarLinksList from "./sidebar-links-list";

const Sidebar = ({ resIsAdmin }: { resIsAdmin: boolean }) => {
  return (
    <>
      <aside className="py-4">
        <SidebarLinksList resIsAdmin={resIsAdmin} />
      </aside>
    </>
  );
};

export default Sidebar;
