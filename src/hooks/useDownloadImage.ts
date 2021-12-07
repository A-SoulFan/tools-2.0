export default function downloadImage(fileName: string, blob:ArrayBuffer) {
    const a = document.createElement('a');
    const url = window.URL.createObjectURL(new Blob([blob]));
    a.href = url;
    a.download = fileName;
    a.click();
}
