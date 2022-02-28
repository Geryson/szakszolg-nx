import { UPLOAD_PATH } from '../constants'

export const multerConfigFactory = () => {
    return {
        dest: UPLOAD_PATH,
    }
}
