export async function login() {

    const response = await fetch('/api/login');
    return await response.json();
}
