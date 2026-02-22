import { useState } from 'react';
import { api, type Candidate } from '../services/api';

//interfaz para que login reciba la funcion onLoginSuccess
interface LoginProps {
    onLoginSuccess: (candidate: Candidate) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
    const [email, setEmail] = useState('');                                     //dato escrito en el input
    const [loading, setLoading] = useState(false);                              //indica si se esta procesando
    const [error, setError] = useState<string | null>(null);                    //guarda el error
    const [successMessage, setSuccessMessage] = useState<string | null>(null);  //guarda mensaje de bienvenida

    //se activa al enviar formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            //guarda en `data` los valores obtenidos del postulante
            const data = await api.getCandidate(email);
            setSuccessMessage(`¡Bienvenido, ${data.firstName}! Selecciona una vacante.`);

            //tiempo de espera para mostrar el mensaje de bienvenida
            setTimeout(() => {
                onLoginSuccess(data);
            }, 1500);

        } catch (err) {
            //mensaje de error si no se encuentra el email
            setError('El email ingresado no es válido o no está registrado.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Verificación de Candidato</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Ingresa tu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    disabled={loading || !email}
                    className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:bg-blue-300 flex justify-center items-center transition-colors cursor-pointer disabled:cursor-not-allowed"
                >
                    {loading ? (
                        /*spinner de carga de, no se si funciona xd*/
                        <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                    ) : (
                        'Continuar'
                    )}
                </button>
            </form>

            {error && <p className="text-red-500 mt-4 text-center font-medium">{error}</p>}
            {successMessage && <p className="text-green-600 mt-4 text-center font-bold">{successMessage}</p>}
        </div>
    );
}