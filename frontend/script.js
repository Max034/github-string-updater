async function sendMessage() {
    const message = document.getElementById('message').value;

    const response = await fetch('http://localhost:5000/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    });

    const data = await response.json();

    document.getElementById('result').innerText =
        data.success
        ? 'GitHub Updated Successfully'
        : 'Error';
}