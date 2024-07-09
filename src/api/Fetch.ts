export async function Fetch(page: number) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${page}`);
    const json = response.json();
    return json;
}