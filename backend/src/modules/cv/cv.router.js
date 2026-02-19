import { Router } from 'express';
import { CVController } from './cv.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { uploadCV } from '../../config/multer.js';

export const cvRouter = Router();

// Upload CV (JOB_SEEKER only)
cvRouter.post('/upload', authMiddleware, (req, res, next) => {
    // Kiểm tra role trước khi upload
    if (req.user.userContext?.role !== 'JOB_SEEKER') {
        return res.status(403).json({ message: 'Chỉ ứng viên mới có thể upload CV' });
    }
    next();
}, uploadCV.single('cv'), (err, req, res, next) => {
    // Xử lý lỗi multer
    if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File quá lớn. Kích thước tối đa là 5MB' });
        }
        return res.status(400).json({ message: err.message });
    }
    next();
}, CVController.uploadCV);

// Lấy thông tin CV của user hiện tại
cvRouter.get('/my-cv', authMiddleware, CVController.getMyCV);

// Xem CV trực tiếp (mở PDF trong trình duyệt)
cvRouter.get('/:userId', authMiddleware, CVController.viewCV);

// Tải CV về máy
cvRouter.get('/:userId/download', authMiddleware, CVController.downloadCV);

// Xóa CV (JOB_SEEKER only)
cvRouter.delete('/', authMiddleware, (req, res, next) => {
    if (req.user.userContext?.role !== 'JOB_SEEKER') {
        return res.status(403).json({ message: 'Chỉ ứng viên mới có thể xóa CV' });
    }
    next();
}, CVController.deleteCV);
