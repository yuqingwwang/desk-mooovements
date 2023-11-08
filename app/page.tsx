
import DisplayCities from './components/DisplayCities';



export default function Home() {


  return (
    <main>
      <h1>Welcome to desk-mooovements!</h1>
      {/* {fetchError && <p>{fetchError}</p>} */}

      <DisplayCities />

    </main>
  );
}

