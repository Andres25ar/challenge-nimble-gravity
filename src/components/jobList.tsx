import { useState, useEffect, useMemo } from 'react';
import { api, type Job, type Candidate } from '../services/api';
import JobCard from './jobCard';

interface JobListProps {
    candidate: Candidate;
}

export default function JobList({ candidate }: JobListProps) {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortAsc, setSortAsc] = useState(true);
    const [activeJobId, setActiveJobId] = useState<string | null>(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await api.getJobs();
                setJobs(data);
            } catch (err) {
                setError('Ocurrió un error al cargar las vacantes disponibles.');
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const filteredAndSortedJobs = useMemo(() => {
        return jobs
            .filter(job => job.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => {
                if (sortAsc) return a.title.localeCompare(b.title);
                return b.title.localeCompare(a.title);
            });
    }, [jobs, searchTerm, sortAsc]);

    if (loading) return <div className="text-center mt-10 text-blue-600 font-bold">Cargando vacantes...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

    return (
        <div className="max-w-3xl mx-auto mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Posiciones Abiertas</h2>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Buscar puesto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 pr-8 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {searchTerm.length > 0 && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 font-bold text-xl leading-none"
                            aria-label="Borrar búsqueda"
                        >
                            &times;
                        </button>
                    )}
                </div>

                <button
                    onClick={() => setSortAsc(!sortAsc)}
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                    Ordenar {sortAsc ? 'Z-A' : 'A-Z'}
                </button>
            </div>

            <div className="flex flex-col">
                {filteredAndSortedJobs.length === 0 ? (
                    <p className="text-center text-gray-500">No se encontraron puestos que coincidan con tu búsqueda.</p>
                ) : (
                    filteredAndSortedJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            candidate={candidate}
                            isActive={activeJobId === job.id}
                            onToggle={() => setActiveJobId(activeJobId === job.id ? null : job.id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}