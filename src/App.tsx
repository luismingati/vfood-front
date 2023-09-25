import ColaboratorHeader from "./components/ColaboratorHeader/ColaboratorHeader";

import { Router } from "./router";

export function App() {
  return (
    <>
      <ColaboratorHeader name={"Alice Martins"} role={"Manager"} stars={4.5}/>
    </>
  );
}
