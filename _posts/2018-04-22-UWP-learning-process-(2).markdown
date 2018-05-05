---
layout:     post
title:      "UWPѧϰ��������(2)"
subtitle:   " \"My study process of Universal Windows Platform\""
date:       2018-04-08
author:     "Palette" 
header-img: "img/suwp.jpg"
catalog: true
tags:
    - UWP
    - Programming
    - C#
    - XAML
    - Sqlite
---

>  "Still learn and combie some different things in UWP design"

# �ִ�����ϵͳӦ�ÿ���ʵ�鱨��

### ������������
### ѧ�ţ�16340023
### ʵ�����ƣ�My_TodoList2

## һ���ο�����
* https://stackoverflow.com/
* https://docs.microsoft.com/zh-cn/windows/uwp/data-access/sqlite-databases
* https://docs.microsoft.com/zh-cn/windows/uwp/design/shell/tiles-and-notifications/create-adaptive-tiles
* https://blog.csdn.net/
* https://docs.microsoft.com/zh-cn/windows/uwp/launch-resume/app-lifecycle

## ����ʵ�鲽��
1. ### ���������񣺹��𲢹رգ���������ǰ���������ݡ�
    * #### XAML���򣺸����������XAML����û�����Ե�Ҫ�󣬹����ؽ�C#�����ʵ����̣��˴�����׸����

    * #### C#����
        1. �����еĹ��𲢹رգ��ٴο����������ϴδ򿪵Ľ��湦��������App.xaml.cs��OnSupending������OnLaunched�����У�������Ҫ������NavigationState�洢��Application.Current.LocalSetting.Value�У����ڹ���ִ��OnSuspendingʱ������ҳ״̬�洢��Value�У�ͬ�����ٴδ�ִ��OnLaunched����ʱ��ȡ�ϴι���ʱ�����״̬��

        2. �������ÿ��������������ݵĴ洢��������������MainPage.xaml.cs��NextPage.xaml.cs��OnNavigatedTo������OnNavigatedFrom�����С�
            * OnNavigatedTo���������������浼������ǰ����ʱִ�еĺ���������Ϊ�˱������ݣ�������Ҫ�ڴ�����ж�ȡ�ϴα���ĸ������ݣ������жϽ����XAML����NavigationMode�Ƿ�ΪNewMode�������ǹ���֮�����´򿪣��ǵĻ�����Ҫ��ȡ���ݣ����ҽ����������������֮��ʹ��ApplicationDataCompositeValue���ͱ�������LocalSetting��Value�ж�ȡ���������װ�ص�ҳ���С�

            * OnNavigatedFrom�������ڵ�ǰ�����뿪ʱִ�еĺ������������������뿪֮ǰ��ҳ���ϵĸ�����Ҫ��Ϣ������LocalSetting��Value�С������ж��Ƿ�Ϊ�������������ͨ��App��������issuspend���������ڹ������иı�ֵ���ã���Ϊ�������������Ҫ����������������Value�С�
        
        3. ���𲢹رյĹ�������Ҫ��ҳ��䵼�����ݵĲ������л������Դ�ʱ���������ͨ��MainPage����ĳ��Item���뵽NextPage�����ô�������Item�ķ�������ôVS���ᱨ����ΪC#���ܶԻ�������֮��ı������ͽ������л�����ʱ�����ǿ��Բ������ַ�������debug��
            * ���Ⱦ�����ֱ�ӵķ��� ---- ��Item���ͻ���ԭ������(��int���͵�id)����ʹ�øþ���Ψһ��ʶ��keyȥViewModel�л�ѯ�����������ݡ�

            * ����ǽ��Զ����������ͽ������л������Կ���UWP֧�ֵ����л��������٣������ϲ�֧��Formatter���Զ��壬�������Կ���ʹ��System.Runtime.Serialization.Json�⣬���Լ��������תΪJSON��ʽ����ȥ��Ȼ��NextPage�ڷ����л�����JSON����ʽ��ΪItem���͡������������ģ�

                * MainPage��NextPage��JSON��ʽ���л�����
                ```
                DataContractJsonSerializer dcjs = new DataContractJsonSerializer(typeof(Item));
                MemoryStream ms = new MemoryStream();
                dcjs.WriteObject(ms, click_item);
                ms.Position = 0;
                StreamReader srm = new StreamReader(ms, Encoding.UTF8);
                string json_pass = srm.ReadToEnd()��
                Frame.Navigate(typeof(NextPage), json_pass);
                ```
                * NextPage���յ����л�JSON������ķ����й���
                ```
                string json_pass = e.Parameter.ToString();
                var ms = new MemoryStream(Encoding.Unicode.GetBytes(json_pass));
                DataContractJsonSerializer ds = new DataContractJsonSerializer(typeof(Item));
                Item old = (Item)ds.ReadObject(ms);
                ```
    
2. ### ��������������Ӧ��������ƺ�ѭ���������Լ�Ӧ��֮��ķ����ܡ�
    * #### ��������ƺͺ�̨����
        1. XML����
            Tile.xml����Ҫ���þ�����ƴ����Ľṹ�����ݵ�C#�У�����TileManager�����ϴ���ʾ���˴�����Tile.xml����Ҫ��ǩ����д�ṹ��
            * tileԪ�أ�����������xml�ļ��Ļ�����ǩ�����еĽṹ������д�ڸñ�ǩ�С�
            * visualԪ�أ����ƴ����ĵ����Ƿ���ʾ����Name��Logo����������������Ŀ�ļ���BaseUri��
            * bindingԪ�أ���ÿ��ģʽ�µĴ�������ҪԪ�أ����е�template��ΪTileSmall,TileMedium,TileWide��TileLarge���ñ�ǩ�з��ô�����ͬ��Сģʽ�µĽṹ��
            * imageԪ�أ�xml�ļ�ͼƬԪ�أ�placement���Ծ���ͼƬ�ķ���λ�ã�src����ͼƬ��Դuri��
            * textԪ�أ�xml�ı�Ԫ�أ�����hint���Կ��������������ǳ��λ�á�

        2. C#����
            ���֪ͨ���ӻ�����TileUpdateManager�е�CreateTileUpdaterForApplication�ϴ�Tile.xml�е����ݣ�����������ҪXmlDocument��xml�ļ���װ�ز���ȡ�������õ�Tile.xml�еĸ����ǩԪ�أ��Ե�ǰViewModel�ĸ���Item��title������װ�뵽Tile.xml�У�push��Notification�����У�Ȼ���ϴ���ʾ��

    * #### Ӧ��֮��ķ�����
        1. XAML����
            Ϊÿ��Item��ListView�����IconΪSetting��AppBarButton��Click������Ӧ��C#��̨�ķ�����������Ϊ��ҳ�����ۣ�����Ҳ����Ϊ��AppBarButton����һ��VisualGroup������ʱ��խ��ʱ��λ�÷ֱ���Item���Ҷ˺��ʴ���

        2. C#����
            * App.xaml.cs����ҪΪDataTransferManager��Ӧ��ͨ�Ź������е���������DataRequestedע��һ��ί�У���������ݷ�������ĺ������ú�����ΪonShareRequested�����ж���������DatRequest���ø���property������֮��ʹ������������ɺ�����������ݷ���Ӧ�õĵ��á�

            * MainPage.xaml.cs�����𽫸���������ݵ�App��̨C#�����У���֤������Ϣ����Item����ȫ��ͬ������Ҳ����ͼƬ�Ķ�̬�󶨡�
        
3. ### ����������SQLite���ݿⱾ�ش洢
    * #### C#����
        1. SQLite�����Ӻ���ɾ���
            * SQLConnection�����Ӵ���
            ```
            internal SQLiteConnection GetConn()
            {
                SQLiteConnection conn = new SQLiteConnection(new SQLitePlatformWinRT(), path);
                return conn;
            }
            ```
            * SQLite����ɾ���
                * ```conn.CreateTable<Item>();```(�����洢����ΪItem�����ݿ���)
                * ```var item_list = conn.Table<Item>();```(��ȡItem���ݿ��)
                * ```conn.Insert(new_item);```(���ݿ������Ԫ��)
                * ```conn.Execute("delete from Item where id = ?", del_item.id);```(���ݿ�ɾ��Ԫ��)

        2. �ļ������ɺͱ���(���ݿⱣ��ͼƬ�ļ���ַ��ͬʱ���ɶ�Ӧ��ͼƬ�ļ����������ݿ��ļ������ļ��д�)
            * ```StorageFolder root = ApplicationData.Current.LocalFolder;```(��ȡ�洢λ���ļ���)
            * 
            ```
                StorageFile newfile = await root.CreateFileAsync(file_name, 
                                                CreationCollisionOption.ReplaceExisting);
                //Change filestream to byte[]
                DataReader reader = new DataReader(stream.GetInputStreamAt(0));
                await reader.LoadAsync((uint)stream.Size);
                byte[] img_byte = new byte[stream.Size];
                reader.ReadBytes(img_byte);
                //Write new image file to database folder
                await FileIO.WriteBytesAsync(newfile, img_byte);
            ```
            (������ͼƬ�ļ��������ϴ��ļ���imagesourceת��byte[]�洢����ͼƬ�ļ���)

## �����ؼ������ͼ
* #### �����ܳɹ���ͼ��
    ����֮ǰӦ�õ�ͼƬ

    ![](img/suwp/0.png)

    ���´�֮���Ч��

    ![](img/suwp/0.png)

* #### �����ܳɹ���ͼ��
    ����Ч��ͼ(�д���)

    ![](img/suwp/2.png)

    (�����)

    ![](img/suwp/3.png)

    (�����)

    ![](img/suwp/4.png)

    (Bonus�ʵ�ֱ���ͼƬ��)

    ![](img/suwp/b.png)

    Ӧ�÷����ͼ

    ![](img/suwp/5.png)

    (Bonus�ʵ�ַ���̬��ͼƬ)

    ![](img/suwp/9.png)

* #### �����ܳɹ���ͼ��
    ���ݿ���ӻ����߲鿴

    ![](img/suwp/7.png)

    ��Ӧ��Ӧ�ý�ͼ

    ![](img/suwp/6.png)

    ��������չʾ��ͼ

    ![](img/suwp/10.png)

## �ġ�������Ľ�
1. ### ���𲢹رձ����ϴ���ͼƬ���ݣ������ǽ��ϴ���ͼƬ�������ݿ��ļ����洢���ڹ���ǰ�洢·�������¿��������·�����¶����ϴ���ͼƬ�ļ���
    (�洢�ϴ�ͼƬ���������ļ�����·��)
    ```
    Windows.Storage.StorageFile result = await file.PickSingleFileAsync();
            if (result != null)
            {
                using (IRandomAccessStream stream = await result.OpenAsync(FileAccessMode.Read))
                {
                    string file_name = 
                        (edit_or_create ? edit_id : AllItems.count) + result.FileType;
                    img_name = file_name;
                    source_img = file_name;
                    StorageFile newfile = await root.CreateFileAsync(file_name, 
                                            CreationCollisionOption.ReplaceExisting);
                    //Change filestream to byte[]
                    DataReader reader = new DataReader(stream.GetInputStreamAt(0));
                    await reader.LoadAsync((uint)stream.Size);
                    byte[] img_byte = new byte[stream.Size];
                    reader.ReadBytes(img_byte);
                    //Write new image file to database folder
                    await FileIO.WriteBytesAsync(newfile, img_byte);
                    await srcImage.SetSourceAsync(stream);
                    todo_img.ImageSource = srcImage;
                }
            }
    ```

2. ### ��������ͼƬ�Ķ�̬��
    ```
    //Image Source Change
        string source = ViewModel.ItemStore[tick_id].source;
        XmlElement img0 = imgList[0] as XmlElement, img1 = imgList[1] as XmlElement,
            img2 = imgList[2] as XmlElement, img3 = imgList[3] as XmlElement;
        img0.SetAttribute("src", "ms-appdata:///local/" + source);
        img1.SetAttribute("src", "ms-appdata:///local/" + source);
        img2.SetAttribute("src", "ms-appdata:///local/" + source);
        img3.SetAttribute("src", "ms-appdata:///local/" + source);
    ```

3. ### Ӧ����Ϣ����ʱͼƬ�Ķ�̬��
    ```
    private async void onShareRequested(object sender, DataRequestedEventArgs e)
        {
            DataRequest req = e.Request;
            req.Data.Properties.Title = s_title;
            req.Data.Properties.Description = s_content;
            DataRequestDeferral deferral = req.GetDeferral();
            StorageFile img = await ApplicationData.Current.LocalFolder.GetFileAsync(s_img);
            req.Data.SetBitmap(RandomAccessStreamReference.CreateFromFile(img));
            req.Data.SetText(s_content);
            deferral.Complete();
        }
    ```

4. ### ���ݿ�洢ͼƬ·��������Ӧ��ͼƬ�洢��LocalFolder�С�(����Ч��������ͼƬ)


## �塢����������
* ### ��˼���ܽ᣺
    1. �ڶ��׶ε�UWPӦ�ù��ܿ���������˵������̫�ѣ��ټ�����TA�ṩ�Ĳο����ϣ��������ڹ��𲢹رջ���Ӧ�÷���Ĺ������ƹ����У�����ԱȽ����ס�����������������˵�Ƚ���Ҫ���ĺͶԹٷ��ĵ��ĳ����������Ϊ��XML�ļѽṹ�Ĳ�̫�˽⣬��һ��ʼ���������ԱȽϳ�������ĳЩ����ֵ�Ķ�̬����Ҳ���˺ܶ���·���������Ϲٷ��ĵ���Tile����ϸ���ܣ��Լ�cdsn�Ľ϶಩�ͣ�����Ҳ�𽥿˷�������˴�������ơ�
    2. ���ݿ�����ӷ��棬���˾�������vs�ϵ���չ�͸��ֿ����õ���������˵���ǱȽϷ����ģ������սӴ�ʱ�Ի��˺�һ�����ɹ����Ӻ󣬶������ݵĴ洢�Ͷ�д�������˵�Ƚ����ס�Ȼ��������ͼƬ�ļ���·���洢�͵������е����ѣ���������Ҫ��xaml������дת���������ַ���·��Ѱַ����Ŷ�ӦͼƬ���ļ����У������Լ��������ɵ�ͼƬ�ļ���
    3. �ڶ��׶ε���ҵ����ȫ������ˣ��о��Լ���C#�ļ�ϵͳ�����ݿⷽ���˽��˲��٣�Ҳ��UWP�ܱ�Ӧ��������ͷ����ܣ�ϣ���ڽ��������������ܹ�ѧ�������µĶ�����