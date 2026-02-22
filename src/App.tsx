import { useState } from 'react';
import Login from './components/login';
import { api, type Candidate } from './services/api';
import JobList from './components/jobList';

function App() {
  //datos del candidato una vez que el login sea exitoso
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  //ejecuta cuando el Login termina todo su proceso
  const handleLoginSuccess = (data: Candidate) => {
    setCandidate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">Nimble Gravity Challenge</h1>
      </header>

      <main className="w-full max-w-3xl">
        {/* Renderizado condicional: Si no hay candidato, mostramos el Login */}
        {!candidate ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          /*si hay candidato, mostramos sus datos temporalmente para verificar*/
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full max-w-md mx-auto">
            {!candidate ? (
              <Login onLoginSuccess={handleLoginSuccess} />
            ) : (
              /* Aquí está el cambio: Pasamos el candidato al JobList */
              <JobList candidate={candidate} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;