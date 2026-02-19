import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { UserModel } from '../users/user.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../../../uploads/cvs');

export class CVController {
    /**
     * Upload CV (PDF) — JOB_SEEKER only
     * POST /api/cv/upload
     */
    static async uploadCV(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'Vui lòng chọn file PDF để upload' });
            }

            const userId = req.user.userId;
            const resumeUrl = `/uploads/cvs/${req.file.filename}`;

            // Cập nhật URL trong DB
            await UserModel.findByIdAndUpdate(userId, { resume: resumeUrl });

            return res.status(200).json({
                message: 'Upload CV thành công',
                resumeUrl,
                fileName: req.file.originalname,
                fileSize: req.file.size,
            });
        } catch (error) {
            console.error('Upload CV error:', error);
            return res.status(500).json({ message: 'Lỗi khi upload CV' });
        }
    }

    /**
     * Xem CV trực tiếp (inline PDF) — Authenticated users
     * GET /api/cv/:userId
     */
    static async viewCV(req, res) {
        try {
            const { userId } = req.params;

            const user = await UserModel.findById(userId).select('resume name').lean();
            if (!user || !user.resume) {
                return res.status(404).json({ message: 'Không tìm thấy CV' });
            }

            const filePath = path.join(__dirname, '../../../', user.resume);

            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ message: 'File CV không tồn tại' });
            }

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `inline; filename="CV_${user.name}.pdf"`);

            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);
        } catch (error) {
            console.error('View CV error:', error);
            return res.status(500).json({ message: 'Lỗi khi xem CV' });
        }
    }

    /**
     * Tải CV về máy — Authenticated users
     * GET /api/cv/:userId/download
     */
    static async downloadCV(req, res) {
        try {
            const { userId } = req.params;

            const user = await UserModel.findById(userId).select('resume name').lean();
            if (!user || !user.resume) {
                return res.status(404).json({ message: 'Không tìm thấy CV' });
            }

            const filePath = path.join(__dirname, '../../../', user.resume);

            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ message: 'File CV không tồn tại' });
            }

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="CV_${user.name}.pdf"`);

            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);
        } catch (error) {
            console.error('Download CV error:', error);
            return res.status(500).json({ message: 'Lỗi khi tải CV' });
        }
    }

    /**
     * Xóa CV — JOB_SEEKER only
     * DELETE /api/cv
     */
    static async deleteCV(req, res) {
        try {
            const userId = req.user.userId;

            const user = await UserModel.findById(userId).select('resume').lean();
            if (!user || !user.resume) {
                return res.status(404).json({ message: 'Không có CV để xóa' });
            }

            // Xóa file trên disk
            const filePath = path.join(__dirname, '../../../', user.resume);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            // Xóa URL trong DB
            await UserModel.findByIdAndUpdate(userId, { resume: null });

            return res.status(200).json({ message: 'Đã xóa CV thành công' });
        } catch (error) {
            console.error('Delete CV error:', error);
            return res.status(500).json({ message: 'Lỗi khi xóa CV' });
        }
    }

    /**
     * Lấy thông tin CV của user hiện tại
     * GET /api/cv/my-cv
     */
    static async getMyCV(req, res) {
        try {
            const userId = req.user.userId;
            const user = await UserModel.findById(userId).select('resume name').lean();

            if (!user || !user.resume) {
                return res.status(200).json({ hasCV: false, resumeUrl: null });
            }

            // Kiểm tra file thực sự tồn tại
            const filePath = path.join(__dirname, '../../../', user.resume);
            const fileExists = fs.existsSync(filePath);

            if (!fileExists) {
                // File bị mất, cleanup DB
                await UserModel.findByIdAndUpdate(userId, { resume: null });
                return res.status(200).json({ hasCV: false, resumeUrl: null });
            }

            const stats = fs.statSync(filePath);

            return res.status(200).json({
                hasCV: true,
                resumeUrl: user.resume,
                fileName: `CV_${user.name}.pdf`,
                fileSize: stats.size,
                uploadedAt: stats.mtime,
            });
        } catch (error) {
            console.error('Get my CV error:', error);
            return res.status(500).json({ message: 'Lỗi khi lấy thông tin CV' });
        }
    }
}
