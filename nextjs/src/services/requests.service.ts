const API_URL = 'http://localhost:8000/api';

export default async function requestsService (url: string, method: 'GET' | 'POST' | 'PATCH', data: any = {}) {
    const headers = new Headers();
    let response;
    headers.append("Content-Type", "application/json");

    if( method === 'GET' ) {
        response = await fetch(`${API_URL}${url}`, {});
    }
    else {
        response = await fetch(`${API_URL}${url}`, { 
            method: method,
            headers: headers,
            body: JSON.stringify(data)
        });
    }

    return [response.status, await response.json()];
}