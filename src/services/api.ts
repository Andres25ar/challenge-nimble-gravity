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
    repoUrl: string;
}

//base de la API proporcionada
const BASE_URL = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net';

export const api = {
    //obtener datos como promesa para la interfaz de candidatos (pasamos un email) [STEP 2]
    getCandidate: async (email: string): Promise<Candidate> => {
        const response = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${email}`);
        if (!response.ok) throw new Error('Candidato no encontrado');
        return await response.json();
    },

    //GET para la lista de puestos disponibles [STEP 3 y 4]
    getJobs: async (): Promise<Job[]> => {
        const response = await fetch(`${BASE_URL}/api/jobs/get-list`);
        if (!response.ok) throw new Error('Error al obtener los puestos');
        return await response.json();
    },

    //submit (se espera que la interfaz para la aplicacion sea lo que se envia) [STEP 5]
    applyToJob: async (data: ApplicationPayload): Promise<{ ok: boolean }> => {
        const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Error al enviar la postulación');
        return await response.json();
    }
};