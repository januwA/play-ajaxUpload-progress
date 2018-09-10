# play-ajaxUpload-progress
ajax下载上传文件，获取进度
> 上传的进度需要在 xhr.upload 里面获取， progress事件要在xhr.open之前打开
> 进度条把 进度 从 0-100 映射到 0-300