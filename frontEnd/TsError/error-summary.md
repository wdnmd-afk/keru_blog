# TypeScript错误检测报告

**检测时间**: 2025/9/5 16:59:16

**错误数量**: 26

## 错误详情

1. **TS2352** - src/build/proxy.ts:32:31
   Conversion of type '{ target: string; changeOrigin: boolean; rewrite: (path: string) => string; }' to type 'ProxyConfig' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.

2. **TS2345** - src/config/upload.ts:176:49
   Argument of type 'string' is not assignable to parameter of type '"text/plain" | "application/octet-stream" | "image/jpeg" | "image/jpg" | "image/png" | "image/gif" | "image/bmp" | "image/webp" | "image/svg+xml" | "application/pdf" | "application/msword" | ... 22 more ... | "application/x-msdownload"'.

3. **TS2339** - src/enum/index.ts:67:30
   Property 'splpnpmit' does not exist on type 'string'.

4. **TS18048** - src/hooks/useUpload.ts:289:82
   'chunk.chunkSize' is possibly 'undefined'.

5. **TS2345** - src/hooks/useUpload.ts:484:21
   Argument of type '{ signal: AbortSignal; timeout: number; onUploadProgress: (e: any) => void; }' is not assignable to parameter of type '{ onUploadProgress?: ((progressEvent: any) => void) | undefined; signal?: AbortSignal | undefined; }'.

6. **TS2367** - src/hooks/useUpload.ts:492:21
   This comparison appears to be unintentional because the types 'UploadState.Uploading' and 'UploadState.Paused' have no overlap.

7. **TS2367** - src/hooks/useUpload.ts:492:65
   This comparison appears to be unintentional because the types 'UploadState.Uploading' and 'UploadState.Interrupted' have no overlap.

8. **TS2345** - src/hooks/useUpload.ts:651:17
   Argument of type '{ timeout: number; onUploadProgress: (progressEvent: any) => void; }' is not assignable to parameter of type '{ onUploadProgress?: ((progressEvent: any) => void) | undefined; signal?: AbortSignal | undefined; }'.

9. **TS2367** - src/hooks/useUpload.ts:906:26
   This comparison appears to be unintentional because the types 'UploadState.Uploading' and 'UploadState.Paused' have no overlap.

10. **TS18048** - src/hooks/useUpload.ts:975:38
   'chunk.loaded' is possibly 'undefined'.

11. **TS7006** - src/utils/common/methods.ts:1:26
   Parameter 'min' implicitly has an 'any' type.

12. **TS7006** - src/utils/common/methods.ts:1:31
   Parameter 'max' implicitly has an 'any' type.

13. **TS7053** - src/utils/common/methods.ts:23:17
   Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'.

14. **TS2345** - src/utils/filePreview.ts:166:49
   Argument of type 'string' is not assignable to parameter of type 'never'.

15. **TS2345** - src/utils/filePreview.ts:171:47
   Argument of type 'string' is not assignable to parameter of type 'never'.

16. **TS2322** - src/views/Books/index.tsx:162:81
   Type '{ children: string; key: string; color: "blue"; size: string; }' is not assignable to type 'IntrinsicAttributes & TagProps & RefAttributes<HTMLSpanElement>'.

17. **TS2322** - src/views/Files/components/FilePreview.tsx:127:25
   Type '{ showToolbar: boolean; src: string; fileName: string; fileSize: number | undefined; maxWidth: string | number; maxHeight: string | number; onError: ((error: string) => void) | undefined; onLoad: (() => void) | undefined; }' is not assignable to type 'ImagePreviewProps'.

18. **TS2339** - src/views/Files/components/ImagePreview.tsx:254:28
   Property 'previewImage' does not exist on type 'FC<GroupConsumerProps>'.

19. **TS2322** - src/views/Files/components/ImagePreview.tsx:406:21
   Type '(event: Event) => void' is not assignable to type 'ReactEventHandler<HTMLImageElement>'.

20. **TS2322** - src/views/Files/components/ImagePreview.tsx:407:21
   Type '(event: Event) => void' is not assignable to type 'ReactEventHandler<HTMLImageElement>'.

21. **TS2322** - src/views/Files/components/PDFPreview.tsx:695:25
   Type '{ pageNumber: number; scale: number; onLoadSuccess: (page: any) => void; onLoadError: (error: Error) => void; onRenderTextLayerError: (error: Error) => void; loading: Element; renderTextLayer: true; renderAnnotationLayer: true; className: string; style: { ...; }; }' is not assignable to type 'IntrinsicAttributes & { _className?: string | undefined; _enableRegisterUnregisterPage?: boolean | undefined; canvasBackground?: string | undefined; canvasRef?: Ref<...> | undefined; ... 36 more ...; width?: number | undefined; } & EventProps<...>'.

22. **TS2339** - src/views/Files/FilePreview.tsx:61:23
   Property 'url' does not exist on type 'FileItem'.

23. **TS2339** - src/views/Files/FilePreview.tsx:62:24
   Property 'name' does not exist on type 'FileItem'.

24. **TS2322** - src/views/Home/components/Content.tsx:195:77
   Type '{ children: string; key: string; color: string; size: string; }' is not assignable to type 'IntrinsicAttributes & TagProps & RefAttributes<HTMLSpanElement>'.

25. **TS1192** - src/views/index.tsx:2:8
   Module '"E:/github/keru_blog/frontEnd/src/views/systemPages/Home"' has no default export.

26. **TS2322** - src/views/index.tsx:4:22
   Type 'Promise<typeof import("E:/github/keru_blog/frontEnd/src/views/systemPages/Home")>' is not assignable to type 'Promise<{ default: ComponentType<any>; }>'.

