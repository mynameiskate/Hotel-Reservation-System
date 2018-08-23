import {
    settings
} from '../config/settings';
import {
    links
} from '../config/links';

class FileService {
    static uploadImages(files) {
        const path = links.IMAGE_UPLOAD_PATH;
        const formData = new FormData();
        Array.from(files).forEach(file => formData.append('images', file));

        const token = localStorage.getItem('token');
        const options = {
            body: formData,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        return fetch(settings.baseUrl + path, options);
    }
}

export default FileService;