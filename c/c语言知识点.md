# c语言知识点

## 目录

* [概要](#概要)
* [预处理](#预处理)
  * [指令](#指令)
  * [能力](#能力)
* [c语言关键字](#c语言关键字)
* [字面量](#字面量)
  * [整数](#整数)
  * [浮点](#浮点)
  * [字符](#字符)
  * [字符串](#字符串)

## 概要

总体上必须清楚的:

1. 程序结构是三种:**顺序结构**、**选择结构(分支结构)**、**循环结构**。
2. 读程序都要从`main()`入口，然后从最上面顺序往下读(碰到循环做循环,碰到选择做选
择)，**有且只有一个**`main`函數。
3. 计算机的数据在电脑中保存是以**二进制**的形式，数据存放的位置就是他的地址.
4. *bit*是*位*是指为**0或者1**。*byte*是指*字节*，**一个字节=八个位**.

概念常考到的:

1. 编译预处理不是C语言的一部分，不占运行时间，不要加分号。C语言编译的程序称为源程序，它以ASCII数值存放在文本文件中。
2. `#define PI 3.1415926;`这个写法是允许的，`PI`会被替换成`3.1415926;`
3. 每个C语言程序中`main`函数是有且只有一个。
4. 在函数中不可以再定义函数。
5. 算法:可以没有输入，但是一定要有输出。
6. `break`可用于循环结构和`switch`语句.
7. 逗号运算符的级别最低，賦值的級别倒数第二。

## 预处理

于编译前执行  
预处理阶段结束时，从源码移除所有预处理器指令。

### 指令

并不是关键字，可以用于标识符的定义

|||
|-|-|
define | else
undef | elif
include | endif
if | line
ifdef | error
ifndef | pragma
|||

### 能力

预处理器拥有源文件翻译能力：

* 条件性编译源文件的部分（以指令 #if 、 #ifdef 、 #ifndef 、 #else 、 #elif 及 #endif 控制）。
* 替换文本宏，可以连接或加引标识符（以指令 #define 和 #undef ，运算符 # 和 ## 控制）。
* 包含其他文件（以指令 #include 控制）。
* 导致错误（以指令 #error 控制）。

## c语言关键字

|||||
|-|-|-|-|
auto | double | int | struct
break | else | long | switch
case | enum | register | typedef
char | extern | return | union
const | float | short | unsigned
continue | for | signed | void
default | goto | sizeof | volatile
do | if | static | while
|||||

## 字面量

### 整数

**语法**  
整数常量是拥有下列类型的非左值表达式

``` text
decimal-constant integer-suffix(可选)  (1)
octal-constant integer-suffix(可选)    (2)
hex-constant integer-suffix(可选)      (3)
```

其中

1. decimal-constant 是非零十进制数位（ 1 、 2 、 3 、 4 、 5 、 6 、 7 、 8 、 9 ），跟随零个或更多十进制数字（ 0 、 1 、 2 、 3 、 4 、 5 、 6 、 7 、 8 、 9）
1. octal-constant 是数字零（ 0 ）跟随零个或更多八进制数位（ 0 、 1 、 2 、 3 、 4 、 5 、 6 、 7 ）
hex-constant 是字符序列 0x 或字符序列 0X 跟随一个或更多十六进制数位（ 0 、 1 、 2 、 3、 4、 5 、 6 、 7 、 8 、 9 、 a 、 A 、 b 、 B 、 c 、 C 、 d 、 D、 e 、 E 、 f 、 F ）
1. integer-suffix ，若提供则可包含下面一或两者，可以任何顺序出现：
    * unsigned-suffix （字符 u 或字符 U ）
    * long-suffix （字符 l 或字符 L ）

下列对象被初始化为相同值：

``` c++
int d = 42;
int o = 052;
int x = 0x2a;
int X = 0X2A;
```

### 浮点

**语法**  
浮点常量是非左值表达式，拥有下列形式

``` text
significand exponent(可选) suffix(可选)
```

其中 `significand` 拥有形式

``` text
whole-number(可选) .(可选) fraction(可选)
```

`exponent` 拥有形式

``` text
e | E exponent-sign(可选) digit-sequence
```

* 十进制浮点常量的指数语法

**解释**  
对于十进制浮点常量， significand 被转译为十进制小数，而将指数的 digit-sequence 转译为有效数字要乘的 10 的整数次幂。

``` c++
double d = 1.2e3; // 十进制小数 1.2 乘 10^3 ，即 1200.0
```

若有指数而不用小数部分，则可以忽略小数分隔符：

``` c++
double x = 1e0; // 浮点数 1.0 （不用小数点）
```

对于十进制浮点常量， exponent 部分是可选的。若忽略它，则小数点不是可选的，而且 whole-number 或 fraction 必须存在。

``` c++
double x = 1.; // 浮点数 1.0 （小数部分可选）
double y = .1; // 浮点数 0.1 （整数部分可选）
```

无后缀浮点常量拥有 double 类型。若 suffix 为字母 f 或 F ，则浮点常量拥有 float 类型。

## 字符

**转义**  
`\'` `\"` `\?` `\\` `\a` `\b` `\f` `\n` `\r` `\t` `\v` 、十六进制转义 `\x...` 或八进制转义 `\...`。

|转义序列|描述|表示|
|-|-|-|
|`\'`|单引号|字节 0x27 （ ASCII 编码）|
|`\"`|双引号|字节 0x22 （ ASCII 编码）|
|`\?`|问号|字节 0x3f （ ASCII 编码）|
|`\\`|反斜杠|字节 0x5c （ ASCII 编码）|
|`\a`|响铃|字节 0x07 （ ASCII 编码）|
|`\b`|退格|字节 0x08 （ ASCII 编码）|
|`\f`|换页|字节 0x0c （ ASCII 编码）|
|`\n`|换行|字节 0x0a （ ASCII 编码）|
|`\r`|回车|字节 0x0d （ ASCII 编码）|
|`\t`|水平制表|字节 0x09 （ ASCII 编码）|
|`\v`|垂直制表|字节 0x0b （ ASCII 编码）|
|`\nnn`|任意八进制值|字节 nnn|
|`\xnn`|任意十六进制值|字节 nn|

**注意**  
八进制转义序列中 \0 最有用，因为它表示空终止字符串中的空终止字符。

八进制转义序列拥有三个八进制位的长度限制，但若提前遇到不是合法八进制位的字符，则在首个这种字符处终止。

十六进制转义序列无长度限制，并在首个不是合法十六进制位的字符处终止。

## 字符串

``` text
" s-char-sequence "
```

类型为 char[N] ，其中 N 是字符串的大小，包括空终止符。从 s-char-sequence 中的字符初始化数组的每个 char 元素。

**注意**  
字符串字面量不必是一条字符串；若字符串字面量拥有内嵌的空字符，则它表示含有多于一条字符串的数组：

``` c++
char p[] = "abc\0def"; // strlen(p) == 3 ，但数组大小为 8
```

字符串字面量能用于初始化数组，而若数组大小比字符串字面量大小少一，则忽略空终止符：

``` c++
char a1[] = "abc"; // a1 为 char[4] ，保有 {'a', 'b', 'c', '\0'}
char a2[4] = "abc"; // a2 为 char[4] ，保有 {'a', 'b', 'c', '\0'}
char a3[3] = "abc"; // a3 为 char[3] ，保有 {'a', 'b', 'c'}
```
