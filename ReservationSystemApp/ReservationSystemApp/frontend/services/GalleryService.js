import {
    settings
} from '../config/settings';

class GalleryService {
    static getImageSet(linkCreator, imageIds, size = settings.defaultImageSize) {
        let imageSet = [];

        if (imageIds && imageIds.length) {
            imageIds.map(id => imageSet.push({
                src: linkCreator(id),
                width: size.width,
                height: size.height
            }))
        }

        return imageSet;
    }
}

export default GalleryService;