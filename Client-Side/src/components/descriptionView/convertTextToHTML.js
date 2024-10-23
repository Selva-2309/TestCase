const convertTextToHTML = (text) => {
    return text
        .replace(/\[image\]\s*/gim, "")
        // Convert image URLs (http, https, or blob) into <img> tags
        .replace(/\(http(?:s)?:\/\/\S+\)/g, (match) => {
            // Remove the parentheses around the URL
            return match.slice(1, -1);
        })
        .replace(/\http?:\/\/\S+\.(jpg|jpeg|png|gif|webp|bmp)/g, (url) => {
            return `<a href="${url}" target="_blank"><img src="${url}" alt="Image" style="width:100%; height:auto;" /></a>`;
        })
        // Convert markdown-like headings
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // Convert markdown-like bold and italic syntax
        .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>') // Convert **bold** to <b>
        .replace(/\*(.*)\*/gim, '<i>$1</i>') // Convert *italic* to <i>
        // Replace newlines with <br>
        .replace(/\n/gim, '<br>');
};

export default convertTextToHTML;