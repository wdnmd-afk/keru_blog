// components/FileViewer/viewers/ImageViewer.tsx
import { ViewerComponentProps } from './dto.ts'
import Toolbar, { FunctionProps } from '@/components/Files/Toolbar.tsx'
interface ImageViewerProps extends ViewerComponentProps {}

function ImageViewer({ url }: ImageViewerProps) {
    const toolList: FunctionProps[] = [
        {
            icon: 'man',
            title: '放大',
            onClick() {
                console.log(123456)
            },
        },
    ]
    return (
        <div flex-col h-full>
            <Toolbar toolList={toolList}></Toolbar>
            <div flex-1 h-0 f-c-c style={{ background: '#121212' }}>
                <img
                    src={url}
                    alt="Preview"
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                />
            </div>
        </div>
    )
}
export default ImageViewer
