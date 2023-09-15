import CardView from "./components/View/CardView";

export function App() {
  return (
    <>
    <div className="flex items-center justify-center text-center">
      <CardView name={"Fulano da silva"} description={"Manager"} age={24} numberClicked={0} />
    </div>
    </>
  )
}


