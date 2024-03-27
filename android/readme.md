一. 新建证书::
keytool -genkeypair -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
输入密钥库口令:  
再次输入新口令: ec3depin
您的名字与姓氏是什么?
  [Unknown]:  aaronshi
您的组织单位名称是什么?
  [Unknown]:  ec3
您的组织名称是什么?
  [Unknown]:  ec3
您所在的城市或区域名称是什么?
  [Unknown]:  sz
您所在的省/市/自治区名称是什么?
  [Unknown]:  gd
该单位的双字母国家/地区代码是什么?
  [Unknown]:  cn
CN=aaronshi, OU=ec3, O=ec3, L=sz, ST=gd, C=cn是否正确?
  [否]:  是

正在为以下对象生成 2,048 位RSA密钥对和自签名证书 (SHA256withRSA) (有效期为 10,000 天):
	 CN=aaronshi, OU=ec3, O=ec3, L=sz, ST=gd, C=cn
[正在存储my-release-key.keystore]



二. 查看证书信息::
aaronshi@shibaishengdeMacBook-Pro-3 android % keytool -list -v -keystore app/release.keystore
输入密钥库口令:  
密钥库类型: PKCS12
密钥库提供方: SUN

您的密钥库包含 1 个条目

别名: my-key-alias
创建日期: 2024年3月26日
条目类型: PrivateKeyEntry
证书链长度: 1
证书[1]:
所有者: CN=aaronshi, OU=ec3, O=ec3, L=sz, ST=gd, C=cn
发布者: CN=aaronshi, OU=ec3, O=ec3, L=sz, ST=gd, C=cn
序列号: 51c169f5fe3ef0ef
生效时间: Tue Mar 26 09:43:39 CST 2024, 失效时间: Sat Aug 12 09:43:39 CST 2051
证书指纹:
	 SHA1: 01:91:3A:BD:6D:25:5F:D1:9E:3E:C6:12:57:D0:FB:56:6F:C0:FB:CB
	 SHA256: 16:49:EE:F5:78:DC:3A:1E:B7:B9:FE:98:7D:EB:51:5D:01:AF:8C:17:30:BE:10:EC:A9:15:FF:E8:69:3A:21:BB
签名算法名称: SHA256withRSA
主体公共密钥算法: 2048 位 RSA 密钥
版本: 3

扩展: 

#1: ObjectId: 2.5.29.14 Criticality=false
SubjectKeyIdentifier [
KeyIdentifier [
0000: DF 22 9C 22 19 EA B4 9B   9D AD F8 4C A9 54 44 7A  .".".......L.TDz
0010: E0 90 33 DC                                        ..3.
]
]



*******************************************
*******************************************

三. 配置Gradle：
在React Native项目的 android/app 目录下，打开 build.gradle 文件。确保以下内容被添加到文件的 android 块中：

android {
    ...
    signingConfigs {
        release {
            storeFile file('my-release-key.keystore')
            storePassword 'your_keystore_password'
            keyAlias 'your_key_alias'
            keyPassword 'your_key_password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            ...
        }
    }
}
请将 your_keystore_password、your_key_alias 和 your_key_password 替换为你在生成签名密钥时设置的密码和别名。

四. 生成APK文件： [自带以上签名]
在React Native项目的根目录下，运行以下命令生成APK文件：
cd android && ./gradlew assembleRelease
这会在 android/app/build/outputs/apk/release/ 目录下生成一个名为 app-release.apk 的APK文件。


五. 签名APK文件（可选）：
如果你的应用不仅是为了测试而是要发布到Google Play商店，你需要对生成的APK文件进行签名。你可以使用jarsigner工具来进行签名：

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk my-key-alias
这会将APK文件签名为 app-release-signed.apk。

六. 优化APK文件（可选）：
使用Android SDK中的工具 zipalign 来优化APK文件，以减少其大小并提高性能：

zipalign -v 4 app-release-signed.apk app-release-aligned.apk
