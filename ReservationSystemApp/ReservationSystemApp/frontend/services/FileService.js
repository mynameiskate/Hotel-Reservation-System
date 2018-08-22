import {
    settings
} from '../config/settings';
import {
    links
} from '../config/links';
import RequestOptions from '../constants/RequestOptions';

class FileService {
    static uploadRoomImages(roomId, files) {
        var fileData = new FormData();
        Array.from(files).forEach(file => fileData.append('file', file, file.name));
        const token = localStorage.getItem('token');
        const path = links.ROOM_IMAGE_UPLOAD_PATH(roomId);
        const options = RequestOptions.createFileUploadOptions(fileData, token);

        return fetch(settings.baseUrl + path, options);
    }
}

export default FileService;