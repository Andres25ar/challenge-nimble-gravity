import { useState } from 'react';
import { api, type Job, type Candidate } from '../services/api';

interface JobCardProps {
    job: Job;
    candidate: Candidate;
    isActive: boolean;
    onToggle: () => void;
}

export default function JobCard({ job, candidate, isActive, onToggle }: JobCardProps) {
    const [repoUrl, setRepoUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const handleSubmit = async () => {
        if (!repoUrl.trim()) return;
        const confirm = window.confirm(`¿Estás seguro que quieres aplicar a la posición de ${job.title}?`);
        if (!confirm) return;
        setLoading(true);
        setFeedback(null);
        try {
            await api.applyToJob({
                uuid: candidate.uuid,
                candidateId: candidate.candidateId,
                jobId: job.id,
                repoUrl: repoUrl
            });

            setFeedback({ type: 'success', text: '¡Postulación enviada con éxito!' });
            onToggle();
            setRepoUrl('');
        } catch (err) {
            setFeedback({ type: 'error', text: 'Error al enviar postulación. Revisa la consola.' });
        } finally {
            setLoading(false);
        }
    };


    const handleCancel = () => {
        setRepoUrl('');
        onToggle();
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4 transition hover:shadow-md">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>

                {!isActive && feedback?.type !== 'success' && (
                    <button
                        onClick={onToggle}
                        className="bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold hover:bg-blue-200 transition cursor-pointer"
                    >
                        Aplicar
                    </button>
                )}
            </div>

            {isActive && (
                <div className="mt-4 flex flex-col sm:flex-row items-center gap-3 w-full">
                    <div className="relative w-full sm:flex-1">
                        <input
                            type="url"
                            placeholder="https://github.com/tu-usuario/tu-repo"
                            value={repoUrl}
                            onChange={(e) => setRepoUrl(e.target.value)}
                            className="w-full p-2 pr-8 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {repoUrl.length > 0 && (
                            <button
                                onClick={() => setRepoUrl('')}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 font-bold text-xl leading-none"
                                aria-label="Borrar URL"
                            >
                                &times;
                            </button>
                        )}
                    </div>

                    <div className="flex w-full sm:w-auto justify-center sm:justify-end gap-2 shrink-0">
                        <button
                            onClick={handleSubmit}
                            disabled={loading || !repoUrl}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400 flex items-center justify-center min-w-[90px] cursor-pointer disabled:cursor-not-allowed"
                        >
                            {loading ? <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span> : 'Enviar'}
                        </button>
                        <button
                            onClick={handleCancel}
                            disabled={loading}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 min-w-[90px] cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {feedback && (
                <p className={`mt-3 text-sm font-semibold ${feedback.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {feedback.text}
                </p>
            )}
        </div>
    );
}