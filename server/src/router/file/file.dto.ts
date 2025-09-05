// file.dto.ts
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  Max,
} from "class-validator";
import { PageDto } from "@/common/dto";
import { IsFileType, IsFileSizeValid } from "@/common/validation.decorators";
import { UPLOAD_CONFIG } from "@/config/upload";

// 定义允许的文件类型
const ALLOWED_FILE_TYPES = [
  // 图片类型
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "bmp",
  "svg",
  // 文档类型
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "txt",
  "md",
  // 视频类型
  "mp4",
  "avi",
  "mov",
  "wmv",
  "flv",
  "mkv",
  // 音频类型
  "mp3",
  "wav",
  "flac",
  "aac",
  // 压缩文件
  "zip",
  "rar",
  "7z",
  "tar",
  "gz",
];

export class FileCheckDto {
  @IsNotEmpty({ message: "文件哈希不能为空" })
  @IsString({ message: "文件哈希必须是字符串" })
  @MaxLength(64, { message: "文件哈希长度不能超过64位" })
  fileHash: string;

  @IsNotEmpty({ message: "文件名不能为空" })
  @IsString({ message: "文件名必须是字符串" })
  @MaxLength(255, { message: "文件名长度不能超过255位" })
  @IsFileType(ALLOWED_FILE_TYPES, { message: "不支持的文件类型" })
  fileName: string;
}

export class FileMergeDto extends FileCheckDto {
  @IsNotEmpty({ message: "切片大小不能为空" })
  @IsNumber({}, { message: "切片大小必须是数字" })
  @Min(1024, { message: "切片大小不能小于1KB" }) // 1KB
  @Max(10 * 1024 * 1024, { message: "切片大小不能超过10MB" }) // 10MB
  chunkSize: number;
}

export class FileChunkDto {
  @IsNotEmpty({ message: "文件哈希不能为空" })
  @IsString({ message: "文件哈希必须是字符串" })
  @MaxLength(64, { message: "文件哈希长度不能超过64位" })
  fileHash: string; // 总文件hash

  @IsNotEmpty({ message: "文件大小不能为空" })
  @IsNumber({}, { message: "文件大小必须是数字" })
  @IsFileSizeValid(1024, { message: "文件大小不能超过1GB" }) // 1GB 限制
  fileSize: number; // 总文件size

  @IsNotEmpty({ message: "文件名不能为空" })
  @IsString({ message: "文件名必须是字符串" })
  @MaxLength(255, { message: "文件名长度不能超过255位" })
  @IsFileType(ALLOWED_FILE_TYPES, { message: "不支持的文件类型" })
  fileName: string; // 总文件name

  @IsNotEmpty({ message: "切片索引不能为空" })
  @IsNumber({}, { message: "切片索引必须是数字" })
  @Min(0, { message: "切片索引不能小于0" })
  index: number;

  @IsNotEmpty({ message: "切片文件不能为空" })
  chunkFile: Blob; // 切片文件本身

  @IsNotEmpty({ message: "切片哈希不能为空" })
  @IsString({ message: "切片哈希必须是字符串" })
  chunkHash: string; // 单个切片hash,以 - 连接

  @IsOptional()
  @IsNumber({}, { message: "切片大小必须是数字" })
  @Min(1024, { message: "切片大小不能小于1KB" })
  chunkSize: number | undefined; // 切片文件大小

  @IsNotEmpty({ message: "切片数量不能为空" })
  @IsNumber({}, { message: "切片数量必须是数字" })
  @Min(1, { message: "切片数量不能小于1" })
  @Max(1000, { message: "切片数量不能超过1000" }) // 防止恶意大量切片
  chunkNumber: number; // 切片个数
}

export class FileQueryDto extends PageDto {
  @IsOptional()
  @IsString({ message: "用户名必须是字符串" })
  @MaxLength(50, { message: "用户名长度不能超过50位" })
  userName?: string;

  @IsOptional()
  @IsString({ message: "文件名必须是字符串" })
  @MaxLength(255, { message: "文件名长度不能超过255位" })
  fileName?: string;
}
