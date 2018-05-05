---
layout:     post
title:      "UWPѧϰ��������(1)"
subtitle:   " \"My study process of Universal Windows Platform\""
date:       2018-04-08
author:     "Palette" 
header-img: "img/tuwp.jpg"
catalog: false
tags:
    - UWP
    - Programming
    - C#
    - XAML
---

>  "It's time to record my UWP Programming and Studying process.."

# �ִ�����ϵͳӦ�ÿ���ʵ�鱨��

### ������������
### ѧ�ţ�16340023
### ʵ�����ƣ�My Todo_list

## һ���ο�����
* https://stackoverflow.com/ 
* https://developer.microsoft.com/zh-cn/windows/apps/
* https://blog.csdn.net/
* https://docs.microsoft.com/zh-cn/windows/uwp/
* https://msdn.microsoft.com/zh-cn/library/

## ����ʵ�鲽��
1. * XAML����
    ���ȣ������˸���Ŀ�ĵ�һ��XAML���� --- MainPage.xaml��������Visual Studio�Ľ���༭���±༭XAML����������������˽⹤�����еĸ��ֿؼ������ڽ��������CheckBox��Line������Margin��Click��Visibility�����Ե����ã��������ͼ�����ؼ��Ĵ��λ�á�
    Ȼ�󣬿�ʼ�༭NextPage.xaml���棬�˽⵽TextBlock��TextBox��DatePicker��ContentDialog��Button�ؼ�,���������½��档

   * C#���򣺣���������C++�Ļ����ϣ�
    ��һ����������˼򵥵����ݰ󶨣�����ʹ��x:Name���Գɹ��ں�̨�õ���xaml�����Ӧ�Ŀؼ����������������ԣ�ʹ����ɼ򵥵��߼�����Createʱ��ʵ����Button��Ӧ�����ݺ������жϺ�����������Date���һЩ���ԣ�����̬����ContentDialog��ʾ��

2. * XAML����
    �ڶ��������������Image��AppBarButton�ؼ���ͨ������Source������ʹ��Image��ʾ��Ӧ��ͼƬ��Ҳ��Page�ĵ׶˼�����Command��ʵ�ֵײ���ת��ť�����Լ������Ҳ�Ĺ�����ScrollViewer������Ҫ���ǣ�ѧϰ��Grid��StackPanel�������ֿؼ���ʹ��ÿ����ʾ�к��б��淶��������������������ۡ�

   * C#����
    ��Ҫ������������Navigation�����ȶ��������棬����ʹ��Frame���Դ���Navigate������NextPage����Ϊ��ֹ�����ջ�Ķ���½���������NextPage���ص�������ʱʹ��GoBack���������ص���ջ�е�ǰһ�����档Ϊ�ﵽ���Ŀ�ģ�������ΪrootFrameע��BackRequestί�У������ڿ�GoBackʱ��ʾ���ر�������ť��

3. * XAML����
    ��������������ʵ��Adaptive UI���ڴ��ڿ�ȸı�ʱ�ṩ��ͬ����ͼ���¼���VisualState�ؼ���ʵ���ڲ�ͬState�е���ת�����⣬Ϊ��Ϻ�̨C#�����ݰ󶨣������ListView�ؼ���ʹ��x:Bind�ؼ��ְ󶨺�̨������ǰ̨��ʾ���ݡ�

   * C#����
    ���ܵ�C#����������TodoListӦ�õ�����Ĳ��֡����ȣ���MVVM���ģʽ�£��ֱ𴴽������ڱ�ʾItem���࣬����Model�ļ��У�ViewModel�ļ�����ʵ�������Item�Ŀ��ӻ����ϵ���һ����ͼ�ࡣ�����������C#�ļ��У�����Ҫ���������½���ά������ͼ���ʵ������ΪItem���ܼ��ϣ��ṩɾ�������ӣ��޸ĵĺ�����


## �����ؼ������ͼ
* ��һ�����ܳɹ���MainPage��NextPage

    ![](/img/tuwp/4.png)
    ![](/img/tuwp/2.png)

* �����ܸĽ���
    MainPage (�������)
    
    ![](/img/tuwp/1.png)

    (���Ƚ���)
    
    ![](/img/tuwp/3.png)

    (Bonus���������ͣ��ʾ����)
    
    ![](/img/tuwp/5.png)


## �ġ�������Ľ�
1.  XAML���򣺽�ͼƬ��ʾ��ΪԲ�Σ��������ۡ�

    C#�������ӱ����ϴ�ͼƬ�Ĺ��ܣ�ʹ�û��ܹ�ѡ���Լ���Ҫ��ͼƬ��

    ``` 
    private async void img_click(object sender, RoutedEventArgs e)
        {
            var srcImage = new BitmapImage();
            FileOpenPicker file = new FileOpenPicker();
            file.FileTypeFilter.Add(".jpg");
            file.FileTypeFilter.Add(".png");
            file.FileTypeFilter.Add(".jpeg");
            Windows.Storage.StorageFile result = await file.PickSingleFileAsync();
            if (result != null)
            {
                using (IRandomAccessStream stream = await result.OpenAsync(FileAccessMode.Read))
                {
                    await srcImage.SetSourceAsync(stream);
                    todo_img.ImageSource = srcImage;
                }
            }
        } 
    ```

2.  XAML��������Slider����ͼƬ�Ĵ�С��

    C#����ʹ�û��ϴ���ͼƬ�ܹ��Զ���ߴ磬�����������á�

    ```
    private void Slider_ValueChanged(object sender, RangeBaseValueChangedEventArgs e)
        {
            Slider sli = sender as Slider;
            if (sli != null)
            {
                eimg.Height = 180 + sli.Value * 0.3;
                eimg.Width = 180 + sli.Value * 0.3;
            }
        }
    ```

3.  XAML��������������ʾ�򣬵������ͣ��ĳ��Item��ʱ��ʾ��    Item��Desciption��Date��

    C#���򣺲��ö�̬��ToolTip�ؼ���ʹ��ToolTipManagerΪÿ�������ɵ�Item�����PointEntered�¼���ʾ�����

    ```
    private void list_PointerEntered(object sender, PointerRoutedEventArgs e)
        {
            TextBlock text = (TextBlock)sender;
            Item find_item = MainViewModel.store.Select_with_title(text.Text);
            string time = find_item.date.Year.ToString() + '/' 
                            + find_item.date.Month.ToString() + '/' 
                                + find_item.date.Day.ToString();
            string content = "Description: " + find_item.content + "\nDate: " + time;
            ToolTip tip = new ToolTip();
            tip.Content = content;
            ToolTipService.SetToolTip(text, tip);
        }
    ```

## �塢����������
1. ��̬�󶨵����ݸ������⡣��һ��ʼ������У����ڲ�֪��x:Bind��Mode�������ƣ��Լ�INotifyPropertyChanged������ຯ����ʵ�֣�����ListView�е�Item�޷�ʵʱ���¸������ݣ��Լ�Line����ʾ��������Item�࣬����������̳�INotifyPropertyChanged��ʵ�ֽӿ�֮��ŵ��Խ�����⡣

2. XAML���޷�ΪListView�е�������x:Name�������⣬������С����״̬��ͼƬ����ʧ�޷�ͨ��XAML��VisualState����������ʵ�֣���ת���̨���Ӵ��ڿ�ȵĸı䣬���󶨵�ÿ��Item��Image��Visibility��

## ������˼���ܽ�
* ��˼��UWPӦ�ÿ����Ĺ�������Ҫ�ܶ����ģ����ڶ�XAML�ؼ����ԣ��Լ�����C#��Ĳ��˽⣬��������������·�����˺ܶ���·��Ҳ�����ڱߴ������Ѳ��ͣ�msdn�����͡�

* ������Ŀ��Ϊ�ֲٿεĵ�һ����ҵ�����֮��Ҳ����е���ο�����������о��Լ���UWP���ֿؼ���C#�����˽��˲��٣�ϣ���ڽ���������������ⷽ���֪ʶ�����������ա�