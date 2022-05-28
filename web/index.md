# Web 复习题

## 简答题

从以下 12 题中选择 4 题，每题 5 分，共 20 分。

1. Spring Boot 的核心注解是什么？它主要由哪几个注解组成的？
2. 请列举 SpringBoot 项目中 Mysql 数据源配置项和端口配置项内容。
3. 简述控制反转和依赖注入的基本概念，以及两者之间的关系。
4. 请简述 SpringMVC 接收参数的几种类型及应用场景。
5. 列举 Spring Mvc 定义 RESTful API 时涉及到的核心注解有哪些。
6. 简述 Spring AOP 的通知方式有哪些。
7. 在使用 JPA 框架是，实体类具备哪些特征？
8. 简述使用 Mybatis 实现数据分页查询的过程。
9. 请简述 Http 协议常见的状态码。
10. 以学生信息（StudentInfo）为例，定义一组符合 restful 风格的 URL 并指定请求方式，具体包括：创建新学生、查询学生列表、按姓名关键字查询学生列表、删除指定学生、更新指定学生。
11. 简述获取 SpringBoot 自定义配置项值的几种方式，至少回答 2 种。
12. 请简述图片上传功能的实现要点。

### 简答题答案

> Spring Boot 的核心注解是什么？它主要由哪几个注解组成的？

核心注解是`@SpringBootApplication`，它主要由`@SpringBootConfiguration`，`@EnableAutoConfiguration`和`@ComponentScan`这三个构成。

- `@SpringBootConfiguration`：组合了 @Configuration 注解，实现配置文件的功能。
- `@EnableAutoConfiguration`：打开自动配置的功能。
- `@ComponentScan`：扫描该类所在的包下所有的配置类

> 请列举 SpringBoot 项目中 Mysql 数据源配置项和端口配置项内容。

``` yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/jdbc
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver
```

> 简述控制反转和依赖注入的基本概念，以及两者之间的关系。

控制反转是一种是面向对象编程中的一种设计原则，用来减低计算机代码之间的耦合度。  
依赖注入是把底层类作为参数传入上层类，实现上层类对下层类的“控制”。  
依赖注入和控制反转是对同一件事情的不同描述。  
控制反转是从容器的角度在描述，容器控制应用程序，由容器反向的向应用程序注入应用程序所需要的外部资源; 而依赖注入是从应用程序的角度在描述，应用程序依赖容器创建并注入它所需要的外部资源。

> 请简述 SpringMVC 接收参数的几种类型及应用场景。

`@RequestParam` 可以把请求参数传递给请求方法的形参。  
`value="name"` - 表示参数名称。  
比如明确指定接受参数`name`

无注解则自动匹配参数  
参数名称与请求参数名称一致  
比如可选接受参数`name`只需要形参名一致

`@PathVariable` 可以把请求路径中的参数传递给请求方法的形参。  
`value="name"` - 表示参数名称。  
需要在`@RequestMapping`里面添加占位符`{name}`  
适用于使用url表明请求且无需传参

> 列举 Spring Mvc 定义 RESTful API 时涉及到的核心注解有哪些。

``` java
@RestController
// 是@Controller和@ResponseBody组合。

@GetMapping
// 是@RequestMapping(method = RequestMethod.GET)的简写。
@PostMapping
// 是@RequestMapping(method = RequestMethod.POST)的简写。
@PutMapping
// 是@RequestMapping(method = RequestMethod.PUT)的简写。
@DeleteMapping
// 是@RequestMapping(method = RequestMethod.DELETE)的简写。
@PatchMapping
// 是@RequestMapping(method = RequestMethod.PATCH)的简写。

@PathVariable
// 用于接收路径参数。
@RequestParam
// 用于接收请求参数。
@RequestBody
// 用于接收请求体。
```

> 简述 Spring AOP 的通知方式有哪些。

Spring切面可以应用5种类型的通知：

1. 前置通知（Before）：在目标方法被调用之前调用通知功能；
2. 后置通知（After）：在目标方法完成之后调用通知，此时不会关心方法的输出是什么；
3. 返回通知（After-returning ）：在目标方法成功执行之后调用通知；
4. 异常通知（After-throwing）：在目标方法抛出异常后调用通知；
5. 环绕通知（Around）：通知包裹了被通知的方法，在被通知的方法调用之前和调用之后执行自定义的行为

> 在使用 JPA 框架是，实体类具备哪些特征？

实体类需要添加`@Entity`  
应该有个无参的构造方法。  
主键字段需要添加`@Id`  
主键生成策略： `@GeneratedValue`  
一对一关系 - `@OneToOne`  
一对多关系 - `@OneToMany`  
多对一关系 - `@ManyToOne`  
多对多关系 - `@ManyToMany`  

> 简述使用 Mybatis 实现数据分页查询的过程。

在mapper中编写sql语句查询数据和总数的对应的方法，然后于service中调用并构造分页对象返回。

> 请简述 Http 协议常见的状态码。

- 信息响应(100–199)
- 成功响应(200–299)：200成功/201创建
- 重定向(300–399)：301转移/304未变化
- 客户端错误(400–499)：400错误/401未授权/403无权限/404未找到
/405请求格式错误
- 服务器错误 (500–599)：500错误/502网关错误/504超时

> 以学生信息（StudentInfo）为例，定义一组符合 restful 风格的 URL 并指定请求方式，具体包括：创建新学生、查询学生列表、按姓名关键字查询学生列表、删除指定学生、更新指定学生。

创建新学生  
url: /student/create  
method: POST  
params:

``` json
{
  "name": "张三",
  "age": 18
}
```

response:

``` json
{
  "id": 1,
  "name": "张三",
  "age": 18
}
```

查询学生列表  
url: /student/list  
method: GET  
params:

``` json
{
  "page": 1,
  "size": 10
}
```

response:

``` json
{
  "total": 2,
  "list": [
    {
      "id": 1,
      "name": "张三",
      "age": 18
    },
    {
      "id": 2,
      "name": "李四",
      "age": 19
    }
  ]
}
```

按姓名关键字查询学生列表  
url: /student/list  
method: GET  
params:

``` json
{
  "name": "张",
  "page": 1,
  "size": 10
}
```

response:

``` json
{
  "total": 1,
  "list": [
    {
      "id": 1,
      "name": "张三",
      "age": 18
    }
  ]
}
```

删除指定学生  
url: /student/{id}  
method: DELETE  
params: 无  
response:

``` json
{
  "msg": "success"
}
```

更新指定学生  
url: /student/{id}  
method: PUT
params:

``` json
{
  "id": 1,
  "name": "张三",
  "age": 20
}
```

response:

``` json
{
  "msg": "success"
}
```

> 简述获取 SpringBoot 自定义配置项值的几种方式，至少回答 2 种。

通过 `@Value` 注解获取配置项值。
通过 `@ConfigurationProperties(prefix="my.prefix")` 注解加载一组属性的值。

> 请简述图片上传功能的实现要点。

spring中使用参数`MultipartFile file`来接收上传的文件
可能需要根据后缀实现不同类型的图片处理
可能需要构建随机文件名

``` java
public class FileController {
  @Value("${my.file.path}")
  private String filePath;

  @RequestMapping(value = "/upload", method = RequestMethod.POST)
  public String upload(@RequestParam MultipartFile file) throws IOException {
    if (file.isEmpty()) {
      return "上传失败，请选择文件";
    }
    // 获取文件名
    String fileName = file.getOriginalFilename();
    // 获取文件的后缀名
    String suffixName = fileName.substring(fileName.lastIndexOf("."));
    // 设置文件存储路径
    String filePath = "D:\\" + fileName;
    // 转存文件
    file.transferTo(new File(filePath));
    return "上传成功";
  }
}
```

## 程序题

从以下 6 个知识点中选择 2~3 个代码段，共 10 个填空，每个 2 分
共 20 分。

1. Servlet定义 API、参数接收、数据响应。
2. SpringMVC 定义 API、参数接收、数据响应。
3. 使用 Jdbc进行数据查询的实现方式。
4. 使用 Mybatis 进行数据新增的实现方式。
5. Springboot自定义配置的使用。
6. 使用 Spring Aop 进行切点定义与通知接收。

### 程序题答案

> Servlet定义 API、参数接收、数据响应。
  
``` java
// 定义 API
@WebServlet("/url")
public class Servlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
    try {
      // 接收参数
      String name = req.getParameter("name");
      String age = req.getParameter("age");
      // 数据响应
      resp.setContentType("text/plain;charset=utf-8");
      resp.getWriter().write("name:" + name + ",age:" + age);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```

> SpringMVC 定义 API、参数接收、数据响应。

``` java
// 定义 API
@Controller
public class Controller {
  @RequestMapping("/url")
  @ResponseBody
  public String doGet(
      // 参数接收
      String name,
      String age) {
    // 数据响应
    return "name:" + name + ",age:" + age;
  }
}
```

> 使用 Jdbc进行数据查询的实现方式。

``` java
// 1、创建jdbc参数
String driver = "com.mysql.jdbc.Driver";
String url = "jdbc:mysql://localhost:3306/jdbc";
String username = "root";
String password = "123456";
// 2、加载驱动
try {
  Class.forName(driver);
  // 3、创建连接
  Connection conn = DriverManager.getConnection(url, username, password);
  // 4、创建执行命令
  PreparedStatement stmt = conn.prepareStatement("select * from clazz where name = ?");
  // 5、创建SQL命令
  stmt.setString(1, "java");
  // 6、执行SQL命令
  ResultSet rs = stmt.executeQuery();
  // 7、处理结果
  if (rs.next()) {
    System.out.println("查询结果为");
    System.out.println("name:" + rs.getString("name"));
    System.out.println("age:" + rs.getString("age"));
  } else {
    System.out.println("查询失败");
  }
  // 关闭资源
  stmt.close();
  conn.close();

} catch (Exception e) {
  e.printStackTrace();
}
```

> 使用 Mybatis 进行数据新增的实现方式。

``` java
// 编写 Mapper 接口
@Mapper
public interface MovieInfoMapper {
  // 新增
  // 参数：MovieInfo对象
  // 编写 注解 @Insert 指定 SQL 语句
  // 注解 @Options 指定插入数据的自增主键(返回值)
  @Insert("insert into movie_info(`name`, movie_year)\n" +
          "values (#{movieName}, #{movieYear})")
  @Options(useGeneratedKeys = true, keyProperty = "movieId", keyColumn = "movieId")
  Integer publishMovie(MovieInfo movieInfo);
}

// 于 Service 层进行数据操作
// 注入
@Autowired
private MovieInfoMapper movieInfoMapper;
// 编写方法
public MovieInfo publishMovieInfo(MovieInfo movieInfo) {
  final Integer result = movieInfoMapper.publishMovie(movieInfo);
  if (result > 0) {
    return movieInfo;
  }
  return null;
}
```

> Springboot自定义配置的使用。

不想写.jpg

``` java

```

> 使用 Spring Aop 进行切点定义与通知接收。

``` java

```

## 案例设计

给定案例场景，为案例进行技术设计，包括数据库结构设计、API
设计、实现思路描述三部分，共 30 分。  
1、理解案例场景进行数据库结构的设计，包括数据表对象设计、表字段设计、表间关联关系设计。（10 分）  
2、理解案例场景进行 API 设计，包括访问方式、路由、输入参数、返回类型、异常处理。（10 分）  
3、案例场景的实现思路描述。（10 分）  

### 答题思路

#### 数据库

分析数据属性 组表
分析关系 添加关系(外键)
稍微画个er图之类的就差不多了

#### api设计

分析数据的增删改查 挨个写就完事了

访问方式、路由

- 增: POST, /api/movie
- 删: DELETE, /api/movie/{id}
- 改: PUT, /api/movie/
- 查: GET, /api/movie/{id}

参数及返回值

- 增: 除了id其他都是参数，返回值是所有字段
- 删: id，返回值是是否成功
- 改: 所有字段，返回值是是否成功
- 查:
  - 无，返回值是列表
  - id，返回值是所有字段

异常随便扯，未查询到数据 权限 数据格式错误等

思路部分字数水够就行
比如 用户先登录，然后再增删改查 等等
