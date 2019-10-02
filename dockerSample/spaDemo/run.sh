cd dockerSample
# 打包镜像
docker image build ./ -t hello-docker:1.0.0
docker images # 查看镜像
# 构建容器，将里面的80端口映射到3036上
docker container create -p 3036:80 hello-docker:1.0.0
docker container start xxx # xxx是执行后得到的容器id
# 即在容器内部执行命令，开启了bash就能直接命令行
docker container exec -it xxx /bin/bash