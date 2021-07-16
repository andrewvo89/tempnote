import imageCompression from 'browser-image-compression';
import { ImageTypes } from '@utils/image/types';

/**
 * A class representing an Image.
 * @class Image
 */
class Image {
  /**
   * Resizes an image using browser-image-compression.
   * @param  {File} file
   * @param  {ImageTypes} type
   * @param  {number} maxWidth
   * @param  {number} maxMB
   * @returns Promise
   */
  static async resizeImage(
    file: File,
    type: ImageTypes,
    maxWidth: number,
    maxMB: number,
  ): Promise<File> {
    const blob = await imageCompression(file, {
      fileType: type,
      maxWidthOrHeight: maxWidth,
      maxSizeMB: maxMB,
    });
    const resizedFile = new File([blob], blob.name, {
      type: blob.type,
      lastModified: blob.lastModified,
    });
    return resizedFile;
  }
}

export default Image;
