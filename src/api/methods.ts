const getCars = async () => {
    const response = await fetch('https://task.tspb.su/test-task/vehicles');

    return await response.json();
}

export {getCars}