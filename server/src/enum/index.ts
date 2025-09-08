type TFileType =
  | 'PDF'
  | 'IMAGE'
  | 'VIDEO'
  | 'AUDIO'
  | 'DOC'
  | 'EXCEL'
  | 'POWERPOINT'
  | 'ARCHIVE'
  | 'OTHER'
type IFileType = {
  [key in TFileType]: string[]
}
const FileType: IFileType = {
  PDF: ['pdf'],
  IMAGE: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'svg'],
  VIDEO: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'],
  AUDIO: ['mp3', 'wav', 'aac', 'ogg', 'flac', 'wma'],
  DOC: ['doc', 'docx', 'odt', 'rtf', 'txt'],
  EXCEL: ['xls', 'xlsx', 'ods', 'csv'],
  POWERPOINT: ['ppt', 'pptx', 'odp'],
  ARCHIVE: ['zip', 'rar', '7z', 'tar', 'gz'],
  OTHER: [
    'html',
    'css',
    'js',
    'json',
    'xml',
    'yaml',
    'yml',
    'ts',
    'tsx',
    'jsx',
    'vue',
    'md',
    'markdown',
    'txt',
    'csv',
    'tsv',
    'json',
    'xml',
    'yaml',
    'yml',
    'sql',
    'db',
    'mdb',
    'sqlite',
    'csv',
    'tsv',
    'json',
    'xml',
    'yaml',
    'yml',
    'sql',
    'db',
    'mdb',
    'sqlite',
    'csv',
    'tsv',
    'json',
  ],
}
//需要返回的是Key
const getFileType = (data: string, isFileName = false): TFileType => {
  let fileExtension = data
  if (isFileName) {
    fileExtension = data.split('.').pop().toLowerCase()
  }
  console.log(data, 'dddd')
  for (const key in FileType) {
    if (FileType[key as TFileType].includes(fileExtension)) {
      return key as TFileType
    }
  }
  return 'OTHER'
}

export { FileType, getFileType }
