# Vi, Java, Ant, JUnit的自学报告
### 姓名：陈明亮
### 学号：16340023
### 班级：软工一班

## 一、参考资料
* https://www.cnblogs.com/0201zcr/p/4781341.html [Vi编辑器操作手册]
* http://www.runoob.com/java/java-tutorial.html [Java菜鸟教程]
* https://www.w3cschool.cn/ant/3p7y1hwe.html [w3cschool Apache Ant 教程]
* https://www.yiibai.com/junit/ [易百JUnit教程]

## 二、自学过程
1. ### Vi的学习和使用过程

  * Vi编辑器是在Unix和Linux系统下的终端标准编辑器，也是在Vim出现之前被称为终端上最强大，最通用的文本编辑器。学习Vi的命令集使用，可以让我们在编辑Linux系统文本文件时更加方便，简单。

    * Vi的三种操作模式
      1. 命令行模式：使用vi file-name命令进入vi编辑器界面时，我们首先进入的是命令行模式，此时我们可以用鼠标复制文字段或使用指令删减文本，同时可以按i键进入插入模式，按:进入底行模式。

      2. 插入模式：vi的使用中，只有插入模式才能对该文本文件的内容做增删修改操作，此时也可以按ESC键回退到命令行模式。

      3. 底行模式：在编辑文件结束后，我们往往想保存或退出vi的编辑界面，此时我们需要从插入模式先转到命令行模式，再按下:进入到底行命令模式，q!命令是不保存直接退出，qw或wq是保存并退出，具体指令见下文具体介绍。

    * Vi常用基本操作指令
        1. 模式切换指令
            * [i]指令：从命令行模式切换到插入模式，并从当前光标位置开始编辑文件。
            * [a]指令：作用也是从命令行模式切换到插入模式，是从光标的下一个位置开始编辑文件。
            * [o]指令：从命令行模式转到插入模式，并从下一行的首位开始输入数字。
            * [ESC]指令：从插入模式转到命令行模式。
            * [:]指令：从命令行模式转到底行模式。

        2. 命令行模式下指令
            * [0]指令：将光标移动到文本的最开头位置。
            * [G]指令：将光标移动到文本的最后位置。
            * [$]指令：将光标移动到所在行的行尾。
            * [^]指令：将光标移动到所在行的行首。
            * [x]指令：删除当前光标位置后面一个字符。
            * [X]指令：删除当前光标位置前面一个字符。
            * [dd]指令：删除光标所在行。
            * [yy]指令：复制光标所在行。
            * [u]指令：回退到上一个操作，撤销当前操作。

        3. 底行模式下指令
            * [set nu]指令：在文件的每一行前面列出行号。
            * [#]指令：#号表示一个数字，回车后就会将光标跳转到对应行行首。
            * [/#]指令：#号表示一个任意字符，回车后vi会帮你找到全部文本数据中第一个出现的#，若想往后查看相同的字符，可按[n]。
            * [w]指令：保存当前文件。
            * [q]指令：不保存退出当前编辑器，一般情况下搭配!成为q!强制离开vi。
            * [qw]/[wq]指令：保存并退出vi界面。
    
    * Vi的使用心得

      * 在学习Vi指令的过程中，虽然在大一学习C语言和C++时有接触过Vim编辑器的指令使用，而同时Vi和Vim指令十分相同，但由于许久未用Vi编辑器，在终端使用Vi编辑Java代码和XML文件时不免有些不知所措。但由于实训期间有充足的学习资料，以及网上Vi指令介绍的博客不在少数，对Vi操作指令的学习历程也是比较简单，实际上我们在平常编辑文件时只需要记清楚三种模式的作用，以及如何切换，如何保存退出即可，对于其余的指令大多数情况下不会用到，但偶尔也会有很好的用处，比如[yy]复制行指令，和[u]回退，[set nu]显示行号都对于我们的编辑过程有很大的帮助。对于其他图形化编辑器如Sublime和VSCode来说，Vi虽然不是很好用，但是实际上能够让我们对终端命令的操作更加熟练，更能够强化我们对一些必要指令和操作的记忆，帮助我们熟悉和理解Linux下编程的核心。

2. ### Java的学习和使用过程

    * Java编程语言是由Sun公司于1995年推出的高级程序设计语言，其强大之处在于吸收C++的各项优点，包括面向对象编程，继承和封装性质，而同时其最大的特点便是可以跨平台运行，实现"一次编译，多处运行"的出色目标。

    * #### Linux下Java环境的配置
      1. 首先到Oracle官网下载JDK开发工具包，Linux下则选择Linux x64或x86的版本。下载结束之后，将JDK包放在对应文件路径下(个人推荐/usr/local/java)，然后开始配置路径文件。

      2. 终端下输入命令：vim ~/.bashrc，进入后按下i键进入插入模式，将以下几条命令输入到bashrc文件中。
           * ```export JAVA_HOME=/usr/local/java/jdk``` （真正输入时要根据自己jdk的安装位置输入）
           * ```export JRE_HOME=${JAVA_HOME}/jr```    （这里也需要输入自己jdk内jre包的位置输入
           * ```export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib```  （配置系统路径，将jdk和jre的位置设置在系统路径上）
           * ```export PATH =${JAVA_HOME}/bin:$PATH```

      3. 配置完以上路径之后，我们便可以在终端输入java -version查看是否安装完成，还有javac -version查看编译指令同样是否可以使用，若报错，则需要反复查看步骤2，是否为命令输错了，或者是jdk位置路径不同。
    
    * #### Java语言程序设计学习
      1. Java编程与C++编程在很大程度上是相似的，但在本人学习并编写Calculator程序的过程中，可以看到Java语言有以下特点：
          * Java程序是以一个class为编程对象的，可以称为是完全的面向对象的程序。在定义一个类或者变量时，都需要加上访问限制符：public(公共可访问)，private(私有)，protected(保护限制访问)，default(默认访问，不加限制符时自动添加)。

          * Java程序的一个类中的main函数必须声明为public static类型，否则外部运行类无法读取到该类下的main函数并执行。同时，Java文件的保存民必须与定义的类名相同，并使用终端命令javac编译该java文件，生成class文件，再使用java指令运行，就可以成功将Java程序执行。

          * Java数据类型分为内置数据类型和引用数据类型，其中内置类型包含byte, short, int, long, float, double, boolean,
          char。引用数据类型有class, interface, array。

          * 由于本次小程序运用了Java Swing图形化界面的方法，故需要于此讲解一下Swing各项控件的属性设置和布局，如JFrame，JPanel，JTextField和JButton。首先，对于一个类的main函数，我们在调出该类中的Swing部件方法执行前需要swing库中的SwingUtilities.invokeLater方法，并传入运行调用Swing UI的方法的Runnerable实例。在具体的Swing UI编程函数中，我们需要将JTextField，JButton等控件加入到JPanel中，JPanel中也需要对应的layout设置，而各项控件的事件函数则对应到addActionListener函数中。其中底层的运算和判断合法的逻辑则需要编程，运用Java运算符和循环语句，switch语句，System I/O语句实现，其中的大部分与C++类似，I/O语句也只是运用了System.out和Scanner中的函数实现，此处不做赘述。

      2. Java语言学习心得：
         * 总体来说，Java语言的程序语句形式与C++的十分相似，其底层逻辑如算术运算，循环和条件语句都与C++相同，在基础学习Java上来讲是不难的，也是很容易上手的。

         * 但实际上Java面向对象编程的核心就在于万物皆为类，这点对于刚学习Java的我们来说是比较陌生的，而且对于其庞大的库文件，库函数的使用方法，其中的众多也是尚未得知。本次Calculator程序的编写过程中，对Swing库的函数有了很多了解，但对其余的方法使用，则希望在接下来的实训过程中慢慢学习，逐渐熟练Java。

3. ### Ant的学习和使用过程

    * Ant是一个由Apache开发的跨平台的基于Java语言开发的构建工具，对于开发人员来说，Ant是构建文件系统和部署生成文件必备的开发工具，也是能通过编写对应的XML文件而简单从命令行编译打包执行部署Java程序的强大工具。

    * #### Ant构建文件方法
      1. 一般来说，Ant构建Java文件系统的重点都在于build.xml文件中，所以Ant对文件的操作，以及布局都在该xml文件中得以展示，故以下就介绍一下build.xml中的主要标签元素。

      2. build.xml主要元素介绍
      * ##### project元素
        * ```<project name="HelloWorld" default="run" basedir=".">```
        * project元素是整个build.xml的基本标签，也是整个ant操作的整体框架，所有的属性任务都必须定义在project内。
        * 属性介绍：
            1. name属性：一般为该项目对应的Java程序名，可以修改为自己喜欢的的项目名。
            2. default属性：命令行敲下ant命令后默认执行的target操作，此处对应到xml内定义的run目标操作。
            3. basedir属性：该项目的跟目录路径，通常为当前目录，路径为"."。

      * ##### property元素
        * ```<property name="src" value="src"/>```
        * property元素将当前目录下的文件，文件夹，或者URL链接转换为在该xml内部使用的别名name。
        * 属性介绍：
            1. name属性：是该属性的名称，使得其他xml元素能够通过${name}方法拿到对应的操作对象。
            2. value属性：该属性的来源路径。

      * ##### target元素和javac元素
        * ``` <target name="compile" depends="init"><javac srcdir="${src}" destdir="${dest}"/></target>```
        * target元素是ant指令能够进行的目标操作，标签内部定义了该操作中的行为。javac元素将java文件编译为class文件。
        * 属性介绍：
            1. name属性：target操作的名称。
            2. depends属性：进行该项目标操作时依赖的其他操作名，需要先进行depends指向的操作才能进行该项操作。
            3. srcdir属性：source directory，即javac编译的java文件的源目录。
            4. destdir属性：detination directory，即javac编译生成的class文件的放置目录。
    
      * ##### java元素和path元素
        * ```<java classname="helloworld.HelloWorld"><classpath><path refid="classpath"/></classpath></java>```
        * java元素是将已经编译好的class文件连接库文件运行的操作，path负责定义xml中的路径。
        * 属性介绍：
            1. classname属性：java操作运行的类文件的名称。
            2. classpath属性：进行类文件运行时，需要指向的类文件路径。
            3. refid属性：path标签所指向的，具有相同id的路径属性标签。

      * ##### jar元素
        * ```<jar jarfile="${h_jar}" basedir="${dest}"/>```
        * jar元素将需要打包的文件放入并生成对于名称的jar包。
        * 属性介绍：
            1. jarfile属性：jar包的路径名称。
            2. basedir属性：取出需要导入到jar包内的文件的目录路径。

      * ##### fileset元素
        * ```<fileset dir="lib" includes="**/*.jar"/>```
        * fileset元素将对应路径下，对于名称的文件集合取出。
        * 属性介绍：
            1. dir属性：取出文件的根目录路径。
            2. includes属性：取出文件的名称，此处使用通配符拿到所有jar包文件。
    
    * #### Ant学习使用心得
        * 总体来讲，在学习使用Ant的过程中，最重要的就是了解build.xml中的各项标签的作用，以及学习如何将java文件编译运行，classpath的设置，到达最后通过ant run指令就可以完成编译打包运行的目标。

        * Ant在使用效果上来讲与Makefile颇为类似，都是通过编写构建文件，达到对Java或C++文件的编译运行部署，但实际上的语法和使用技巧有很多不同，但整体上的理念是相通的。

4. #### JUnit学习使用过程

    * JUnit是一个Java编程语言编写的单元测试框架，用于对Java文件编译运行过程中的错误分析，以及运行情况简述。

    * #### JUnit图形化测试方法
        1. 首先，我们要下载对应的junit的jar包，将其放在当前类的classpath指向中，随后书写对所需测试类的测试单元Test类，别忘了在Test类中导入需要的junit库。
        
        2. 在Test类中对目标类的各项方法进行测试，在每个测试函数之前加上@Test。终端junit打开图形化测试界面，输入Test类名，随刻看到测试类的各项数据，成功，失败，错误运行的方法个数。

    * #### JUnit和Ant实现自动化测试方法
        * 自动化测试要求在Ant内部实现一个test目标操作，例子如下：
         ```
         <target name="test">
		    <junit printsummary="yes">
			    <classpath>
				    <path refid="classpath"/>
			    </classpath>
		        <batchtest fork="yes">
			        <fileset dir="src" includes="**/*Test.java"/>
		        </batchtest>
		    </junit>
	     </target>
        ```
        其中的junit标签包含了对printsummary属性的设置，要求打印分析结果，同时将junit的batchtest属性，即加入junit单元测试的文件集合设置为src文件夹内以Test结尾的Java文件。同时，在单元测试进行前也需要将classpath指向HelloWorld生成的jar包，以及包含junit的jar包。

    * #### JUnit使用心得
        * JUnit作为单元测试框架，单体上可能不能呈现出它的便利之处，但如果是和Ant搭配使用则会事半功倍，能够在执行部署之前分析一下目标类的各项函数的执行情况，其中的设计也包含在ant的目标操作里面，引入了junit的各项标签功能。总体上讲JUint的使用不难，但在路径的配置需要花点心思。 
        