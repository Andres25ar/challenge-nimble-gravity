//interface de candidatos
export interface Candidate {
    uuid: string;
    candidateId: string;
    applicationId: string;
    firstName: string;
    lastName: string;
    email: string;
}

//interface de puestos disponibles
export interface Job {
    id: string;
    title: string;
}

//interface para aplocar
export interface ApplicationPayload {
    uuid: string;
    jobId: string;
    candidateId: string;
    applicationId: string;
    repoUrl: string;
}

//base de la API proporcionada
const BASE_URL = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net';

export const api = {
    getCandidate: async (email: string): Promise<Candidate> => {
        const response = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${email}`);
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || errorData?.error || 'Candidato no encontrado');
        }
        return await response.json();
    },

    getJobs: async (): Promise<Job[]> => {
        const response = await fetch(`${BASE_URL}/api/jobs/get-list`);
        if (!response.ok) throw new Error('Error al obtener los puestos');
        return await response.json();
    },

    applyToJob: async (data: ApplicationPayload): Promise<{ ok: boolean }> => {
        const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || errorData?.error || 'Error al enviar la postulación');
        }
        return await response.json();
    }
};