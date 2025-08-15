import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    CloudOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const KubernetesDetail: React.FC = () => {
    const navigate = useNavigate()
    
    const handleBack = () => {
        navigate('/technology/docker')
    }
    
    return (
        <div className={styles.topic_detail_container}>
            {/* 返回按钮 */}
            <div className={styles.back_section}>
                <Button 
                    type="text" 
                    icon={<ArrowLeftOutlined />}
                    onClick={handleBack}
                    className={styles.back_button}
                >
                    返回Docker技术卡片
                </Button>
            </div>
            
            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <CloudOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Kubernetes 容器编排详解</h1>
                    <p>掌握Kubernetes容器编排与集群管理</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">Kubernetes</Tag>
                        <Tag color="green">容器编排</Tag>
                        <Tag color="orange">集群管理</Tag>
                        <Tag color="purple">微服务</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* Kubernetes基础 */}
                <Card title="☸️ Kubernetes 基础概念" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是Kubernetes？</h3>
                        <p>Kubernetes（K8s）是一个开源的容器编排平台，用于自动化容器化应用程序的部署、扩展和管理。它提供了一个可移植、可扩展的平台来管理容器化工作负载和服务。</p>
                        
                        <h3>核心组件</h3>
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>🎯 Master节点</h4>
                                <p>控制平面，管理整个集群</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🔧 Worker节点</h4>
                                <p>运行应用容器的工作节点</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>📦 Pod</h4>
                                <p>最小的部署单元，包含一个或多个容器</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🔄 Service</h4>
                                <p>为Pod提供稳定的网络访问</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>📋 Deployment</h4>
                                <p>管理Pod的副本和更新</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🗂️ ConfigMap</h4>
                                <p>存储配置数据</p>
                            </div>
                        </div>
                        
                        <h3>基本命令</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 查看集群信息
kubectl cluster-info

# 查看节点
kubectl get nodes

# 查看所有资源
kubectl get all

# 查看Pod
kubectl get pods
kubectl get pods -o wide

# 查看服务
kubectl get services

# 查看部署
kubectl get deployments

# 描述资源详情
kubectl describe pod <pod-name>
kubectl describe service <service-name>`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* Pod管理 */}
                <Card title="📦 Pod 管理" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. Pod定义与创建</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.20
    ports:
    - containerPort: 80
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"

# 创建Pod
kubectl apply -f pod.yaml

# 查看Pod状态
kubectl get pod nginx-pod

# 查看Pod日志
kubectl logs nginx-pod

# 进入Pod
kubectl exec -it nginx-pod -- /bin/bash

# 删除Pod
kubectl delete pod nginx-pod`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. 多容器Pod</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# multi-container-pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: multi-container-pod
spec:
  containers:
  - name: web-server
    image: nginx:1.20
    ports:
    - containerPort: 80
    volumeMounts:
    - name: shared-data
      mountPath: /usr/share/nginx/html
      
  - name: sidecar
    image: busybox
    command: ['sh', '-c', 'while true; do echo "$(date): Hello from sidecar" > /data/index.html; sleep 30; done']
    volumeMounts:
    - name: shared-data
      mountPath: /data
      
  volumes:
  - name: shared-data
    emptyDir: {}

# 查看多容器Pod的日志
kubectl logs multi-container-pod -c web-server
kubectl logs multi-container-pod -c sidecar`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. Pod生命周期</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# pod-lifecycle.yaml
apiVersion: v1
kind: Pod
metadata:
  name: lifecycle-pod
spec:
  containers:
  - name: app
    image: nginx:1.20
    lifecycle:
      postStart:
        exec:
          command: ["/bin/sh", "-c", "echo 'Container started' > /tmp/started"]
      preStop:
        exec:
          command: ["/bin/sh", "-c", "echo 'Container stopping' > /tmp/stopping"]
    livenessProbe:
      httpGet:
        path: /
        port: 80
      initialDelaySeconds: 30
      periodSeconds: 10
    readinessProbe:
      httpGet:
        path: /
        port: 80
      initialDelaySeconds: 5
      periodSeconds: 5

# Pod状态说明
Pending: Pod已创建但容器未启动
Running: Pod中至少有一个容器正在运行
Succeeded: Pod中所有容器都成功终止
Failed: Pod中至少有一个容器失败终止
Unknown: 无法获取Pod状态`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* Deployment管理 */}
                <Card title="📋 Deployment 部署管理" className={styles.content_card}>
                    <div className={styles.deployment_section}>
                        <h3>Deployment基础</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.20
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"

# 创建Deployment
kubectl apply -f deployment.yaml

# 查看Deployment
kubectl get deployments

# 查看ReplicaSet
kubectl get replicasets

# 扩缩容
kubectl scale deployment nginx-deployment --replicas=5

# 查看部署状态
kubectl rollout status deployment nginx-deployment`}
                            </pre>
                        </div>
                        
                        <h3>滚动更新</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 更新镜像
kubectl set image deployment/nginx-deployment nginx=nginx:1.21

# 查看更新历史
kubectl rollout history deployment nginx-deployment

# 回滚到上一个版本
kubectl rollout undo deployment nginx-deployment

# 回滚到指定版本
kubectl rollout undo deployment nginx-deployment --to-revision=2

# 暂停和恢复更新
kubectl rollout pause deployment nginx-deployment
kubectl rollout resume deployment nginx-deployment

# 更新策略配置
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* Service网络 */}
                <Card title="🔄 Service 网络服务" className={styles.content_card}>
                    <div className={styles.service_section}>
                        <h3>Service类型</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# ClusterIP Service (默认)
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: ClusterIP

# NodePort Service
apiVersion: v1
kind: Service
metadata:
  name: nginx-nodeport
spec:
  selector:
    app: nginx
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
    nodePort: 30080
  type: NodePort

# LoadBalancer Service
apiVersion: v1
kind: Service
metadata:
  name: nginx-loadbalancer
spec:
  selector:
    app: nginx
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: LoadBalancer`}
                            </pre>
                        </div>
                        
                        <h3>Ingress控制器</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nginx-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: nginx-service
            port:
              number: 80
  - host: api.example.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: api-service
            port:
              number: 8080

# 安装Nginx Ingress Controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 配置管理 */}
                <Card title="🗂️ 配置与密钥管理" className={styles.content_card}>
                    <div className={styles.config_section}>
                        <h3>ConfigMap配置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  database_url: "postgresql://localhost:5432/mydb"
  debug_mode: "true"
  app.properties: |
    server.port=8080
    server.host=0.0.0.0
    logging.level=INFO

# 在Pod中使用ConfigMap
apiVersion: v1
kind: Pod
metadata:
  name: app-pod
spec:
  containers:
  - name: app
    image: myapp:latest
    env:
    - name: DATABASE_URL
      valueFrom:
        configMapKeyRef:
          name: app-config
          key: database_url
    volumeMounts:
    - name: config-volume
      mountPath: /etc/config
  volumes:
  - name: config-volume
    configMap:
      name: app-config

# 创建ConfigMap
kubectl create configmap app-config --from-file=config/
kubectl apply -f configmap.yaml`}
                            </pre>
                        </div>
                        
                        <h3>Secret密钥管理</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secret
type: Opaque
data:
  username: YWRtaW4=  # base64编码的admin
  password: MWYyZDFlMmU2N2Rm  # base64编码的密码

# 创建Secret
kubectl create secret generic app-secret --from-literal=username=admin --from-literal=password=secret123

# 在Pod中使用Secret
apiVersion: v1
kind: Pod
metadata:
  name: secret-pod
spec:
  containers:
  - name: app
    image: myapp:latest
    env:
    - name: USERNAME
      valueFrom:
        secretKeyRef:
          name: app-secret
          key: username
    - name: PASSWORD
      valueFrom:
        secretKeyRef:
          name: app-secret
          key: password

# TLS Secret
kubectl create secret tls tls-secret --cert=path/to/cert.crt --key=path/to/cert.key`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ Kubernetes 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 资源管理</h4>
                                <p>合理配置资源请求和限制</p>
                                <ul>
                                    <li>为所有容器设置资源请求和限制</li>
                                    <li>使用命名空间隔离不同环境</li>
                                    <li>配置适当的副本数量</li>
                                    <li>使用HPA自动扩缩容</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 安全配置</h4>
                                <p>确保集群和应用安全</p>
                                <ul>
                                    <li>使用RBAC控制访问权限</li>
                                    <li>启用网络策略</li>
                                    <li>使用Secret管理敏感信息</li>
                                    <li>定期更新镜像和集群</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 监控运维</h4>
                                <p>建立完善的监控体系</p>
                                <ul>
                                    <li>配置健康检查探针</li>
                                    <li>收集和分析日志</li>
                                    <li>监控资源使用情况</li>
                                    <li>设置告警机制</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 部署策略</h4>
                                <p>采用合适的部署策略</p>
                                <ul>
                                    <li>使用滚动更新减少停机时间</li>
                                    <li>实施蓝绿部署或金丝雀发布</li>
                                    <li>建立回滚机制</li>
                                    <li>自动化CI/CD流程</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default KubernetesDetail
