---
layout:   post
title:    "Service Computing课程博客(三) - Selpg-Go的实现与测试报告"
subtitle: " \"Rebuild selpg with golang..\""
date:     2018-10-11
author:   "Palette"
header-img: "img/sea1.jpg"
catalog: true
tags:
    - selpg
    - Go
    - Shell
---

> Try to complete some CLI program with golang.......

# Selpg-Go的设计实现与测试报告

## 实验需求
1. 通过阅读[开发Linux命令行实用程序](https://www.ibm.com/developerworks/cn/linux/shell/clutil/index.html)，使用Go语言重新编码selpg，命名为selpg-go，要求相应输入的结果要与C语言selpg相同输出。

2. 对selpg程序的介绍：`selpg`程序全称为`select pages`，是一个可以从文本文件输入中选择相应页范围，并实现范围内文本打印输出的命令行程序。
* `-sStartPage`和`-eEndPage`为两个强制参数，分别定义了打印页的起始页码与结束页码。
* `-lLines_Per_Pages`和`-f`为一对互斥参数，前者用相应数量的换行定义一页，后者使用换页符`\f`定义一页。
* `-dPrinter`为可选参数，所接参数为打印机名称，开启输出到打印机执行打印功能。
* `fileName`为可选参数，输入文件名则以该文件作为输入，否则从标准输入获取。

## 实验准备
1. 熟练掌握`pflag`包的用法，[spf13/pflag包的Github地址](https://github.com/spf13/pflag)，能够为CLI程序输入参数进行绑定，初始化。下列函数给定了各项参数的初始化，其中`value`为其缺省值，`shorthand`为短参数名称。
```
func BoolVar(p *bool, name string, value bool, usage string)
func BoolVarP(p *bool, name, shorthand string, value bool, usage string)
func IntVar(p *int, name string, value int, usage string)
func IntVarP(p *int, name, shorthand string, value int, usage string)
```
	程序接收以下形式的flag赋值操作(短参数a为int类型)：
	```
	-a1
	-a=1
	-a 1
	```

2. 关于打印功能的实现，需要开启子进程负责执行打印命令(exec包)，借助到`io.Pipe()`实现主进程与子进程之间的Stdin，Stdout，Stderr的交换。
```
// exec包内的相关函数
func Command(name1 string, name2 string, ......string) *Cmd
// Cmd对象的方法
func (c *Cmd) StderrPipe()(io.ReaderCloser, error)
func (c *Cmd) Run() error
func (c *Cmd) Wait() error 
// io包内的相关函数
func Pipe() (*PipeReader, *PupeWriter)
func Copy(dst Writer, src Reader) (write int64, err error)
```

## 程序实现
1. 参数的设置与输入读取
```
// Binding pflag to params
flag.IntVarP(&startPage, "start_page", "s", -1, "Starting page of selcetion");
flag.IntVarP(&endPage, "end_page", "e", -1, "Ending page of selection");
flag.IntVarP(&pageLen, "page_len", "l", 72, "One page's length");
flag.BoolVarP(&pageType, "page_type", "f", false, "Using format-limit or not");
flag.BoolVarP(&helpFlag, "help_flag", "h", false, "Need help");
flag.StringVarP(&printDest, "print_dest", "d", "", "The Destination file to print");
flag.Parse();
```

	```
	var read io.Reader;
	if sp.file_name == "" {
		read = os.Stdin;
	} else {
		file, err := os.Open(sp.file_name);
		if err != nil {
			fmt.Fprintf(os.Stderr, "%s: Error with file \"%s\" opening!", programName, sp.file_name);
			os.Exit(6);
		}
		read = file;
		defer file.Close();
	}
	```

2. 程序获取相关页码内容，采用了`bufio`包相关函数，[bufio-doc](https://godoc.org/bufio/)
```
/* Loop to get target pages */
for pageLength < sp.end_page * leng {
	str, err := reader.ReadString(targetDelim);
	if err != nil {
		break;
	}
	pageLength++;
	store = append(store, str);
}
/* Check whether the startPage is greater than total Page num */
if pageLength <= (sp.start_page-1) * leng {
	fmt.Fprintf(os.Stderr, "%s: StartPage(%d) is greater than total pages num(%.0f), no output...\n", programName, sp.start_page, math.Ceil(float64(pageLength)/float64(leng)));
	fmt.Printf("%s: Done\n", programName);
	os.Exit(7);
}
```

3. 打印功能的实现，此处涉及主进程获取相关页内容输入到子进程的stdin，与子进程的stderr返回给主进程打印(如找不到打印机错误)。
```
/* Printer Destination Output */
if sp.print_dest != "" {
	cmd := exec.Command("lp", fmt.Sprintf("-d%v", sp.print_dest));
	piper, pipew := io.Pipe();
	stderr,_ := cmd.StderrPipe();
	go func() {
		defer pipew.Close();
		io.Copy(pipew, stderr);
	}()

	cmd.Stdin = strings.NewReader(targetBuf);
	cmd.Run();
	io.Copy(os.Stderr, piper);
	defer bufio.NewWriter(os.Stderr).Flush();
	cmd.Wait();
}
```

## 程序测试
1. 通过编写`selpg-go-test.sh`，分别从：输入文件或stdin，换行模式，换页模式，打印模式测试本程序的输出是否正常。
```
# Test Shell-Program for selpg-go
# 1. \n mode, normal file input and stdin input
echo "Case 1=================================================="
selpg-go -s1 -e1 ../test.txt
echo "Case 2=================================================="
selpg-go -s1 -e1 < ../test.txt

# 2. \n mode, for normally, startPage oversize and endPage oversize
echo "Case 3=================================================="
selpg-go -s1 -e2 -l1 ../test.txt
echo "Case 4=================================================="
selpg-go -s4 -e5 -l1 ../test.txt
echo "Case 5=================================================="
selpg-go -s1 -e4 -l1 ../test.txt

# 3. \f mode, also three test cases
echo "Case 6=================================================="
selpg-go -s1 -e2 -f ../testf.txt
echo "Case 7=================================================="
selpg-go -s5 -e6 -f ../testf.txt
echo "Case 8=================================================="
selpg-go -s1 -e5 -f ../testf.txt

# 4. Printer mode, not exist
echo "Case 9=================================================="
selpg-go -s1 -e2 -l1 -dpl ../test.txt
```

2. 运行上述shell文件，得到以下测试结果，经检验结果均正确。
![img](/img/res1.jpg)

<div id="container"></div>
<link rel="stylesheet" href="https://imsun.GitHub.io/gitment/style/default.css">
<script src="https://imsun.GitHub.io/gitment/dist/gitment.browser.js"></script>
<script>
  const myTheme = {
  render(state, instance) {
    const container = document.createElement('div')
    container.lang = "en-US"
    container.className = 'gitment-container gitment-root-container'
    container.appendChild(instance.renderHeader(state, instance))
    container.appendChild(instance.renderEditor(state, instance))
    container.appendChild(instance.renderComments(state, instance))
    container.appendChild(instance.renderFooter(state, instance))
    return container
  },
}

var gitment = new Gitment({
  id: '<%= page.date %>',
  owner: 'Palette25',
  repo: 'Comments',
  oauth: {
    client_id: 'a1ac2783392c3eef32c1',
    client_secret: 'ea8605a4a85131c5012ba8f200f87702e15a05b0',
  },
  theme: myTheme,
})
gitment.render('container')
</script>