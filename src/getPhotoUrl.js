const getPhotoUrl = file => new Promise((resolve, reject) =>
{
	const fileReader = new FileReader();
	fileReader.onload = () => resolve(fileReader.result);
	fileReader.onerror = () => reject(`Failed to read file: ${fileReader.error}`);
	fileReader.readAsDataURL(file);
})

export default getPhotoUrl;
