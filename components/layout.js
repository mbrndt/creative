import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <div className="mx-6 md:mx-w-2xl bg-black">
      <Nav />
      <main>{children}</main>
    </div>
  );
}
