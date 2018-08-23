import {
    settings
} from '../config/settings';
import {
    links
} from '../config/links';
import RequestOptions from '../constants/RequestOptions';
import $ from 'jquery'

class FileService {
    static uploadRoomImages(roomId, files) {
        const path = links.ROOM_IMAGE_UPLOAD_PATH(roomId);
        const formData = new FormData();
        Array.from(files).forEach(file => formData.append(file.name, file));

        const token = localStorage.getItem('token');
        const options = RequestOptions.createFileUploadOptions(formData, token);

        return fetch(settings.baseUrl + path, options);
    }
}

export default FileService;