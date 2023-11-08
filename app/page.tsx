import DisplayCities from './components/DisplayCities';

// export const dynamic = "force-dynamic";



export default function Home() {

  return (

    <main>
      <h1>Welcome to desk-mooovements!</h1>
      {/* {fetchError && <p>{fetchError}</p>} */}
      <DisplayCities />
    </main>
  );
}
