# angular_ng指令集合

## 创建项目

| 命令                | 描述                              |
| ------------------- | --------------------------------- |
| ng new project_name | 会创建一个名为projects_name的语句 |

## 创建其他组件

| 命令                            | 描述                                  | 目录                                                         |
| ------------------------------- | ------------------------------------- | ------------------------------------------------------------ |
| ng  g component  XXX            | 创建名为XXX（可不加根目录/）          | component.css、component.html、component.spec.ts、component.ts |
| ng  g pipe /目录名/pipe名       | 在“目录名”下创建名为“pipe名”的管道    | pipe.spec.ts、pipe.ts                                        |
| ng  g service /目录名/service名 | 在“目录名”下创建名为“service名”的服务 | service.spec.ts、service.ts                                  |
| ng  g module /目录名/module名   | 在“目录名”下创建名为“module名”的模块  | module.ts                                                    |

